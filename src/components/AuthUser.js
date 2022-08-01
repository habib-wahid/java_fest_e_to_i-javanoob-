import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom"
export default function AuthUser(){

    const navigate = useNavigate();
    const [token,setToken] = useState();
    const [user,setUser] = useState();

    const getToken = ()=>{
        const tokenString = localStorage.getItem('token');
        const userToken= JSON.parse(tokenString);
        return userToken;
    }

    const getUser=()=>{
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        return user;
    }

    const saveUser = (user)=>{
        localStorage.setItem("user",JSON.stringify(user));
    }

    const saveToken = (token)=>{

        localStorage.setItem("token",JSON.stringify(token));
       // localStorage.setItem("user", JSON.stringify(user));

        setToken(token);
      //  setUser(user);
        navigate('/dashboard');
    }

    const logout=()=>{

        console.log("here we are ")
        localStorage.clear();
        navigate("/login");
    }

    const http = axios.create({
        baseURL:"http://localhost:8080",
        headers:{
            "Content-type":"application/json",
            "Authorization" : `Bearer ${getToken()}`
        }

    });

    return {
        setToken:saveToken,
        getToken,
        token,
        http,
        logout,
        saveUser,
        getUser
    };
}