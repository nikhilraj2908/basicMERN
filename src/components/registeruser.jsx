import { useState } from "react";
import axios from "axios"
function Registeruser(){
    const[userdata,setuserdata]=useState({username:"",password:"",email:""})
    function handlechange(e){
        let name=e.target.name;
        let value=e.target.value;
        setuserdata({...userdata,[name]:value})
    }
    async function frmsubmit(e){
        e.preventDefault();
      try{
        const response=await axios.post("http://127.0.0.1:9999/registeruser",userdata);
        console.log(response.data);
        if(response.status===201){
         alert("data saved in db")
        }
        setuserdata({ username: "", password: "", email: "" });
      }
      catch(err){
        if(err.response.status===400){
        alert("user already axists")

        }
      }
    }
    return(
        <>
            <form onSubmit={frmsubmit}>
                <input onChange={handlechange} value={userdata.username} type="text" name="username" placeholder="username"></input>
                <input onChange={handlechange} value={userdata.password} type="password" placeholder="passeord" name="password"></input>
                <input onChange={handlechange} value={userdata.email} type="email" placeholder="enter your mailid" name="email"></input>
                <button>submit</button>
            </form>
        </>
    )
}
export default Registeruser;