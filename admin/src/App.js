import './style/dark.scss';
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import NewBook from "./pages/new/newBook/NewBook";
import NewBooking from "./pages/new/newBooking/NewBooking"
// import List from "./pages/list/List";
import { bookingInputs, bookInputs } from "./formSource";
// import { bookColumns, bookingColumns } from "./datatablesource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Bookee from './pages/bookee/Bookee';
import NewBookee from './pages/new/newBookee/NewBookee';
import Bookings from './pages/bookings/Bookings';
import Books from './pages/books/Books';
import Signup from './pages/signup/Signup';
import EmailVerify from './pages/emailVerify/EmailVerify';


function App() {

  const {darkMode} = useContext(DarkModeContext)

  const ProtectedRoute = ({children}) =>{
    const {user} = useContext(AuthContext)

    if(!user){
      return <Navigate to='/login' />
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "dark"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login/>} />
            <Route path="signup" element={<Signup/>}/>
            <Route path='/bookers/:id/verify/:token' element={<EmailVerify/>}/>
            <Route 
              index 
              element={ 
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute> 
              } 
            />    
            <Route path="bookee">
              <Route 
                index 
                element={ 
                  <ProtectedRoute>
                    <Bookee/>
                  </ProtectedRoute> 
                }
              />
              <Route 
                path=":bookeeId" 
                element={ 
                  <ProtectedRoute>
                    <Single/>
                  </ProtectedRoute> 
                }
              />
              <Route 
                path="new" 
                element={ 
                  <ProtectedRoute>
                    <NewBookee/>
                  </ProtectedRoute> 
                } 
              />
            </Route>        
            <Route path="books">
              <Route 
                index 
                element={ 
                  <ProtectedRoute>
                    <Books />
                  </ProtectedRoute> 
                } 
              />
              <Route 
                path=":bookId" 
                element={ 
                  <ProtectedRoute>
                    <Single/>
                  </ProtectedRoute> 
                } 
              />
              <Route 
                path="new" 
                element={ 
                  <ProtectedRoute>
                    <NewBook
                      inputs={bookInputs} 
                      title='Add New User'
                    />
                  </ProtectedRoute> 
                } 
              />
            </Route>
            <Route path="bookings">
              <Route 
                index 
                element={ 
                  <ProtectedRoute>
                    <Bookings/>
                  </ProtectedRoute> 
                }
              />
              <Route 
                path=":bookingId" 
                element={ 
                  <ProtectedRoute>
                    <Single/>
                  </ProtectedRoute> 
                }
              />
              <Route 
                path="new" 
                element={ 
                  <ProtectedRoute>
                    <NewBooking 
                      inputs={bookingInputs} 
                      title='Add New Off-Book'/>
                  </ProtectedRoute> 
                } 
              />
            </Route>   
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

