import React, {useEffect, useState} from 'react';
import AuthUser from "./AuthUser";
import {Button, Card, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import ModalComponent from "../common/Modal";

function Home() {

    const {publicHttp,getUser} = AuthUser();
    const [post,setPosts] = useState([]);
    const basePath = "http://localhost:8080";
    const user = getUser();
    const [show,setShow] = useState(false);
    const [selectedItem,setSelectedItem] = useState(null);

    useEffect(()=>{

        console.log("user ",user)
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

    const handleClick=(item)=>{
        console.log("Item ",item)
        setShow(true);
        setSelectedItem(item);
    }


    const getTime=(date)=>{

        if(date === null)
            return "45 minutes ago";

        const arr = date.split("T");
        return arr[1].substr(0,8);
    }

    const getDate=(date)=>{

        if(date === null)
            return "2022-08-14";
        const arr = date.split("T");
        return arr[0];
    }

  return (
    <div className="container">

        {
            show?
                <ModalComponent show={show} setShow={setShow} item={selectedItem} /> : null
        }


        {
            post.map((item)=>
                <div style={{
                    marginTop:"10px"
                }}>

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


                            {
                                user === null?
                                    null:
                                   <Button onClick={()=>handleClick(item)}
                                   style={{
                                   float:"right"
                                   }} variant="success">invest</Button>
                            }

                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Time {getTime(item.date)} </small>
                            <small style={{ float:"right"}} className="text-muted">Date {getDate(item.date)} </small>
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
