import React from 'react'
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"


function Signup() {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    
    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:3000/signup",{
                email,password
            })
            

        }
        catch(e){
            console.log(e);

        }

    }
  return (
    <div className="signup">

            <form action="POST">
                <h1>Create an Account</h1> 
                <div class="form-group">
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                </div>
                <div class="form-group">
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
                </div>
                <div class="form-group">
                    <input type="password-confirm"  placeholder="Retype Password"  />
                </div>
                <div class="form-group">
                <button id="submit" onClick={submit}>Register</button>
                </div>   
                <div class="form-group link--center">
                <Link to="/login">Already a user? Sign in</Link>
                  </div>


            </form>
        </div>
  )
}

export default Signup