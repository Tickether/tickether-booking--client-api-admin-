import './newBook.scss';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { useState } from 'react';
import axios from 'axios';
import { bookInputs } from "../../../formSource";


const NewBook = () => {
  
  const[info, setInfo] = useState({});


  const handleChange = (e) => {
    setInfo(prev=>({...prev,[e.target.id]:e.target.value}))
  }
/*
  const handleClick = async e => {
    e.preventDefault()
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preser', 'upload')
    try {
      const uploadRes = await axios.post(
        '', 
        data
      );
      const {url} = uploadRes.data

      const newBook = {
        ...info,
        img:url,
      }

      await axios.post('/book', newBook)

    } catch (err) {
      console.log(err)
    }
  }
*/
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
                  <input id={input.type} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button >Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default NewBook;
  


// onClick={handleClick}





