import './reserve.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from '../../hooks/useFetch';
import { useContext, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookingInputs } from '../../formSource';
import DatePicker from "react-datepicker";


const Reserve = ({setOpen, bookeeId}) =>{

    const [books, setBook] = useState([])
    const [selectBook, setSelectBook] = useState({})
    const [info, setInfo] = useState({});
    const [isActive, setIsActive] = useState(false);


    const { data, loading, error } = useFetch(`http://localhost:8000/api/bookees/books/${bookeeId}`)

    const {selectedDate} = useContext(SearchContext);
    //const location = useLocation()
    const [_selectedDate, setSelectedDate] = useState(selectedDate);


    const navigate = useNavigate()

    const handleChange = (e) => {
        setInfo(prev=>({...prev,[e.target.id]:e.target.value}))
    }

    const handleSelect = async (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value)
        setBook(value)
        const book =  await axios.get(`/books/${books[0]}`)
        setSelectBook(book.data)
        console.log(book.data)
    }

    

    const handleClick = async () => {
        try{
            //wallet connect and mint
            //After metamask corfirmation of mint and store txid
            const bookId = await data._id
            const res = axios.put(`/bookees/${bookId}`, {dates:selectedDate}) // unavailable Date to BookId
            const createBooking = axios.post(`http://localhost:8000/api/bookings/bookid/bookerid/bookeeid`) // Bookings information from form
            setOpen(false)
            navigate('/')
        } catch(err) {

        }
    }

    /*
    const isAvailable = (data) =>{
         const isFound = data.unavailalableDates.some(date=>
            date.includes(new Date(date).getTime())
        );
        return !isFound
    }
    */

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon 
                    icon={ faCircleXmark } 
                    className='rClose'
                    onClick={() => setOpen(false)}
                />
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
                                    />
                                </span>
                            </div>
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
        </div>
    )
}

export default Reserve