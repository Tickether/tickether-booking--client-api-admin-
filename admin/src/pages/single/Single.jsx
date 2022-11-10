import './single.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Chart from '../../components/chart/Chart';
import List from '../../components/table/Table';
import useFetch from '../../hooks/useFetch';

const Single = () => { 
  const {data, loading, error} = useFetch(`http://tickether-env.eba-38hrijp2.ap-northeast-1.elasticbeanstalk.com/api/bookee/`)

  return (
    <div className="single">
      <Sidebar/>
      <div className="singleContainer">
        <Navbar/>
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img 
                src="https://bafybeieb5j6d6gbq4ds7acmkfkvqrxesgyo7dxg5uc6nmb5xwlrvluiuvm.ipfs.nftstorage.link/asake.jpg" 
                alt="" 
                className="itemImg" 
              />
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+233 24 616 1533</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">Elton St 234 Garden, New York</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title={'User Withdrawals (Last 6 Months)'} />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Lastest Withdrawals</h1>
          <List/>
        </div>
      </div>
    </div>
  );
}
  
export default Single;
  








