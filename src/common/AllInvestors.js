import React, {useEffect, useState} from "react";
import AuthUser from "../components/AuthUser";
import {Table} from "react-bootstrap";

export default function AllInvestors(){

    const {http} = AuthUser();
    const [investorList,setInvestorList] = useState([]);

    useEffect(()=>{

        http.get('/user/all-investor', ).then((res)=>{
            setInvestorList(res.data);
        })
    },[])

    return(
        <div className="container">

            <h4>All Investors</h4>

            <div style={
                {
                    marginTop:"30px"
                }
            }>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Investor Name</th>
                        <th>Contact Info </th>
                        <th>Investment Field</th>
                        <th>Address</th>
                        <th>Available Investment</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        investorList.map((item)=>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.number}</td>
                                <td>{item.projectType}</td>
                                <td>{item.address}</td>
                                <td>{item.investment}</td>
                            </tr>
                        )
                    }

                    </tbody>
                </Table>

            </div>
        </div>
    )
}