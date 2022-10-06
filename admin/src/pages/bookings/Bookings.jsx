import './bookings.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import BookingsDatatable from '../../components/bookingsdatatable/BookingsDatatable';

const Bookings = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <BookingsDatatable/>
      </div>
    </div>
  );
}
  
export default Bookings;
  








