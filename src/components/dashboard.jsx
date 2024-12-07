import { useNavigate } from "react-router-dom"

export function Dashboard(){
    const navigate=useNavigate();
    function registerclicked(){
        navigate("/registeruser")
    }
    function loginuser(){
        navigate("/loginuser")
    }
    return(
        <>
            <button onClick={registerclicked}>register user</button>
            <button onClick={loginuser}> login user</button>
        </>
    )
}