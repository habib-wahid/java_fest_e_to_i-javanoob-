import React, {useEffect, useState} from "react";
import SideMenu from "../common/SideMenu";
import {Button, Card, Col, Form} from "react-bootstrap";
import AuthUser from "../components/AuthUser";


export default function CreatePosts(){

    const {getUser} = AuthUser();
    const user = getUser();
    const {http,httpmultipart} = AuthUser();
    const [data,setData] = useState({
        "userName" : user.userName,
        "projectType":'Tech'
    });
    const [image,setImage] = useState("");

    const handleChange=(e)=>{


        if(e.target.name === "banner"){
            setImage(e.target.files[0]);
        }else{
            setData({
                ...data,
                [e.target.name] : e.target.value
            });

        }

    }


    const onSubmit=()=>{

        console.log("Data " , data)
        let formData = new FormData();
        formData.append("logo",image);
        formData.append("file",JSON.stringify(data));

        httpmultipart.post('post/create-post',formData).then(
            (res)=>{
                console.log("result ",res);
            }
        )

       // console.log("Form Data ", user.userName);

    }

    return(
        <div className="container">
            <SideMenu />
            <div style={{
                marginTop:"50px"
            }}>
                <h4>Create a post to get investment</h4>

                <div>
                    <Col sm={6}>
                        <Card style={{
                            marginTop:"50px"
                        }}>
                            <Card.Body>
                                <Form>

                                    <Form.Group className="mb-3">
                                        <Form.Label><b> Project Name </b></Form.Label> <br />
                                        <input style={{
                                            width:"100%"
                                        }} type="text" name="projectName" onChange={handleChange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label><b>Project Type </b></Form.Label>
                                        <Form.Select name="projectType" onChange={handleChange}>
                                            <option>Tech</option>
                                            <option>Marketing</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label> <b>Project Description </b></Form.Label>
                                        <br />
                                        <textarea style={{
                                            width:"100%"
                                        }} name="projectDescription" onChange={handleChange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label> <b>Investment Found </b></Form.Label>
                                        <Form.Control type="text" name="investment" onChange={handleChange}  />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label> <b>Investment Needed </b></Form.Label>
                                        <Form.Control type="text" name="investmentNeeded" onChange={handleChange}  />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label> <b>Project Banner </b></Form.Label> <br />
                                        <input type="file" name="banner" onChange={handleChange} />
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

        </div>
    )
}