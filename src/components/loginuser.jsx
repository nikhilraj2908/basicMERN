import axios from "axios";
import { useState } from "react"
// import {useCookie} from "react-cookie";
import { useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom";

export function Loginuser(){
    const[data,setdata]=useState({username:"",password:""});
    const[cookies,setcookie,removecookie]=useCookies(["username"])
    const navigate=useNavigate();
    function handlechange(e){
        let name=e.target.name;
        let value=e.target.value;
        setdata({...data,[name]:value})
    }
    async function handlesubmit(e){
        e.preventDefault();
        try{
            const response=await axios.post('http://localhost:9999/loginuser',data)
            if(response.status===201){
                alert("login succefully");
                setcookie('username',data.username);
                navigate("/mainpage")
            }
        }
        catch(err){
            alert(err);
        }
    }
    return(
        <>
           <form onSubmit={handlesubmit}>
           <input onChange={handlechange} type="text" placeholder="enter username" name="username"></input>
            <input onChange={handlechange}  type="password" placeholder="password" name="password"></input>
            <button>Login</button>
           </form>
        </>
    )
}