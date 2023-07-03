import { useCallback, useContext, useEffect, useState } from "react"
import {useNavigate, Link} from "react-router-dom"

//STYLES
import './forms.css';

//CONTEXTS


function Login() {

    const [inputsConnexion, setInputsConnexion] = useState({
        email: '',
        pseudo: '',
        password: '',
        confirm: '',
    });

    function handleChangeFormConnexion(e) {
        setInputsConnexion({
            ...inputsConnexion,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div className="form">
            <form>
                <h1>Sign in</h1> 
                <div className="form-group">
                    <input
                        type="text"
                        name="email"
                        value={inputsConnexion.email}
                        onChange={handleChangeFormConnexion}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        value={inputsConnexion.password}
                        onChange={handleChangeFormConnexion}
                        placeholder="Password"
                        required
                    />
                </div> 
                <div className="form-group">
                    <button id="submit" className="ng-binding">Login</button>
                </div>   
            </form>
            <div className="form-group link--center">
                <Link to="/signup">New user? Create an Account</Link>
            </div>
        </div>
        
    )
}

export default Login;