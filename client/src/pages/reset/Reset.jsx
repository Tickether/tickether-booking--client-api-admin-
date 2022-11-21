import './reset.css';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Reset = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
  });

  const [error, setError] = useState()
    
  const [msg, setMsg] = useState('')

  const handleChange = (e) => {
    setCredentials((prev)=>({...prev, [e.target.id]:e.target.value}))
  };

  const handleCLick = async e => {
    e.preventDefault()
    try{
      const res = await axios.post('https://api.tickether.io/api/auth/reset', credentials);
      console.log(res)
      setMsg(res.data)
    } catch(err) {
      console.log(err)
      setError(err.response.data.message)
    }
  };

 
  return(
    <div className="reset"> 
      <div className="rContainer">
        <input 
          type="text" 
          placeholder='email' 
          id='email' 
          onChange={handleChange} 
          className="rInput" 
        />
        <button onClick={handleCLick} className="rButton">Send</button>
        <p>Dont have an account? <Link to='/signup'>Sign Up</Link></p>
        {error && <span>{error}</span>}
        {msg && <span>{msg}</span>}
      </div>
    </div>
  )
}

export default Reset