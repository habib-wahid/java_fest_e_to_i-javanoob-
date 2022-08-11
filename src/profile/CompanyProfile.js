import React from "react";
import {useParams} from "react-router-dom";

export default function CompanyProfile(){

    let params = useParams();


    return(
        <div className="container" style={{
            marginTop:"300px"
        }}>
            Comapany : {params.name}
            <br />
            another compnay profile
        </div>
    )
}