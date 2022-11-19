import './sidebar.scss';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
import DashboardIcon  from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';


const Sidebar = () => {
    const { dispatchs } = useContext(DarkModeContext)

    const { dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = async e => {
        e.preventDefault()
        try{
            dispatch({type:'LOGOUT'});
            navigate('/login')
        } catch(err) {
            dispatch({type:'LOGOUT', payload:err.response.data})
        }
    };

    return (
      <div className="sidebar">
        <div className="top">
            <Link to='/' style={{ textDecoration:'none' }}>
                <span className="logo">tickether</span>
            </Link>
        </div>
        <hr />
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <Link to='/' style={{ textDecoration:'none' }}>
                    <li>
                        <DashboardIcon className='icon'/>
                        <span>Dashboard</span>
                    </li>
                </Link>
                <Link to='/bookee' style={{ textDecoration:'none' }}>
                    <li>
                        <CreditCardIcon className='icon'/>
                        <span>Bookee</span>
                    </li>
                </Link>
                <p className="title">LIST</p>
                <Link to='/books' style={{ textDecoration:'none' }}>
                    <li>
                        <PersonOutlineIcon className='icon'/>
                        <span>Books</span>
                    </li>
                </Link>
                <Link to='/bookings' style={{ textDecoration:'none' }}>
                    <li>
                        <CreditCardIcon className='icon'/>
                        <span>Bookings</span>
                    </li>
                </Link>
                <p className="title">USEFUL</p>
                <Link style={{ textDecoration:'none' }}>
                    <li>
                        <InsertChartIcon className='icon'/>
                        <span>Stats</span>
                    </li>
                </Link>
                <Link style={{ textDecoration:'none' }}>
                    <li>
                        <NotificationsNoneIcon className='icon'/>
                        <span>Notifications</span>
                    </li>
                </Link>
                
                <p className="title">SERVICE</p>
                <Link style={{ textDecoration:'none' }}>
                    <li>
                        <SettingsSystemDaydreamOutlinedIcon className='icon'/>
                        <span>Support</span>
                    </li>
                </Link>
                <Link style={{ textDecoration:'none' }}>
                    <li>
                        <SettingsApplicationsIcon className='icon'/>
                        <span>Setting</span>
                    </li>
                </Link>
                <Link style={{ textDecoration:'none' }}>
                    <li>
                        <PsychologyOutlinedIcon className='icon'/>
                        <span>Logs</span>
                    </li>
                </Link>
                <p className="title">USER</p>
                <Link style={{ textDecoration:'none' }}>
                    <li>
                        <AccountCircleOutlinedIcon className='icon'/>
                        <span>Profile</span>
                    </li>
                </Link>
                <Link onClick={handleLogout} style={{ textDecoration:'none' }}>
                    <li>
                        <ExitToAppIcon className='icon'/>
                        <span>Logout</span>
                    </li>
                </Link>
            </ul>
        </div>
        <div className="bottom">
            <div className="colorOption" onClick={()=> dispatchs({type: 'LIGHT'})}></div>
            <div className="colorOption" onClick={()=> dispatchs({type: 'DARK'})}></div>
        </div>
      </div>
    );
  }
  
export default Sidebar;





/*
                
                */



