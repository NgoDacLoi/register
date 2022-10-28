import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";

import eventBus from "./common/EventBus";
import AuthService from "./services/auth.service";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    eventBus.on("logout", () => {
      logOut();
    });

    return () => {
      eventBus.remove("logout");
    };
  },[]);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };





  return (
    <div>
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Logo
          </Link> 
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                
              </Link>
            </li>
            {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"login"} className="nav-link" onClick={logOut}>
                LogOut
              </Link>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
