import './bookee.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Chart from '../../components/chart/Chart';
import List from '../../components/table/Table';

const Bookee = () => {

  // get booker/UID from local storage 
  const booker = JSON.parse(localStorage.getItem('user'))

  // filter bookee from UID(aka booker)
  const bookeeid = booker.bookee[0]

  // to get info for this page
  const {data, loading, error} = useFetch(`http://localhost:8000/api/bookees/find/${bookeeid}`)

  console.log(data)
  return (
    <div className="Info">
      <Sidebar/>
      <div className="InfoContainer">
        <Navbar/>
        <div className="condition">
          {data.length == 0 ? (
            <div className="setup">
              <h1>You have not fully Setup Your Account</h1>
              <Link to='/bookee/new'>
                <button>Setup</button>
              </Link>
            </div>
          ) : (
            <>
              <div className="top">
                <div className="left">
                  <div className="editButton">Edit</div>
                  <h1 className="title">Information</h1>
                  <div className="item">
                    <img 
                      src={data.cover[0]} 
                      alt="" 
                      className="itemImg" 
                    />
                    <div className="details">
                      <h1 className="itemTitle">{data.name}</h1>
                      <div className="detailItem">
                        <span className="itemKey">Label:</span>
                        <span className="itemValue">{data.label}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Genre:</span>
                        <span className="itemValue">{data.genre}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Address:</span>
                        <span className="itemValue">Elton St 234 Garden, {data.city}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Country:</span>
                        <span className="itemValue">{data.country}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <Chart aspect={3 / 1} title={'User Withdrawals (Last 6 Months)'} />
                </div>
              </div>
              <div className="bottom">
                <h1 className="title">Lastest Withdrawals(direct contract quercy from etherscan)</h1>
                <List/>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
  
export default Bookee;
