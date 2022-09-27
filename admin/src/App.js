import './style/dark.scss';
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import List from "./pages/list/List";
import { productInputs, userInputs } from "./formSource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";


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
            <Route path="books">
              <Route 
                index 
                element={ 
                  <ProtectedRoute>
                    <List/>
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
                    <New
                      inputs={userInputs} 
                      title='Add New User'
                    />
                  </ProtectedRoute> 
                } 
              />
            </Route>
            <Route path="products">
              <Route 
                index 
                element={ 
                  <ProtectedRoute>
                    <List/>
                  </ProtectedRoute> 
                }
              />
              <Route 
                path=":productId" 
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
                    <New inputs={productInputs} title='Add New Product'/>
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
