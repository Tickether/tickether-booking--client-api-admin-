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
    const [selectBook, setSelectBook] = useState({})
    const [info, setInfo] = useState({});
    const [isActive, setIsActive] = useState(false);

    /*
    const [isConfirming, setConfirming] = useState (Boolean(0));
    const [isSent, setSent] = useState (Boolean(0));
    const [isMinted, setMinted] = useState(Boolean(0));
    */

    const { data, loading } = useFetch(`http://localhost:8000/api/bookees/books/${bookeeId}`)

    const {selectedDate} = useContext(SearchContext);

    const [_selectedDate, setSelectedDate] = useState(selectedDate);
    
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
        const bookee =  await axios.get(`http://localhost:8000/api/bookees/find/${bookeeId}`)
        const bookedDates = bookee.data.showBookings;
        console.log(bookedDates)
        for (let i = 0; i < bookedDates.length; i++){
            excludedDates.push(new Date(bookedDates[i]));
          }
        setBookedDates(excludedDates);
        
    }

    const handleSelect = async (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value)
        setBook(value)
        const book =  await axios.get(`http://localhost:8000/api/books/${books[0]}`)
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
                    const onlyDate = _selectedDate.toISOString();
                    const dateStamp = onlyDate.slice(0,10);
                    console.log(onlyDate)
                    console.log(dateStamp)
                    
                    //DB Data
                    const newBooking = {
                        ...info,
                        txnId: transactionHash,
                        booker: user._id,
                        book: selectBook._id,
                        bookee: bookeeId,
                        bookingDate: dateStamp
                    }

                    // if booking type
                    if (selectBook.bookType === 'Shows'){
                        axios.post(`http://localhost:8000/api/bookings/${selectBook._id}/${user._id}/${bookeeId}`, newBooking) // Bookings information from form
                        axios.put(`/bookees/${bookeeId}`, {showBookings:dateStamp}) // unavailable Date to BookId
                    } else if (selectBook.bookType === 'Features') {
                        axios.post(`http://localhost:8000/api/bookings/${selectBook._id}/${user._id}/${bookeeId}`, newBooking) // Bookings information from form
                        axios.put(`/bookees/${bookeeId}`, {featureBookings:dateStamp}) // unavailable Date to BookId

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

    
    const isAvailable = (data) =>{
         const isFound = data.unavailalableDates.some(date=>
            date.includes(new Date(date).getTime())
        );
        return !isFound
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
                            <select id="books" onChange={handleSelect}>
                            {loading ? "loading" : data && data.map(book=>(
                                <option key={book._id} value={book._id}>{book.bookName}</option>
                            ))}
                            </select>
                            <div className='bookInfo'>
                                <div className='infoType'>{selectBook.bookType}</div>
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
                                    <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                                    </div>
                                ))}
                                <div className="formInput">
                                    <label>Date</label>
                                    <span>
                                        <DatePicker 
                                            className='date'
                                            selected={_selectedDate}
                                            onChange={(date) => setSelectedDate(date)} 
                                            minDate= {new Date()}
                                            excludeDates={bookedDates}
                                            placeholderText={"Click to select a date"}  
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