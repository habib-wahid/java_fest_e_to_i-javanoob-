import React from "react";
import {Routes,Route} from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard";
import Menu from "./components/Menu";
import AuthUser from "./components/AuthUser";
import Guest from "./nav/Guest";

function App() {
    const {getToken} = AuthUser();

  return (
    <div>


        {  !getToken() || getToken() === null?

            <Guest /> :
            <Menu />
        }


        <div>
            <Routes>
                <Route path="/home" element={<Home />} />
            </Routes>
        </div>
    </div>
  );
}

export default App;
