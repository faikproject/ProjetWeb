import React,{ useContext, useEffect, useState }  from 'react'
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"

//STYLES
import '../../styles/Login.css';
//LIBS
import _ from 'lodash';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { passwordStrength } from 'check-password-strength';
//FORMS
import schema from "./yup/signup";

import Alert from '../Alert';

import UseAuth from '../../hooks/useAuth';
import { AuthContext } from '../../context/authContext';
//CONTEXTS

function Signup() {
    //CONTEXTS
    const [authState] = useContext(AuthContext);

    const {
        isSubmitted,
        isForgotSubmitted,
        isSignupSubmitted,
        hasError,
        login,
        forgotPassword,
        signUp,
        // reload,
    } = UseAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        // setValue,
        getValues,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [strongPwd, setStrongPwd] = useState(null);

    function onSubmitSignUp(data) {
        if (strongPwd?.allowed === true) signUp(data);
    }

    useEffect(() => {
        const sPwd = getValues('password');
        const strength = passwordStrength(sPwd);
        // setStrongPwdContains(strength.contains);
        // setStrongPwdLength(strength.length);

        switch (strength.value) {
            default:
                setStrongPwd(null);
                break;
            case 'Too weak':
                setStrongPwd({
                    class: 'bg-red w-1/4',
                    contains: strength.contains,
                    length: strength.length,
                    allowed: false,
                });
                break;
            case 'Weak':
                setStrongPwd({
                    class: 'bg-warning-500 w-2/4',
                    contains: strength.contains,
                    length: strength.length,
                    allowed: false,
                });
                break;
            case 'Medium':
                setStrongPwd({
                    class: 'bg-warning-500 w-3/4',
                    contains: strength.contains,
                    length: strength.length,
                    allowed: false,
                });
                break;
            case 'Strong':
                setStrongPwd({
                    class: 'bg-success-500 w-full',
                    contains: strength.contains,
                    length: strength.length,
                    allowed: true,
                });
                break;
        }
        if (strength.length <= 0) setStrongPwd(null);
        //eslint-disable-next-line
    }, [watch('password')]);

    return (
        <div className="login" autoComplete="off">
            {isSignupSubmitted && authState.isLogged && <Alert type="success" message="Vous avez créé un compte !" />}
            {hasError && isSignupSubmitted && !authState.isLogged && <Alert type="danger" message="Un compte existe déjà avec cette adresse email" />} 
            
            {authState.isLogged && <div>Vous êtes connectés !</div>}
            <form onSubmit={handleSubmit(onSubmitSignUp)}>
                <h1>Create an Account</h1> 
                <div className="relative form-group">
                    <input className="input" placeholder="Email" type="email" name="email" {...register('email')} />
                    {errors && errors['email'] && <span className={`mt-0 text-sm text-danger-400`}>{errors['email'].message}</span>}
                </div>
                <div className="relative form-group">
                    <input className="input" placeholder="Pseudo" type="text" name="pseudo" {...register('pseudo')} />
                    {errors && errors['pseudo'] && <span className={`mt-0 text-sm text-danger-400`}>{errors['pseudo'].message}</span>}
                </div>
                <div className="relative form-group">
                    <input
                        className=""
                        placeholder="Password"
                        type="password"
                        name="password"
                        {...register('password')}
                        autoComplete="off"
                    />
                    <div className={`${strongPwd?.class} h-[2px] block absolute bottom-0`}></div>
                    {errors && errors['password'] && <span className={`w-full mt-0 text-sm text-danger-400`}>{errors['password'].message}</span>}
                    {strongPwd && (
                    <div className="text-xs text-graySkills flex flex-col mt-4 mb-6">
                        <span className={`${strongPwd.length >= 12 ? 'text-success-500' : ''}`}>12 caractères minimum</span>
                        <span className={`${_.includes(strongPwd.contains, 'uppercase') ? 'text-success-500' : ''}`}>1 majuscule</span>
                        <span className={`${_.includes(strongPwd.contains, 'number') ? 'text-success-500' : ''}`}>1 chiffre</span>
                         <span className={`${_.includes(strongPwd.contains, 'symbol') ? 'text-success-500' : ''}`}>1 caractère spécial</span>
                    </div>
                )}
                </div>
                
                <div className="relative form-group">
                    <input
                        className="input"
                        placeholder="Retype Password"
                        type="password"
                        name="confirm"
                        {...register('confirm')}
                    />
                    {errors && errors['confirm'] && (
                        <span className={`mt-0 text-sm text-danger-400`}>
                            {errors['confirm'].message}
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <button type="submit" id="submit" className="">Register</button>
                </div>  
                <div className="form-group link--center">
                    <Link to="/login">Already a user? Sign in</Link>
                </div> 
            </form>
        </div>
    )
}

export default Signup;