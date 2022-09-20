import "./navbar.css";
import{Link} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className='navbar'>
            <div className='navContainer'>
                <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
                    <span className='logo'>tickether</span>
                </Link>
                {user ? (
                    (user.details).firstName
                )   :   (
                    <>
                        <div className="navItems">
                            <button className="Navbutton">Register</button>
                            <button className="Navbutton">Login</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar