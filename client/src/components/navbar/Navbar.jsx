import "./navbar.css";
import{Link} from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

    const { user, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = async e => {
        e.preventDefault()
        //dispatch({type:'LOGIN_SUCCESS'})
        try{
            dispatch({type:'LOGOUT'});
            navigate('/')
        } catch(err) {
            dispatch({type:'LOGOUT', payload:err.response.data})
        }
    };

    console.log(user)

    return (
        <div className='navbar'>
            <div className='navContainer'>
                <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
                    <span className='logo'>tickether</span>
                </Link>
                {user ? (
                    (
                    <div>
                        {user.firstName}
                        <button onClick={handleLogout}>LOGOUT</button>
                    </div>
                    )
                )   :   (
                    <>
                        <div className="navItems">
                            <Link to='/signup'>
                                <button className="Navbutton">Register</button>
                            </Link>
                            
                            <Link to='/login'>
                                <button className="Navbutton">Login</button>
                            </Link>
                            
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar