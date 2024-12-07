import axios from "axios";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function Mainpage() {
    const [student, setstudent] = useState({ studentname: "",rollNo:0, hindi: 0, english: 0, science: 0 });
    const [allstudent, setallstudent] = useState([]);
    const navigate=useNavigate()
    const[cookies,setcookie,removecookie]=useCookies(["username"]);
    async function getstudent() {
        const response = await axios.get('http://localhost:9999/getstudent')
        setallstudent(response.data);
    }
    useEffect(() => {
        getstudent();
    }, [student])
    function handlechange(e) {
        let { name, value } = e.target;
        setstudent({ ...student, [name]: value });
    }
    async function handlesubmit(e) {
        e.preventDefault();
        try {
            if(student.isEditing){
                const response=await axios.patch(`http://localhost:9999/updatestudentdetails/${student.rollNo}`,student);
                if(response.status===200){
                    setstudent(response.data);
                setstudent({ studentname: "",rollNo:0, hindi: 0, english: 0, science: 0 });

                }

            }else{
                const response = await axios.post("http://127.0.0.1:9999/addstudent", student);
            if (response.status === 201) {
                alert("student data saved to database");
            }
            setstudent({ studentname: "",rollNo:0, hindi: 0, english: 0, science: 0 });
       
            }
            
        }
        catch (err) {
            console.log(err);
        }
    }
   async function deleteclick(rollNo){
        const response=await axios.delete(`http://localhost:9999/deletestudent/${rollNo}`);
        if(response.status===200){
            alert("student deleted");
            getstudent();
        }
    }
    async function editbtnclick(rollNo){
        try{
            const selectedStudent = allstudent.find((stu) => stu.rollNo === rollNo);
            if (selectedStudent) {
                setstudent({ ...selectedStudent,isEditing:true}); 
            }
        }
        catch(err){
            
        }
    }
    function logoutbtn(){
        removecookie("username");
        navigate("/");
    }
    return (
        <>
            <button onClick={logoutbtn}>logout</button>
            <form onSubmit={handlesubmit}>
                <input onChange={handlechange} type="text" disabled={student.isEditing} value={student.studentname} placeholder="student name" name="studentname"></input>
                <input onChange={handlechange} type="number" disabled={student.isEditing} value={student.rollNo?student.rollNo:""} placeholder="student rollnumber" name="rollNo"></input>
                <input onChange={handlechange} type="number"  value={student.hindi?student.hindi:""} placeholder="hindi marks" name="hindi"></input>
                <input onChange={handlechange} type="number"  value={student.english?student.english:""} placeholder="english marks" name="english"></input>
                <input onChange={handlechange} type="number"  value={student.science?student.science:""} placeholder="science marks" name="science"></input>
                <button>{student.isEditing?"edit":"add student"}</button>
            </form>
            <table style={{border:"1px solid black"}}>
                <thead >
                    <tr style={{width:"100%"}}>
                        <th style={{border:"1px solid black"}}>name</th>
                        <th style={{border:"1px solid black"}}>roll No</th>
                        <th style={{border:"1px solid black"}}>hindi</th>
                        <th style={{border:"1px solid black"}}>english</th>
                        <th style={{border:"1px solid black"}}>science</th>
                        <th style={{border:"1px solid black"}}>total</th>
                        <th style={{border:"1px solid black"}}>delete</th>
                        <th style={{border:"1px solid black"}}>edit</th>
                    </tr>
                </thead>
                <tbody >
                        {
                            allstudent.map((student, index) =>
                                <tr  key={index}>
                                    <td style={{border:"1px solid black"}}>{student.studentname}</td>
                                    <td style={{border:"1px solid black"}}>{student.rollNo}</td>
                                    <td style={{border:"1px solid black"}}>{student.hindi}</td>
                                    <td style={{border:"1px solid black"}}>{student.english}</td>
                                    <td style={{border:"1px solid black"}}>{student.science}</td>
                                    <td style={{border:"1px solid black"}}>{student.hindi+student.english+student.science}</td>
                                    <td style={{border:"1px solid black"}}>
                                        <button onClick={()=>deleteclick(student.rollNo)} style={{backgroundColor:"red"}}>delete</button>
                                    </td>
                                    <td style={{border:"1px solid black"}}>
                                        <button  style={{backgroundColor:"yellow"}} onClick={()=>editbtnclick(student.rollNo)}>edit</button>
                                    </td>
                                </tr>
                            )
                        }
                </tbody>
            </table>
        </>
    )
}