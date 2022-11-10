import './newBookee.scss';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';
import { bookeeInputs } from '../../../formSource';
import axios from 'axios';


const NewBookee = () => {
  
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
      const bookee = await axios.post(`http://tickether-env.eba-38hrijp2.ap-northeast-1.elasticbeanstalk.com/api/bookees/${bookerId}`, newBookee)

      console.log(bookee)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>Setup Booking Profile</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img 
              src={
                files
                  ? URL.createObjectURL((files[0]))
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              } 
              alt="" 
            />
          </div>
          <div className="right">
            <form>
            <div className="formInput">
                <label htmlFor='file'>
                  Image: <DriveFolderUploadOutlinedIcon className='icon'/>
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
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                    id={input.id} 
                    onChange={handleChange} 
                    type={input.type} 
                    placeholder={input.placeholder} 
                  />
                </div>
              ))}
              <button onClick={handleClick} >Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default NewBookee;
  








