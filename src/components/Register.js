import axios from "axios";
import { useState } from "react";
import { WEB_URL } from "../lib/CONSTANTS";


const Register= () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [firstname, setFirstname] = useState('')



const handleSubmit=async (event) => {
    const body = {
        email_uid: email.uid,
        firstname_uid: firstname.uid,
        
        body: password,
      };
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
// take in the event event.preventDefault() send axios .post request to ur flask need a body and headers
event.preventDefault()
const res = await axios.post(WEB_URL + "/login", body, {headers:{"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}});

console.log(email,password,firstname)};

const handleChangeEmail=(event) => {
setEmail(event.target.value)}
const handleChangePassword=(event) => {
setPassword(event.target.value)}
const handleChangefirstname =(event) => {
setFirstname(event.target.value)

};

return <form onSubmit={handleSubmit}>
  
  <input type='firstname' placeholder='First Name' onChange={handleChangefirstname}/> 
  <input type='email' placeholder='Email' onChange={handleChangeEmail}/>
  <input type='password' placeholder='Password' onChange={handleChangePassword}/> 
  


    <button>Register</button>
</form>
}

export default Register;