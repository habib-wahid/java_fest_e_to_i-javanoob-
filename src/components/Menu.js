import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, NavLink, Route,Routes} from 'react-router-dom';
import {Button} from "react-bootstrap";
import AuthUser from "./AuthUser";
import Dashboard from "./Dashboard";
import Account from "../account/Account";
import CreatePosts from "../posts/CreatePost";
import UserPosts from "../posts/UserPosts";
import CompanyProfile from "../profile/CompanyProfile";
import InvestorAccount from "../account/InvestorAccount";
import AllInvestors from "../common/AllInvestors";

function Menu() {

  const {getToken,logout} = AuthUser();

  const singOut=()=>{

    if(getToken() !== undefined){

      logout();
    }
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">E-to-I</Navbar.Brand>
          <Nav className="me-auto">
            <Link style={{
              textDecoration:"none",
              padding:"5px",
              fontSize:"22px"
            }}
                to="/dashboard">Dashboard</Link>
          </Nav>

          <Nav className="me-auto">
            <Link style={{
              textDecoration:"none",
              padding:"5px",
              fontSize:"22px",

            }}
                  to="/all-investor">Investors</Link>
          </Nav>

          <Nav className="me-auto">
           <Button onClick={singOut}>
             singout
           </Button>
          </Nav>
        </Container>
      </Navbar>

      <container>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/create-posts" element={<CreatePosts />} />
          <Route path="/user-posts" element={<UserPosts />} />
          <Route path="/user-account" element={<InvestorAccount />} />
          <Route path="/all-investor" element={<AllInvestors />} />
          <Route path="/company-profile/:name" element={<CompanyProfile />} />
        </Routes>
      </container>
    </>
  )
}

export default Menu