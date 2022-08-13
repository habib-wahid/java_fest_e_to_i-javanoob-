import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom"
export default function AuthUser(){

    const navigate = useNavigate();
    const [token,setToken] = useState();
    const [user,setUser] = useState();

    const getToken = ()=>{
        const tokenString = localStorage.getItem('token');

        if(tokenString === 'undefined'){
            console.log("token undefined")
            return false;
        }


        console.log("here wer are")
        if(tokenString !== undefined && tokenString !== null && tokenString !== '') {

            console.log("here we go ",tokenString)
            const userToken = JSON.parse(tokenString);
            return userToken;
        }
        return null;
    }

    const getUser=()=>{
        const userString = localStorage.getItem('user');
        if(typeof userString !== "undefined" && userString !== null && userString !== '') {
            const user = JSON.parse(userString);
            return user;
        }
        return null;
    }

    const saveUser = (user)=>{
        localStorage.setItem("user",JSON.stringify(user));
    }

    const saveToken = (token)=>{

        console.log("Token  ",token)
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

    const publicHttp = axios.create({
        baseURL:"http://localhost:8080",
        headers:{
            "Content-type":"application/json",
        }

    });

    const httpmultipart = axios.create({
        baseURL:"http://localhost:8080",
        headers:{
            "Content-type":"multipart/form-data",
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
        getUser,
        httpmultipart,
        publicHttp
    };
}