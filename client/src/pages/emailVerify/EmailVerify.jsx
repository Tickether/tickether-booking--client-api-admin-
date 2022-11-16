import './emailVerify.css'
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


const EmailVerify = () => {
    
    const [validUrl, setValidUrl] = useState(false)
    const param = useParams()
    
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

    return(
        <Fragment>
            {validUrl ? (
                <div>
                    <h1>Email Verified Successfully</h1>
                    <Link to='/login'>
                        <button>Login</button>
                    </Link> 
                </div>
            ) : (
                <div>
                    <h1>404 Not Found</h1>
                </div>
            )
            }
        </Fragment>    
    )
}

export default EmailVerify