import {useState} from "react";
import AuthUser from "./AuthUser";

export default function LogIn(){

    const {http,setToken,saveUser} = AuthUser();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const inputChange = (e) =>{

        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }else{
            setPassword(e.target.value)
        }
    }

    const submitForm=()=>{
        console.log("email ",email,"password ",password)

        const data = new FormData();
        data.append("userName","habib_wahid");
        data.append("password","123");

        http.post("/login",data).then((res)=>{
            console.log(res.data);
            setToken(res.data.access_token);
            saveUser(res.data.username);
        })
    }
    return(

        <div className="container col-sm-3">
            <div className="mb-3 mt-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Enter email" name="email"
                onChange={inputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="pwd" className="form-label">Password:</label>
                <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="password"
                onChange={inputChange}
                />
            </div>

            <button type="submit" className="btn btn-primary" onClick={submitForm}>Submit</button>


        </div>
    )
}
