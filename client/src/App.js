import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Bookee from './pages/bookee/Bookee';
import Login from './pages/login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element={<Home/>} />
        <Route path = '/bookees' element={<List/>} />
        <Route path = '/bookees/:id' element={<Bookee/>} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
