import "./navbar.css";
import{Link} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {

    const { user } = useContext(AuthContext);

    console.log(user)

    return (
        <div className='navbar'>
            <div className='navContainer'>
                <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
                    <span className='logo'>tickether</span>
                </Link>
                {user ? (
                    (user.firstName)
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