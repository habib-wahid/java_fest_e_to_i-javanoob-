import AuthUser from "./AuthUser";
import {Dropdown, Button, ButtonGroup, Row, Col, Stack} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import '../account/account.css';

export default function Dashboard(){

    const {getUser,http} = AuthUser();
    const user = getUser();
    const [data,setData] = useState();

    useEffect(()=>{
        fetchUserDetails();
        console.log("User name ",user.userName);
    },[])


    const fetchUserDetails = ()=>{
        http.get('/api/getUser', {params:{username : user.userName}}).then((res)=>{
            console.log(res.data);
            setData(res.data)
        })
    }

    return(
        <div className="container">

            <Stack style={{
                marginTop:"10px",
                float:"right",
            }} direction="horizontal" gap={3}>
                <div>
                    <Dropdown as={ButtonGroup}>
                        <Button variant="success">Setting</Button>

                        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Link className="link-style" to="/account">
                                    Account
                                </Link>
                            </Dropdown.Item>

                            <Dropdown.Item>
                                <Link className="link-style" to="/posts">
                                    Posts
                                </Link>
                            </Dropdown.Item>

                            <Dropdown.Item>
                                <Link className="link-style" to="#">
                                    Sign-Out
                                </Link>
                            </Dropdown.Item>


                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Stack>

            <div style={{
                marginTop:"10px",
            }}>
                user dashboard

                {
                    data?
                        <div>
                            <h3>{data.name}</h3>
                            <h3>{data.id}</h3>
                        </div>:null
                }


            </div>

        </div>
    )

}