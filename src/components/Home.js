import React, {useEffect, useState} from 'react';
import AuthUser from "./AuthUser";
import {Card, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

function Home() {

    const {publicHttp} = AuthUser();
    const [post,setPosts] = useState([]);
    const basePath = "http://localhost:8080";

    useEffect(()=>{
        publicHttp.get('/post/all-posts', ).then((res)=>{
            const [data] = res.data;
            console.log("Data ",res.data)
            //
            // setUserPosts(res.data)
            // // data.forEach((item)=>{
            // //     setUserPosts(prevState => [...prevState,item])
            // //     }
            // // )
            //
            // setCheck(true);

            setPosts(res.data);


        })
    },[])

  return (
    <div className="container">



        {
            post.map((item)=>
                <div>

                    <Card style={{
                        marginLeft:"20%",
                        width:"50%"
                    }}>

                        <h4><img className="home-page-banners" src={ basePath + "/" + `${item.rootPath}` + "/" + `${item.bannerPath}`} /> <Link to={`/company-profile/${item.companyName}`}>{item.companyName} </Link>is looking for investment</h4>
                        <Card.Img variant="top" src={ basePath + "/" + `${item.rootPath}` + "/" + `${item.bannerPath}`} />
                        <Card.Body>
                            <Card.Title>{item.projectName}</Card.Title>
                            <Card.Text>
                                {item.description}
                            </Card.Text>

                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label><b> Investment Found </b></Form.Label> <br />
                                    <input style={{
                                        width:"50%"
                                    }} type="text" value={item.investmentfound} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label><b> Investment Needed </b></Form.Label> <br />
                                    <input style={{
                                        width:"50%"
                                    }} type="text" value={item.investmentneeded} />
                                </Form.Group>

                            </Form>

                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>

                    <br />
                </div>
            )
        }
    </div>
  )
}

export default Home
