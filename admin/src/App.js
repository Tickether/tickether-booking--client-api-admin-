import './style/dark.scss';
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import NewBook from "./pages/new/newBook/NewBook";
import NewBooking from "./pages/new/newBooking/NewBooking"
import List from "./pages/list/List";
import { bookingInputs, bookInputs } from "./formSource";
import { bookColumns, bookingColumns } from "./datatablesource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Bookee from './pages/bookee/Bookee';


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
                    <NewBooking/>
                  </ProtectedRoute> 
                } 
              />
            </Route>        
            <Route path="books">
              <Route 
                index 
                element={ 
                  <ProtectedRoute>
                    <List columns={bookColumns}/>
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
                    <List columns={bookingColumns}/>
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
            <Route path="messages">
              <Route 
                index 
                element={ 
                  <ProtectedRoute>
                    <List/>
                  </ProtectedRoute> 
                }
              />
              <Route 
                path=":messageId" 
                element={ 
                  <ProtectedRoute>
                    <Single/>
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

