import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {Link, Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import LogIn from "../components/LogIn";
import Register from "../components/Register";

export default function Guest(){
    return(
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/home">E-to-I</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link style={{
                            textDecoration:"none",
                            padding:"5px",
                            fontSize:"22px"
                        }}
                              to="/login">Log-In</Link>
                    </Nav>

                    <Nav className="me-auto">
                        <Link style={{
                            textDecoration:"none",
                            padding:"5px",
                            fontSize:"22px"
                        }}
                              to="/register">Register</Link>
                    </Nav>

                </Container>
            </Navbar>

            <container>
                <Routes>
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </container>
        </div>
    )
}