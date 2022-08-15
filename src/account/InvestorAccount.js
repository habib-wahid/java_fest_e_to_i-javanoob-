import React, {useState} from "react";
import {Button, Card, Col, Form} from "react-bootstrap";
import AuthUser from "../components/AuthUser";
import {useNavigate} from "react-router-dom";


export default function InvestorAccount(){

    const navigate = useNavigate();
    const {getUser,http} = AuthUser();
    const user = getUser();

    const [data,setData] = useState({
        username : user.userName,
        projectType:"Tech"
    })

    const handleChange=(e)=>{
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }


    const onSubmit=()=>{

        http.post('user/save-investor',data).then(
            (res)=>{
                console.log("result ",res.data);
                navigate('/dashboard')
            }
        )
    }

    return(
        <div className="container">
            InvestorAccount

            <div>
                <Col sm={6}>
                    <Card style={{
                        marginTop:"50px"
                    }}>
                        <Card.Body>
                            <Form>

                                <Form.Group className="mb-3">
                                    <Form.Label><b> Cell Number </b></Form.Label> <br />
                                    <input style={{
                                        width:"100%"
                                    }} type="text" name="number" onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label><b>Preferred Category for Investment</b></Form.Label>
                                    <Form.Select name="projectType" onChange={handleChange}>
                                        <option>Tech</option>
                                        <option>Marketing</option>
                                    </Form.Select>
                                </Form.Group>


                                <Form.Group className="mb-3">
                                    <Form.Label> <b>Investment Amount </b></Form.Label>
                                    <Form.Control type="text" name="investment" onChange={handleChange}  />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label> <b>Address </b></Form.Label>
                                    <Form.Control type="text" name="address" onChange={handleChange}  />
                                </Form.Group>



                                <Button variant="primary" onClick={onSubmit}>
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
        </div>
    )
}