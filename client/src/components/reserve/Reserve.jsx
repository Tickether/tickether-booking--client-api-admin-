import './reserve.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from '../../hooks/useFetch';
import { useContext, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { bookingInputs } from '../../formSource';
import DatePicker from "react-datepicker";
import isSameDay from 'date-fns/isSameDay';
import { ethers, BigNumber } from "ethers";
import Web3Modal from "web3modal";
import { daiABI } from "./dai";
import bookingJSON from "../../Booking.json"

const usdcAddress = '0x07865c6E87B9F70255377e024ace6630C1Eaa37F';


const providerOptions = {

    /*

    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "8231230ce0b44ec29c8682c1e47319f9" // required
      }
    },

    coinbasewallet: {
      package: CoinbaseWalletSDK, // required
      options: {
        infuraId: "8231230ce0b44ec29c8682c1e47319f9" // required
      }
    }

    */
    
};


const Reserve = ({setOpen, bookeeId}) =>{

    const user = JSON.parse(localStorage.getItem('user'))

    const [web3Provider, setWeb3Provider] = useState(null)

    const [books, setBook] = useState([])
    const [bookedDates, setBookedDates] = useState([])
    const [bookedDateTime, setBookedDateTime] = useState([])
    const [selectBook, setSelectBook] = useState({})
    const [info, setInfo] = useState({});
    const [isActive, setIsActive] = useState(false);

    const { data, loading } = useFetch(`https://api.tickether.io/api/bookees/books/${bookeeId}`)

    const {selectedDate} = useContext(SearchContext);

    const [_selectedDate, setSelectedDate] = useState(selectedDate);
    const getExcludeTimesForDate = (date) => bookedDates.filter((time) => isSameDay(date, time));
    const [excludeTimes, setExcludeTimes] = useState(getExcludeTimesForDate(_selectedDate));
    
    const navigate = useNavigate()

    const connectAccount = async () => { 
        try {
            const web3Modal = new Web3Modal({
                cacheProvider: false, // optional
                providerOptions // required
            });
            const instance = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(instance);
            console.log(provider)

            const signer = provider.getSigner();
            console.log(signer)

            if(provider) {
                setWeb3Provider(provider)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => {
        setInfo(prev=>({...prev,[e.target.id]:e.target.value}))
    }

    const handleBookedDates = async () => {
        let excludedDates = []
        const bookee =  await axios.get(`https://api.tickether.io/api/bookees/find/${bookeeId}`)
        const bookedDates = bookee.data.showBookings;
        console.log(bookedDates)
        setBookedDateTime(bookedDates)
        for (let i = 0; i < bookedDates.length; i++){
            const date = new Date(bookedDates[i])

            excludedDates.push(date);
          }
        setBookedDates(excludedDates);
        
    }

    const handleSelect = async (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value)
        setBook(value)
        const book = await axios.get(`https://api.tickether.io/api/books/${value}`)
        handleBookedDates()
        setSelectBook(book.data)
        
    }

    console.log(selectBook)
    console.log(bookedDates)

    async function handleApproval() {
        if (web3Provider) { 
            const signer = web3Provider.getSigner();
            const address = (await signer.getAddress()).toLowerCase();
            const usdContract = new ethers.Contract(
                usdcAddress,
                daiABI,
                signer
            );
            const maxApproval = 3000000; //3-DAI;
            try {
                let res = await usdContract.allowance(address, selectBook.contractAddress);
                console.log('res: ', res)
                const allowance = BigNumber.from(res._hex).toNumber()
                console.log(allowance)
                if (allowance < maxApproval){
                    let response = await usdContract.approve(selectBook.contractAddress, maxApproval);
                    console.log('response: ', response)
                    const transactionHash = response['hash']
                    const txReceipt = []
                    do {
                    let txr = await web3Provider.getTransactionReceipt(transactionHash)
                    txReceipt[0]=txr
                    console.log('confirming...')
                    } while (txReceipt[0] == null) ;
                    
                    console.log(txReceipt[0])
                }
                
            } 
            catch (err) {
                console.log('error', err )
            }
        }
    }

    const handleClick = async () => {
        if (web3Provider) {
            const signer = web3Provider.getSigner();
            const bookingContract = new ethers.Contract(
                selectBook.contractAddress,
                bookingJSON.abi,
                signer
            );
            try{
                //attemprt erc 20 approval
                await handleApproval();

                // attempt udsc booking
                const response = await bookingContract.book();
                console.log(response)

                //After metamask corfirmation of mint and store txid
                const transactionHash = response['hash']
                const txReceipt = []
                do {
                let txr = await web3Provider.getTransactionReceipt(transactionHash)
                txReceipt[0]=txr
                console.log('confirming...')
                } while (txReceipt[0] == null) ;
                
                console.log(txReceipt[0])

                //Post to DB after confirmation 
                // if null date 
                if (_selectedDate){
                    // strip time and get Date()
                    const dateStamp = _selectedDate.getTime();
                    console.log(dateStamp)
                    //DB Data
                    const newBooking = {
                        ...info,
                        txnId: transactionHash,
                        booker: user._id,
                        book: books[0],
                        bookee: bookeeId,
                        bookingDate: dateStamp
                    }

                    let newBookedDates = []

                    if (bookedDateTime.length === 0 ) {

                        newBookedDates.push(dateStamp)

                    } else {
                    
                        for (let i = 0; i < bookedDateTime.length; i++ ) {
                        
                        const gettingDate = new Date(bookedDateTime[i]) ;
                        const gettingTime = gettingDate.getTime();
                        newBookedDates.push(gettingTime)
                    
                    }
                    newBookedDates.push(dateStamp)
                    }

                    console.log(bookedDateTime)
                    console.log(newBookedDates)

                    // if booking type
                    if (selectBook.bookType === 'Shows'){
                        axios.post(`https://api.tickether.io/api/bookings/${selectBook._id}/${user._id}/${bookeeId}`, newBooking) // Bookings information from form
                        axios.put(`https://api.tickether.io/api/bookees/${bookeeId}`, {showBookings: newBookedDates}) // unavailable Date to BookeeId
                    } else if (selectBook.bookType === 'Features') {
                        axios.post(`https://api.tickether.io/api/bookings/${selectBook._id}/${user._id}/${bookeeId}`, newBooking) // Bookings information from form
                        axios.put(`https://api.tickether.io/api/bookees/${bookeeId}`, {featureBookings:newBookedDates}) // unavailable Date to BookeeId

                    }
                }
                // end if wrapper
                setOpen(false)
                navigate(`/success/${bookeeId}`)
            } catch(err) {
                console.log(err)
            }
        }
    }
    
    return (
        <div className="reserve">            
            <div className="rContainer">
                <FontAwesomeIcon 
                    icon={ faCircleXmark } 
                    className='rClose'
                    onClick={() => setOpen(false)}
                />
                {web3Provider == null ? (
                    <div>
                        <p className='paragraphs'>Please connect your wallet to complete booking</p>
                        <button onClick={connectAccount}>connect</button>
                    </div>
                
                )   :   (
                    <div className="books">
                        <div className="selectBooks">
                            <label htmlFor="">Select Booking:</label>
                            <select defaultValue={'DEFAULT'} id="books" onChange={handleSelect}>
                                <option value="DEFAULT" disabled >Please Choose ...</option>
                                {loading ? "loading" : data && data.map(item=>(
                                    <option key={item._id} value={item._id}>{item.bookName}</option>
                                ))}
                            </select>
                            <div className='bookInfo'>
                                <div className='infoType'>Booking Type: {selectBook.bookType}</div>
                                <span>Booking Fee: </span>
                                <span>{selectBook.bookFee}</span>
                                <div className="accordion-item">
                                    <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                                        <div>Booking Terms</div>
                                        <div>{isActive ? '-' : '+'}</div>
                                    </div>
                                    {isActive && <div className="accordion-content">{selectBook.description}</div>}
                                </div>
                            </div>
                            <div className='input'>
                                {bookingInputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input id={input.id} onChange={handleChange} required type={input.type} placeholder={input.placeholder} />
                                    </div>
                                ))}
                                <div className="formInput">
                                    <label>Date</label>
                                    <span>
                                        <DatePicker 
                                            selected={_selectedDate}
                                            onChange={(date) => setSelectedDate(date)} 
                                            minDate= {new Date()}
                                            excludeTimes={excludeTimes}
                                            onSelect={(date) => {
                                                setExcludeTimes(getExcludeTimesForDate(date));
                                            }}
                                            showTimeSelect
                                            timeIntervals={360}
                                            timeFormat="p"
                                            dateFormat="Pp"    
                                            placeholderText={"Click to select a date & time"}  
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={handleClick}  
                            className="rButton"
                        >
                            Book Now!
                        </button>
                    </div>   
                )}   
            </div>
        </div>
    )
}

export default Reserve