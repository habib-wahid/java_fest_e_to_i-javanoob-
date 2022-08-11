import React, {useEffect, useState} from "react";
import AuthUser from "../components/AuthUser";
import {Button, Card} from "react-bootstrap";

export default function UserPosts(){


    const [userPosts,setUserPosts] = useState([]);
    const {http,getUser} = AuthUser();
    const user = getUser();
    const [check,setCheck] = useState(false);

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
    return(
        <div className="container">
            User Posts
            {
                userPosts.map((item)=>
                <div>
                    <Card style={{
                        marginLeft:"20%",
                        width:"50%"
                    }}>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                            <Card.Title>{item.projectName}</Card.Title>
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
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
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
    )
}