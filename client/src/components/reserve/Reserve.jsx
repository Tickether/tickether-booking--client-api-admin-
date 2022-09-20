import './reserve.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from '../../hooks/useFetch';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Reserve = ({setOpen, bookeeId}) =>{

    const { data, loading, error } = useFetch(`http://localhost:8000/api/bookees/books/${bookeeId}`)

    const {date} = useContext(SearchContext) 

    const navigate = useNavigate()

    const handleClick = async () => {
        try{
            //wallet connect and mint
            //After metamask corfirmation of mint and store txid
            const bookId = await data._id
            const res = axios.put(`/books/${bookId}`, {dates:date}) // unavailable Date to BookId
            const createBooking = axios.post('') // Bookings information from form
            setOpen(false)
            navigate('/')
        } catch(err) {

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
                <span>Select your:</span>
                {data.map(item=>(
                    <div className="rBookInfo">
                        <div className="rbookName">{item.bookName}</div>
                        <div className="rbookName">{item.bookType}</div>
                        <div className="rbookDesc">{item.description}</div>
                        <div className="rbookFee">{item.bookFee}</div>
                    </div>
                ))}
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