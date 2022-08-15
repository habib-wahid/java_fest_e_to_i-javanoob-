import React from "react";
import {Col, Row} from "react-bootstrap";
import habib from '../images/habib.jpg';
import anika from '../images/anika.jpg';

import './about.css';

export default function About(){
    return(
        <div className="container">
            <h4>About Us</h4>
            <Row>
                <Col>
                        <img style={{
                            borderRadius:"50%"
                        }} src={habib} width="400" height="400" />
                            <div className="container">
                                <h4><b>MD Habibur Rahman</b></h4>
                                <h4><b>SUST</b></h4>
                                <h4><b>Software Engineering-17</b></h4>
                            </div>
                </Col>

                <Col>

                        <img style={{
                            borderRadius:"50%"
                        }} src={anika} width="400" height="400" />
                        <div>
                            <h4><b>Anika Tabassum </b></h4>
                            <h4><b>RUET</b></h4>
                            <h4><b>CSE-16</b></h4>
                        </div>

                </Col>
            </Row>
        </div>
    )
}