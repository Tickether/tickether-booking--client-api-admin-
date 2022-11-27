import './salesList.scss';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { useState } from 'react';



    

const SalesList = () => {

    const user = JSON.parse(localStorage.getItem('user'))


    const [books, setBook] = useState([])
    const [selectBook, setSelectBook] = useState({})
    const [info, setInfo] = useState({});

    const { data, loading } = useFetch(`https://api.tickether.io/api/bookees/books/${user.bookee[0]}`)

    //const navigate = useNavigate()


    /*
    const handleChange = (e) => {
        setInfo(prev=>({...prev,[e.target.id]:e.target.value}))
    }
    */

    const handleSelect = async (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value)
        setBook(value)
        const book = await axios.get(`https://api.tickether.io/api/books/${value}`)
        setSelectBook(book.data)
        
    }

    console.log(selectBook)

    
/*
    const handleClick = async () => {
        if (web3Provider) {
            const signer = web3Provider.getSigner();
            const bookingContract = new ethers.Contract(
                selectBook.contractAddress,
                bookingJSON.abi,
                signer
            );
            try{
                
                // attempt udsc  withdraw
                const response = await bookingContract.withdraw();
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

                //DB Data
                const newWithdrawal = {
                    ...info,
                    txnId: transactionHash,
                    booker: user._id,
                    book: books[0],
                    bookee: user.bookee[0],
                }

                //Post to DB after confirmation 
                axios.post(`https://api.tickether.io/api/withdrawals/${selectBook._id}/${user.bookee[0]}`, newWithdrawal) // Bookings information from form
            
                //navigate(`/success/${bookeeId}`)
            } catch(err) {
                console.log(err)
            }
        }
    }
*/

    return (
        <div className="salesList">
            <div className="selectBooks">
                <label htmlFor="">Select Book:</label>
                <select defaultValue={'DEFAULT'} id="books" onChange={handleSelect}>
                    <option value="DEFAULT" disabled >Please Choose ...</option>
                    {loading ? "loading" : data && data.map(item=>(
                        <option key={item._id} value={item._id}>{item.bookName}</option>
                    ))}
                </select>
                <div className='salesInfo'>
                    <div className='infoType'>Booking Type: {selectBook.bookType}</div>
                    <span>Booking Fee: </span>
                    <span>{selectBook.bookFee}</span>
                </div>
            </div> 
        </div>
    );
}
  
export default SalesList;
  








