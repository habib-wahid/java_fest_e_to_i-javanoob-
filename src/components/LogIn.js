import {useState} from "react";
import AuthUser from "./AuthUser";

export default function LogIn(){

    const {http,setToken,saveUser} = AuthUser();
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();

    const inputChange = (e) =>{

        if(e.target.name === 'username'){
            setUsername(e.target.value)
        }else{
            setPassword(e.target.value)
        }
    }

    const submitForm=()=>{

        const data = new FormData();
        data.append("userName",username);
        data.append("password",password);

        http.post("/login",data).then((res)=>{
            console.log(res.data);

            console.log("Access token ",res.data.access_token);
            console.log("Username ", res.data.username);

            setToken(res.data.access_token);
            saveUser(res.data.username);
        })
    }
    return(

        <div className="container col-sm-3">
            <div className="mb-3 mt-3">
                <label className="form-label">Username:</label>
                <input type="email" className="form-control" name="username"
                onChange={inputChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Password:</label>
                <input type="password" className="form-control" name="password"
                onChange={inputChange}
                />
            </div>

            <button type="submit" className="btn btn-primary" onClick={submitForm}>Submit</button>


        </div>
    )
}
