import {  useState } from "react"
import { Link} from "react-router-dom"

//STYLES
import '../../styles/Login.css'
//HOOKS
import UseAuth from "../../hooks/useAuth";

function Login() {

    const {
        login,
    } = UseAuth();

    const [inputsConnexion, setInputsConnexion] = useState({
        email: '',
        password: '',
    });

    function onSubmit(e) {
        e?.preventDefault();
        console.log(inputsConnexion)
        login(inputsConnexion)
    }

    function handleChangeFormConnexion(e) {
        setInputsConnexion({
            ...inputsConnexion,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div className="login">
            <form onSubmit={onSubmit} className="">
                <h1>Sign in</h1> 
                <div className="form-group">
                    <input
                        type="email"
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
                    <button type="submit" id="submit" className="ng-binding">Login</button>
                </div> 
                <div className="form-group link--center">
                    <Link to="/signup">New user? Create an Account</Link>
                </div>  
            </form>
        </div>
        
    )
}

export default Login;