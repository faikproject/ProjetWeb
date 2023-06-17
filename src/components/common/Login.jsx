import React, { useEffect, useState } from "react"
import '../../styles/Login.css'
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"


function Login() {
 
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    
    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:3000/login",{
                email,password
            })
            

        }
        catch(e){
            console.log(e);

        }

    }
    
  return (
    <div className="login">

            <form action="POST">
                <h1>Sign in</h1> 
                <div class="form-group">
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                </div>
                <div class="form-group">
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
                </div> 
                <div class="form-group">
                <button id="submit" onClick={submit} class="ng-binding">Login</button>
                </div>   
                
                <div class="form-group link--center">
                      <Link to="/signup">New user? Create an Account</Link>
                  </div>

            </form>
        </div>
  )
}

export default Login