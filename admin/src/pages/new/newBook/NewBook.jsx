import './newBook.scss';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { useState } from 'react';
import axios from 'axios';
import { bookInputs } from "../../../formSource";
import { useNavigate } from 'react-router-dom';

const NewBook = () => {

  const navigate = useNavigate();
  
  // get booker/UID from local storage 
  const booker = JSON.parse(localStorage.getItem('user'))

  // filter bookee from UID(aka booker)
  const bookeeid = booker.bookee[0]
  
  const[info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo(prev=>({...prev,[e.target.id]:e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault()
    
    try {
      const newBook = {
        ...info,
        bookee:bookeeid,
      }

      console.log(newBook)

      await axios.post(`https://api.tickether.io/api/books/${bookeeid}`, newBook)
      
      navigate('/books')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="newbook">
      <Sidebar/>
      <div className="newbookContainer">
        <Navbar/>
        <div className="topbook">
          <h1>Add New Book</h1>
        </div>
        <div className="bottombook">
          <div className="rightbook">
            <form>
              {bookInputs.map((input) => (
                <div className="formInputbook" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button className='btnbook' onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default NewBook;
  


// onClick={handleClick}





