import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link,NavLink } from 'react-router-dom';
import {Button} from "react-bootstrap";
import AuthUser from "./AuthUser";


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
           <Button onClick={singOut}>
             singout
           </Button>
          </Nav>
        </Container>
      </Navbar>

    </>
  )
}

export default Menu