import './salesList.scss';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { useState } from 'react';
import SalesItems from './salesItems/SalesItems';



    

const SalesList = () => {

    const user = JSON.parse(localStorage.getItem('user'))


    //const [books, setBook] = useState([])
    const [selectBookings, setSelectBooking] = useState([])
    //const [info, setInfo] = useState({});

    const { data, loading } = useFetch(`https://api.tickether.io/api/bookees/books/${user.bookee[0]}`)

    //const navigate = useNavigate()


    /*
    const handleChange = (e) => {
        setInfo(prev=>({...prev,[e.target.id]:e.target.value}))
    }
    */

    const handleSelect = async (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value)
        const bookings = await axios.get(`https://api.tickether.io/api/books/bookings/${value}`)
        setSelectBooking(bookings.data)
        
    }

    console.log(selectBookings)
    console.log(data)

    
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
                    <div className="listResults">
                        {loading ? (
                            "loading"
                        )   :   (
                            <>
                                {selectBookings.map(item=>(
                                    <SalesItems item={item} key={item._id}/>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div> 
        </div>
    );
}
  
export default SalesList;
  








