import './balances.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import BalancesList from '../../components/balancesList/BalancesList';


const Balances = () => {
  return (
    <div className="balances">
      <Sidebar/>
      <div className="balancesContainer">
        <Navbar/>
        <BalancesList/>
      </div>
    </div>
  );
}
  
export default Balances;
  








