import './sales.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';


const Sales = () => {
  return (
    <div className="sales">
      <Sidebar/>
      <div className="salesContainer">
        <Navbar/>
      </div>
    </div>
  );
}
  
export default Sales;
  








