import './newBook.scss';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { useState } from 'react';
import axios from 'axios';
import { bookInputs } from "../../../formSource";


const NewBook = () => {
  
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

      await axios.post(`http://tickether-env.eba-38hrijp2.ap-northeast-1.elasticbeanstalk.com/api/books/${bookeeid}`, newBook)

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
          <h1>Add New Book</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {bookInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button onClick={handleClick} >Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default NewBook;
  


// onClick={handleClick}





