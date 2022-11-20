import './resetPassword.scss';
import { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [credentials, setCredentials] = useState({
    password: undefined,
  });

  const param = useParams()

  const [error, setError] = useState()
    
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev)=>({...prev, [e.target.id]:e.target.value}))
  };

  const handleCLick = async e => {
    e.preventDefault() 
    try{
      const res = await axios.post(`https://api.tickether.io/api/bookers/${param.id}/forgotpassword/${param.token}`, credentials);
      console.log(res)
      navigate('/login')
    } catch(err) {
      console.log(err)
      setError(err.response.data.message)
    }
  };


  return(
    <div className="resetPassword"> 
      <div className="rpContainer">
        <input 
          type="password" 
          placeholder='password' 
          id='password' 
          onChange={handleChange} 
          className="rpInput" 
        />
        <button onClick={handleCLick} className="rpButton">Reset</button>
        {error && <span>{error}</span>}
      </div>
    </div>
  )
}

export default ResetPassword