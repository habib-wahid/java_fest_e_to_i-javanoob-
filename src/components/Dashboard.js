import AuthUser from "./AuthUser";
import {Dropdown, Button, ButtonGroup, Row, Col, Stack, Spinner, Card, ListGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import '../account/account.css';
import './component.css';
import SideMenu from "../common/SideMenu";
import InvestorMenu from "../common/InvestorMenu";

export default function Dashboard(){

    const {getUser,http} = AuthUser();
    const user = getUser();
    const [data,setData] = useState({});
    const [description,setDescription] = useState({});
    const basepath = "http://localhost:8080";
    const [checkDataIsPresent,setCheckDataIsPresent] = useState(false);
    const [role,setRole] = useState(user.roles[0]);

    useEffect(()=>{
        fetchUserDetails();
        console.log("User name ",user.roles[0]);
    },[])


    const fetchUserDetails = ()=>{
        http.get('/api/getUser', {params:{username : user.userName}}).then((res)=>{
            console.log("Result " , res.data);

           setDescription(res.data.userDescription);

            if(res.data.useDescription !== null){
                setDescription(res.data.userDescription);
            }

            setData(res.data)
            console.log(res.data.userDescription.basePath+ res.data.userDescription.logo)

            setCheckDataIsPresent(true);

        })
    }

    return(
        <div className="container">

            {
                role.roleName === "investor" ?
                <InvestorMenu /> :
                    <div>

                        <SideMenu />
                        <div style={{
                            marginTop:"10px",
                        }}>
                            <h3>Compnay Profile</h3>

                            {
                                description !== null?
                                    <div>

                                        <img className="profile-image" src={basepath + "/" + `${description.basePath}` + "/" + `${description.originalPath}`} />

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
                                                    <Card.Link href={description.website}>Website</Card.Link>
                                                    <Card.Link href="#">Linked In</Card.Link>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>
                                    :
                                    null
                            }

                            {
                                // data?
                                //     <div className="company-description">
                                //         <h3 className="description"> Name : {data.name}</h3>
                                //
                                //         {
                                //             description !== null?
                                //                 <div>
                                //
                                //                 <h3 className="description"> Company Type : {description.type}</h3>
                                //                 <h4 className="description"> Total Funding Found : {description.investment}</h4>
                                //             <h4 className="description"> Total Fund Required : {description.requiredInvestment}</h4>
                                //             <h4 > About Company</h4>
                                //
                                //             <textarea >
                                //         {description.description}
                                //             </textarea> </div>: null
                                //         }
                                //
                                //     </div>:null
                            }


                            {/*<img src="http:localhost:8080/ `${description.basePath}` description.logo}`" />*/}


                        </div>

                    </div>

            }




        </div>
    )

}