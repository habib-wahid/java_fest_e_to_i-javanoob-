import AuthUser from "./AuthUser";
import {useEffect, useState} from "react";

export default function Dashboard(){

    const {getUser,http} = AuthUser();
    const user = getUser();
    const [data,setData] = useState();

    useEffect(()=>{
        fetchUserDetails();
    },[])

    const userName = {
        userName: "habib_wahid"
    }
    const fetchUserDetails = ()=>{
        http.get('/api/getUser').then((res)=>{
            console.log(res.data);
            setData(res.data)
        })
    }

    return(
        <div className="container">
            user dashboard


            {
                data?
                    <div>
                        <h3>{data.name}</h3>
                        <h3>{data.id}</h3>
                    </div>:null
            }
            {/*<div>*/}
            {/*    <h1>Name</h1>*/}
            {/*    {*/}
            {/*        user.name*/}
            {/*    }*/}
            {/*    <h1>Id</h1>*/}
            {/*    {*/}
            {/*        user.id*/}
            {/*    }*/}
            {/*    <h1>Username</h1>*/}
            {/*    {*/}
            {/*        user.userName*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    )

}