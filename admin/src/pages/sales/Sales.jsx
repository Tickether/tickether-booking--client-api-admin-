import './sales.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import SalesList from '../../components/salesList/SalesList';


const Sales = () => {
  return (
    <div className="sales">
      <Sidebar/>
      <div className="salesContainer">
        <Navbar/>
        <SalesList/>
      </div>
    </div>
  );
}
  
export default Sales;
  








