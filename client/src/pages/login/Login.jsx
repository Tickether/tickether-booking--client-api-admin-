import './login.css'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
    });

    const { loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev)=>({...prev, [e.target.id]:e.target.value}))
    };

    const handleClick = async e => {
        e.preventDefault()
        dispatch({type:'LOGIN_START'})
        try{
            const res = await axios.post('https://api.tickether.io/api/auth/login', credentials);
            dispatch({type:'LOGIN_SUCCESS', payload:res.data.details});
            navigate('/')
        } catch(err) {
            dispatch({type:'LOGIN_FAILURE', payload:err.response.data})
        }
    };


    return(
        <div className="login"> 
            <div className="lContainer">
                <input 
                    type="text" 
                    placeholder='email' 
                    id='email' 
                    onChange={handleChange} 
                    className="lInput" 
                />
                <input 
                    type="password" 
                    placeholder='password' 
                    id='password' 
                    onChange={handleChange} 
                    className="lInput" 
                />
                <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
                <p>Dont have an account? <Link to='/signup'>Sign Up</Link></p>
                <p>Forgot your password? <Link to='/reset'>Reset</Link></p>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
}

export default Login