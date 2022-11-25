import './balances.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';


const Balances = () => {
  return (
    <div className="balances">
      <Sidebar/>
      <div className="balancesContainer">
        <Navbar/>
      </div>
    </div>
  );
}
  
export default Balances;
  








