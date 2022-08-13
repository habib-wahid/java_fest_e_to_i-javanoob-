import React from "react";
import {useParams} from "react-router-dom";
import {useState,useEffect} from "react";
import AuthUser from "../components/AuthUser";
import {Card, Col, ListGroup, Row} from "react-bootstrap";

export default function CompanyProfile(){

    let params = useParams();
    const {getUser,http} = AuthUser();
    const user = getUser();
    const [data,setData] = useState({});
    const [description,setDescription] = useState({});
    const basepath = "http://localhost:8080";
    const [checkDataIsPresent,setCheckDataIsPresent] = useState(false);

    useEffect(()=>{
        fetchUserDetails();
        console.log("User name ",user.userName);
    },[])


    const fetchUserDetails = ()=>{
        http.get('/api/getUser', {params:{username : user.userName}}).then((res)=>{
            console.log("Result " , res.data);

            setDescription(res.data.userDescription);

            if(res.data.useDescription !== null){
                setDescription(res.data.userDescription);
            }

            setData(res.data)


        })
    }

    return(
        <div className="container" style={{
            marginTop:"30px"
        }}>
            <h3>Company Profile </h3>
            <br />
            {
                description !== null?
                    <div>
                        <Row>
                            <Col sm={8}>
                                <div>
                                    <Card style={{ width: '30rem' }}>
                                        <img className="profile-image" variant="top" src={basepath + "/" + `${description.basePath}` + "/" + `${description.originalPath}`} />
                                        <Card.Body>
                                            <Card.Title>{description.company}</Card.Title>
                                            <Card.Text>
                                                {description.description}
                                            </Card.Text>
                                        </Card.Body>

                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item><b>Technology </b> {description.companyType}</ListGroup.Item>
                                        </ListGroup>
                                        <Card.Body>
                                            <Card.Link target="_blank" href={"http://" + `${description.website}`}>Website</Card.Link>
                                            <Card.Link href="#">Linked In</Card.Link>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                            <Col>

                                See ALl Posts

                            </Col>
                        </Row>


                    </div>
                    :
                    null
            }
        </div>
    )
}