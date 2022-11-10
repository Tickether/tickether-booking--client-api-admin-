import './newBooking.scss';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { useState } from 'react';
import { bookingInputs } from '../../../formSource';
import axios from 'axios';
import useFetch from '../../../hooks/useFetch';


const NewBooking = () => {
  const booker = JSON.parse(localStorage.getItem('user'));
  const bookerid = booker._id;
  const bookeeid = booker.bookee[0];

  const [info, setInfo] = useState({});
  const [books, setBook] = useState([])
  
  const {data, loading, error} = useFetch(`https://api.tickether.io/api/bookees/books/${bookeeid}`);
  console.log(data)


  const handleChange = (e) => {
    setInfo(prev=>({...prev,[e.target.id]:e.target.value}))
  }

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value)
    setBook(value)
  }

  const handleClick = async e => {
    e.preventDefault()
    try {
      const newBooking = {
        ...info,
        booker: bookerid,
        book: books[0],
        bookee: bookeeid,
        offBook: true
      }
      /*
      const showDate = {
        showBookings: true
        
      }
      const featureDate = {
        featureBookings: true
      }
      */



      console.log(newBooking)
      const booking = await axios.post(`https://api.tickether.io/api/bookings/${books[0]}/${bookerid}/${bookeeid}`, newBooking)
      //await axios.put(`https://api.tickether.io/api/bookees/${bookeeid}`, showDate)
      //await axios.put(`https://api.tickether.io/api/bookees/${bookeeid}`, featureDate)
      console.log(booking)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>Add new off-booking</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
            <div className="formInput">
              </div>
              {bookingInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <div className="selectBooks">
                <label htmlFor="">books</label>
                <select id="books" onChange={handleSelect}>
                  {loading ? "loading" : data && data.map(book=>(
                    <option key={book._id} value={book._id}>{book.bookName}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default NewBooking;
  








