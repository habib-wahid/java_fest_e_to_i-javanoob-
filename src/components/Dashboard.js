import AuthUser from "./AuthUser";
import {Dropdown, Button, ButtonGroup, Row, Col, Stack, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import '../account/account.css';
import './component.css'
export default function Dashboard(){

    const {getUser,http} = AuthUser();
    const user = getUser();
    const [data,setData] = useState();
    const [description,setDescription] = useState();
    const basepath = "http://localhost:8080";
    const [checkDataIsPresent,setCheckDataIsPresent] = useState(false);

    useEffect(()=>{
        fetchUserDetails();
        console.log("User name ",user.userName);
    },[])


    const fetchUserDetails = ()=>{
        http.get('/api/getUser', {params:{username : user.userName}}).then((res)=>{
            console.log(res.data);
            setDescription(res.data.userDescription);
            setData(res.data)
            console.log(res.data.userDescription.basePath+ res.data.userDescription.logo)

            setCheckDataIsPresent(true);

        })
    }

    return(
        <div className="container">

            {
                checkDataIsPresent ?
                    <div>
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
                            <h3>Compnay Profile</h3>

                            <img className="profile-image" src={basepath + "/" + `${description.basePath}` + "/" + `${description.logo}`} />
                            {
                                data?
                                    <div className="company-description">
                                        <h3 className="description"> Name : {data.name}</h3>
                                        <h3 className="description"> Company Type : {description.type}</h3>
                                        <h4 className="description"> Total Funding Found : {description.investment}</h4>
                                        <h4 className="description"> Total Fund Required : {description.requiredInvestment}</h4>
                                        <h4 > About Company</h4>

                                        <textarea >
                                            {description.description}
                                        </textarea>
                                    </div>:null
                            }


                            {/*<img src="http:localhost:8080/ `${description.basePath}` description.logo}`" />*/}


                        </div>

                    </div> :
                    <div>
                        <Spinner animation="grow" variant="primary" />
                        <Spinner animation="grow" variant="secondary" />
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="danger" />
                        <Spinner animation="grow" variant="warning" />
                        <Spinner animation="grow" variant="info" />
                        <Spinner animation="grow" variant="light" />
                        <Spinner animation="grow" variant="dark" />
                    </div>
            }

        </div>
    )

}