import './navbar.scss';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DarkModeOutlinedIcon  from '@mui/icons-material/DarkModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
//import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { DarkModeContext } from '../../context/darkModeContext';




const Navbar = () => {

  const {dispatchs} = useContext(DarkModeContext)
  
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
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder='Search...' />
          <SearchOutlinedIcon/>
          
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className='icon'/>
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon className='icon' onClick={()=> dispatchs({type: 'TOGGLE'})}/>
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className='icon'/>
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className='icon'/>
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className='icon'/>
            <div className="counter">2</div>
          </div>
          <div className="item">
            <LogoutOutlinedIcon onClick={handleLogout} className='icon'/>
          </div>
          <div className="item">
            <img 
              src='https://bafybeieb5j6d6gbq4ds7acmkfkvqrxesgyo7dxg5uc6nmb5xwlrvluiuvm.ipfs.nftstorage.link/asake.jpg'
              alt=''
              className='avatar'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default Navbar;
  








