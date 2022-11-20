import './newBooking.scss';
import "react-datepicker/dist/react-datepicker.css";
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { useState } from 'react';
import { bookingInputs } from '../../../formSource';
import axios from 'axios';
import useFetch from '../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import isSameDay from 'date-fns/isSameDay';


const NewBooking = () => {
  const booker = JSON.parse(localStorage.getItem('user'));
  const bookerid = booker._id;
  const bookeeid = booker.bookee[0];

  const [info, setInfo] = useState({});
  const [books, setBook] = useState([])
  const [bookedDates, setBookedDates] = useState([])
  const [bookedDateTime, setBookedDateTime] = useState([])
  const [selectBook, setSelectBook] = useState({})
  
  const {data, loading} = useFetch(`https://api.tickether.io/api/bookees/books/${bookeeid}`);
  console.log(data)

  const [selectedDate, setSelectedDate] = useState();
  const getExcludeTimesForDate = (date) => bookedDates.filter((time) => isSameDay(date, time));
  const [excludeTimes, setExcludeTimes] = useState(getExcludeTimesForDate(selectedDate));

  const navigate = useNavigate();


  const handleChange = (e) => {
    setInfo(prev=>({...prev,[e.target.id]:e.target.value}))
  }

  const handleBookedDates = async () => {
    let excludedDates = []
    const bookee =  await axios.get(`https://api.tickether.io/api/bookees/find/${bookeeid}`)
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

  const handleClick = async e => {
    e.preventDefault()
    try {
      //Post to DB after confirmation 
      // if null date 
      if (selectedDate){
        // strip time and get Date()
        const dateStamp = selectedDate.getTime();
        console.log(dateStamp)
        //DB Data
        const newBooking = {
          ...info,
          booker: bookerid,
          book: books[0],
          bookee: bookeeid,
          bookName:selectBook.bookName,
          bookingDate: dateStamp,
          offBook: true
        }
        
        let newBookedDates = []

        if (bookedDateTime.length === 0 ) {
          newBookedDates.push(dateStamp)
        } else {

          for(let i = 0; i < bookedDateTime.length; i++ ){
            const gettingDate = new Date(bookedDateTime[i]) ;
            const gettingTime = gettingDate.getTime();
            newBookedDates.push(gettingTime)
          }
          newBookedDates.push(dateStamp)
        }
  
        
        
  
        console.log(bookedDateTime)
        console.log(newBookedDates)
  
  
  
        console.log(newBooking)
  
        if (selectBook.bookType === 'Shows'){
          axios.post(`https://api.tickether.io/api/bookings/${selectBook._id}/${bookerid}/${bookeeid}`, newBooking) // Bookings information from form
          axios.put(`https://api.tickether.io/api/bookees/${bookeeid}`, {showBookings: newBookedDates}) // unavailable Date to Bookee
        } else if (selectBook.bookType === 'Features') {
          axios.post(`https://api.tickether.io/api/bookings/${selectBook._id}/${bookerid}/${bookeeid}`, newBooking) // Bookings information from form
          axios.put(`https://api.tickether.io/api/bookees/${bookeeid}`, {featureBookings:newBookedDates}) // unavailable Date to Bookee
        }
        navigate('/bookings')
      }

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
              </div>
            <div className="formInput">
              <label>Date</label>
              <span>
                <DatePicker
                  className='date'
                  selected={selectedDate}
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
            <button className='btn' onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default NewBooking;
  








