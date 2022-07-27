import AuthUser from "./AuthUser";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Register(){


    const navigate = useNavigate();
    const {http} = AuthUser();
    const [name,setName] = useState("");
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");


    const inputChange = (e) =>{

        if(e.target.name === 'name'){
            setName(e.target.value)
        }
        else if(e.target.name === "username"){
            setUserName(e.target.value);
        }
        else{
            setPassword(e.target.value)
        }
    }

    const submitForm=()=>{
        console.log("name ",name,"username",userName,"password ",password);

        const  data = {
            name : name,
            userName: userName,
            password : password
        }

        http.post("/api/user/save",data).then((res)=>{
            navigate('/login')

        })
    }
    return(

        <div className="container col-sm-3">
            <div className="mb-3 mt-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input type="text" className="form-control" name="name"
                       onChange={inputChange}
                />
            </div>

            <div className="mb-3 mt-3">
                <label htmlFor="username" className="form-label">UserName:</label>
                <input type="text" className="form-control"  name="username"
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