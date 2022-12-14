import './newBookee.scss';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';
import { bookeeInputs } from '../../../formSource';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const NewBookee = () => {

  const navigate = useNavigate();
  
  const[files, setFiles] = useState('');
  const[info, setInfo] = useState({});
  
  const handleChange = (e) => {
    setInfo(prev=>({...prev,[e.target.id]:e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault()
    const data = new FormData()
    data.append('file', files)
    data.append('upload_preser', 'upload')
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user._id)
      const bookerId = user._id
      const list = await Promise.all(
        Object.values(files).map(async (file)=>{
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'upload');
          const uploadRes = await axios.post(
            'https://api.cloudinary.com/v1_1/dv37dcxfs/image/upload', 
            data
          );

          const { url } = uploadRes.data;
          return url;
        })      
      );
      const newBookee = {
        ...info,
        cover: list,
        booker: bookerId,
      }

      //console.log(newBookee)
      const bookee = await axios.post(`https://api.tickether.io/api/bookees/${bookerId}`, newBookee)

      console.log(bookee)
      navigate('/bookee')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="newbookee">
      <Sidebar/>
      <div className="newbookeeContainer">
        <Navbar/>
        <div className="topbookee">
          <h1>Setup Booking Profile</h1>
        </div>
        <div className="bottombookee">
          <div className="leftbookee">
            <img 
              src={
                files
                  ? URL.createObjectURL((files[0]))
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              } 
              alt="" 
            />
          </div>
          <div className="rightbookee">
            <form>
            <div className="formInpubookeet">
                <label htmlFor='file'>
                  Image: <DriveFolderUploadOutlinedIcon className='iconbookee'/>
                </label>
                <input 
                  type="file"  
                  id='file'
                  multiple
                  onChange={e=>setFiles(e.target.files)} 
                  style={{display:'none'}}
                />
              </div>
              {bookeeInputs.map((input) => (
                <div className="formInputbookee" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                    id={input.id} 
                    onChange={handleChange} 
                    type={input.type} 
                    placeholder={input.placeholder} 
                  />
                </div>
              ))}
              <button className='btnbookee' onClick={handleClick} >Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default NewBookee;
  








