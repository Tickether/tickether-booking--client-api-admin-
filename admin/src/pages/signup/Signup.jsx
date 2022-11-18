import './signup.css'
import { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'; 
// import { useNavigate } from 'react-router-dom';

const Signup = () => {
    
    const [credentials, setCredentials] = useState({
        firstName: undefined,
        lastName: undefined,
        phone: undefined,
        email: undefined,
        password: undefined,
        isBookee: true
    });

    const [error, setError] = useState()
    
    const [msg, setMsg] = useState('')

    const [loading, setLoading] = useState(false)
    
    // const navigate = useNavigate();
    

    const handleChange = (e) => {
        setCredentials((prev)=>({...prev, [e.target.id]:e.target.value}))
    };
    
    const handleCLick = async (e) => {
        e.preventDefault()
        setLoading(true)
        try{
            const res = await axios.post('https://api.tickether.io/api/auth/register', credentials);
            setMsg(res.data)
            console.log(res)
        } catch(err) {
            setError(err.response.data.message)
            setLoading(false)
            
        }
    };
    


    return(
        <div className="signup"> 
            <div className="sContainer">
                <input 
                    type="text" 
                    placeholder='First Name' 
                    id='firstName' 
                    onChange={handleChange} 
                    required
                    className="sInput" 
                />
                <input 
                    type="text" 
                    placeholder='Last Name' 
                    id='lastName' 
                    onChange={handleChange} 
                    required
                    className="sInput" 
                />
                <input 
                    type="text" 
                    placeholder='Email' 
                    id='email' 
                    onChange={handleChange} 
                    required
                    className="sInput" 
                />
                <input 
                    type="text" 
                    placeholder='Phone' 
                    id='phone' 
                    onChange={handleChange} 
                    required
                    className="sInput" 
                />
                <input 
                    type="password" 
                    placeholder='Password' 
                    id='password' 
                    onChange={handleChange} 
                    required
                    className="sInput" 
                />
                <button disabled={loading} onClick={handleCLick} className="sButton">Signup</button>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
                {error && <span>{error}</span>}
                {msg && <span>{msg}</span>}
            </div>
        </div>
    )
}

export default Signup