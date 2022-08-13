import React from "react";
import AuthUser from "../components/AuthUser";
import InvestorSidebar from "./InvestorSidebar";

export default function InvestorMenu(){

    const {getUser} = AuthUser();
    const user = getUser();

    return(
        <div>
            <InvestorSidebar />
            <h4>
                Investor Profile
            </h4>

            <div>
                <b>Name </b> : {user.name} <br/>

            </div>
        </div>
    )
}