import React, {useEffect, useState} from "react";
import AuthUser from "../components/AuthUser";
import {Button, Card} from "react-bootstrap";
import SideMenu from "../common/SideMenu";
import EditPost from "./EditPost";

export default function UserPosts(){


    const [userPosts,setUserPosts] = useState([]);
    const {http,getUser} = AuthUser();
    const user = getUser();
    const [check,setCheck] = useState(false);
    const basePath = "http://localhost:8080";
    const [editItem,setEditItem] = useState({});
    const [editClick,setEditClick] = useState(false);

    useEffect(()=>{

        http.get('/post/user-posts', {params:{username : user.userName}}).then((res)=>{
            const [data] = res.data;
            console.log("Data ",data)

            setUserPosts(res.data)
            // data.forEach((item)=>{
            //     setUserPosts(prevState => [...prevState,item])
            //     }
            // )

            setCheck(true);

        })
    },[])


    const dateConversion=(dateTime)=>{
        if(dateTime === null){
            return 45;
        }
        const time = dateTime.split("T");
        return time[0];
    }

    const timeConversion=(dateTime)=>{
        if(dateTime === null){
            return 45;
        }
        const time = dateTime.split("T");
        return time[1];
    }


    const onEditClick=(item)=>{

        console.log("Item ", item)
        setEditItem(item);
        setEditClick(true)
    }

    return(
        <div>
            {
                editClick ?
                    <EditPost item={editItem} setEditClick={setEditClick} /> :
                    <div>
                        <div className="container">

                            <SideMenu />
                            User Posts
                            {
                                userPosts.map((item)=>
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
                                            <Button variant="success" onClick={()=>{onEditClick(item)}} >Edit</Button> {" "} <Button variant="danger">Delete</Button>
                                        </div>


                                        <br />



                                    </div>
                                )
                            }

                            {
                                check ?
                                    <div>hello</div>:
                                    null
                            }

                        </div>
                    </div>
            }
        </div>
    )
}