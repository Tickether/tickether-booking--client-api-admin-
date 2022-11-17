import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home';
import List from './pages/list/List';
import Bookee from './pages/bookee/Bookee';
import Login from './pages/login/Login';
import Success from './pages/success/Success';
import Bookings from './pages/bookings/Bookings';
import ListGenre from './pages/listGenre/ListGenre';
import ListRegion from './pages/listRegion/ListRegion';
import Signup from './pages/signup/Signup';
import EmailVerify from './pages/emailVerify/EmailVerify';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element={<Home/>} />
        <Route path = '/bookees' element={<List/>} />
        <Route path = '/bookees/:id' element={<Bookee/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/bookers/:id/verify/:token' element={<EmailVerify/>}/>
        <Route path='/bookings' element={<Bookings/>}/>
        <Route path='/success/:id' element={<Success/>}/>
        <Route path='/bookees/region/:id' element={<ListRegion/>}/>
        <Route path='/bookees/genre/:id' element={<ListGenre/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
