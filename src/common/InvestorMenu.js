import React, {useEffect, useState} from "react";
import AuthUser from "../components/AuthUser";
import InvestorSidebar from "./InvestorSidebar";
import {Card, ListGroup} from "react-bootstrap";

export default function InvestorMenu(){

    const {http,getUser} = AuthUser();
    const user = getUser();
    const [investor,setInvestor] = useState(null);

    useEffect(()=>{
        http.get('/user/get-investor', {params:{username : user.userName}}).then((res)=>{
            console.log("Data ",res.data)
            if(res.data.investor !== null){
                setInvestor(res.data.investor)
            }
        })
    })

    return(
        <div>
            <InvestorSidebar />
            <h4 style={{
                marginTop:"20px"
            }}>
                Investor Profile
            </h4>

            <div>
                <b>Name </b> : {user.name} <br/>

                {
                    investor == null?
                        null:
                        <div>
                            {/*<b> Contact : </b> {investor.number} <br />*/}
                            {/*<b> Interested In : </b> {investor.projectType} <br/>*/}
                            {/*<b> Address : </b> {investor.address} <br />*/}
                            {/*<b> Probable Investment amount : </b> {investor.investment} <br/>*/}


                            <Card style={{
                                width: '30rem',
                                marginTop:"20px"
                            }}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><b> Contact : </b> {investor.number} <br /></ListGroup.Item>
                                    <ListGroup.Item><b> Interested In : </b> {investor.projectType} <br/></ListGroup.Item>
                                    <ListGroup.Item><b> Address : </b> {investor.address} <br /></ListGroup.Item>
                                    <ListGroup.Item><b> Probable Investment amount : </b> {investor.investment} <br /></ListGroup.Item>
                                </ListGroup>
                            </Card>

                        </div>
                }

            </div>


        </div>
    )
}