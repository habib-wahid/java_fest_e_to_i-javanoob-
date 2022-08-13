import React from "react";
import SideMenu from "../common/SideMenu";
import {Button, Card, Col, Form} from "react-bootstrap";
import {useState} from "react";
import AuthUser from "../components/AuthUser";
import {useNavigate} from "react-router-dom";

export default function EditPost({item,setEditClick}){

    const navigate = useNavigate();
    const {http} = AuthUser();
    const [data,setData] = useState({
        id:item.id,
        projectName:item.projectName,
        projectType:item.type,
        projectDescription:item.description,
        investment:item.investmentfound,
        investmentNeeded:item.investmentneeded
    });


    //
    // private Long id;
    // private String projectName;
    // private String projectType;
    // private String projectDescription;
    // private String investment;
    // private String investmentNeeded;
    //

    const handleChange=(e)=>{


        if(e.target.name === "banner"){
           // setImage(e.target.files[0]);
        }else{
            setData({
                ...data,
                [e.target.name] : e.target.value
            });

        }

    }


    const onSubmit=()=>{

        http.put('/post/edit-post',data).then((res)=>{
            console.log("REs ",res.data)
            setTimeout(()=>{
                window.location.reload();
            },)
        })

        console.log("Data ",data)

    }

    return(
        <div className="container">
            {/*{item.projectName}*/}
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
                                            }} type="text" name="projectName" value={data.projectName} onChange={handleChange} />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label><b>Project Type </b></Form.Label>
                                            <Form.Select name="projectType" value={data.projectType} onChange={handleChange}>
                                                <option>Tech</option>
                                                <option>Marketing</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label> <b>Project Description </b></Form.Label>
                                            <br />
                                            <textarea style={{
                                                width:"100%"
                                            }} name="projectDescription" value={data.projectDescription} onChange={handleChange} />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label> <b>Investment Found </b></Form.Label>
                                            <Form.Control type="text" name="investment" value={data.investment} onChange={handleChange}  />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label> <b>Investment Needed </b></Form.Label>
                                            <Form.Control type="text" name="investmentNeeded" value={data.investmentNeeded} onChange={handleChange}  />
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
        </div>
    )
}