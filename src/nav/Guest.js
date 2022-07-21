import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";


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
                </Container>
            </Navbar>
        </div>
    )
}