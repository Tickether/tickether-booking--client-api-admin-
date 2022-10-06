import './books.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import BooksDatatable from '../../components/booksdatatable/BooksDatatable';


const Books = ({columns}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <BooksDatatable/>
      </div>
    </div>
  );
}
  
export default Books;
  








