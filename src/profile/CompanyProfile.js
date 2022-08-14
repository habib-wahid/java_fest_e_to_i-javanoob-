import React from "react";
import {useParams} from "react-router-dom";
import {useState,useEffect} from "react";
import AuthUser from "../components/AuthUser";
import {Button, Card, Col, ListGroup, Row} from "react-bootstrap";

export default function CompanyProfile(){

    let params = useParams();
    const {getUser,http,publicHttp} = AuthUser();
    const user = getUser();
    const [data,setData] = useState({});
    const [description,setDescription] = useState({});
    const basepath = "http://localhost:8080";
    const [checkDataIsPresent,setCheckDataIsPresent] = useState(false);
    const [posts,setPosts] = useState();
    const [postState,setPostState] = useState(false);
    const basePath = "http://localhost:8080"

    useEffect(()=>{
        fetchUserDetails();
        console.log("User name ",params.name);
    },[])


    const fetchUserDetails = ()=>{
        http.get('/api/getCompany', {params:{username : params.name}}).then((res)=>{
            console.log("Result " , res.data);

            setDescription(res.data.userDescription);
            setPosts(res.data.userPosts);

            if(res.data.useDescription !== null){
                setDescription(res.data.userDescription);
            }

            setData(res.data)


        })
    }

    const showPosts=()=>{
        setPostState(!postState);
    }

    return(
        <div className="container" style={{
            marginTop:"30px"
        }}>

            {
                postState ?
                    <div>
                        User Posts
                        <Row>
                            <Col sm={10}>
                                {
                                    posts.map((item)=>
                                        <div key={item.id}>
                                            <Card style={{
                                                marginLeft:"20%",
                                                width:"50%"
                                            }}>
                                                <Card.Img variant="top" src={ basePath + "/" + `${item.rootPath}` + "/" + `${item.bannerPath}`} />
                                                <Card.Body>
                                                    <Card.Title>{item.projectName}</Card.Title>

                                                    <img className="post-image" src={ basePath + "/" + `${item.rootPath}` + "/" + `${item.bannerPath}`} />
                                                    <Card.Text>
                                                        {item.description}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <h5>Investment Found :  {item.investmentfound} </h5>
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <h5>Investment Needed :  {item.investmentneeded} </h5>
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <small className="text-muted">Post updated at </small>
                                                </Card.Footer>

                                            </Card>

                                            <br />

                                            <div style={{
                                                marginLeft:"20%",
                                                width:"50%"
                                            }}>
                                            </div>


                                            <br />



                                        </div>
                                    )
                                }
                            </Col>
                            <Col>
                                <button onClick={showPosts} style={{
                                    borderRadius:"5px",
                                    color:"green"
                                }}>
                                    See DasBoard
                                </button>
                            </Col>
                        </Row>

                    </div> :
                    <div>
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
                                            <button onClick={showPosts} style={{
                                                borderRadius:"5px",
                                                color:"green"
                                            }}>
                                                See ALL Posts
                                            </button>

                                        </Col>
                                    </Row>


                                </div>
                                :
                                null
                        }
                    </div>
            }

        </div>
    )
}