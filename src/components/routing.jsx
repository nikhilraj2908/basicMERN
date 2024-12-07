import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Dashboard } from "./dashboard"
import Registeruser from "./registeruser"
import { Loginuser } from "./loginuser"
import { Mainpage } from "./mainpage"
export function Routing(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard/>}></Route>
                    <Route path="/registeruser" element={<Registeruser/>}></Route>
                    <Route path="/loginuser" element={<Loginuser/>}></Route>
                    <Route path="/mainpage" element={<Mainpage/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}