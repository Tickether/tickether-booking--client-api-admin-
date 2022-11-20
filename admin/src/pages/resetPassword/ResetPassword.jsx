import './resetPassword.scss';
import { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ResetPassword = () => {
  const [credentials, setCredentials] = useState({
    password: undefined,
  });
  const [validUrl, setValidUrl] = useState(false)

  const param = useParams()

  const [error, setError] = useState()

  
    
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev)=>({...prev, [e.target.id]:e.target.value}))
  };

  

  useEffect(() => {
      const verifyEmailUrl = async () => {
          try {
              const res = axios.get(`https://api.tickether.io/api/bookers/${param.id}/verify/${param.token}`)
              console.log(res);
              setValidUrl(true)
          } catch (err) {
              console.log(err)
              setValidUrl(false)
          }
      }
      verifyEmailUrl();
  },[param])

  
  const handleCLick = async e => {
    e.preventDefault() 
    try{
      const res = await axios.put(`https://api.tickether.io/api/bookers/${param.id}`, credentials);
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
        {!validUrl ? (
                <div>
                    <input 
                      type="password" 
                      placeholder='password' 
                      id='password' 
                      onChange={handleChange} 
                      className="rpInput" 
                    />
                    <button onClick={handleCLick} className="rpButton">Reset</button>
                    <p>Already reset account? <Link to='/login'>Login</Link></p>
                    {error && <span>{error}</span>}
                </div>
            ) : (
                <div>
                    <span>404 Not Found</span>
                </div>
            )
        }
      </div>
    </div>
  )
}

export default ResetPassword