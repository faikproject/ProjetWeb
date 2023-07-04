import { useState, useContext, useEffect } from 'react';

//API
import API from '../api/axios.config';

//LIBS
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';

//CONTEXTS
import { AuthContext } from '../context/authContext';
import { SocketContext } from '../context/socketContext';

function UseAuth() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSignupSubmitted, setIsSignupSubmitted] = useState(false);
    const [hasError, setHasError] = useState(false);
    //CONTEXTS
    const [authState, setAuthState, refresh] = useContext(AuthContext);
    const socket = useContext(SocketContext);
    //HOOKS
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentTime = moment();
        const timeSession = moment(localStorage.getItem('timeSession'));
        // console.log(currentTime.format('YYYY-MM-DD HH:mm'), timeSession.format('YYYY-MM-DD HH:mm'));
        if (localStorage.getItem('user') && (currentTime.isAfter(timeSession, 'minute') || !localStorage.getItem('timeSession'))) {
            logout();
        }
        //eslint-disable-next-line
    }, []);

    const login = async (inputsConnexion) => {
        try {
            var mailformat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z ]{2,4}$/i;
            if (!inputsConnexion.email.match(mailformat)) {
                setHasError(true);
                setIsSubmitted(false);
                return false;
            } else setHasError(false);
           
            const response = await API.post('users/login', {
                email: inputsConnexion.email,
                password: inputsConnexion.password,
            });
            if (response.status === 200) setConnexion(response);
        } catch (err) {
            setIsSubmitted(true);
            setHasError(true);
        }
    };

    const setConnexion = (response) => {
        if (response.data.error) {
            setIsSubmitted(true);
        } else {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('timeSession', moment().add(15, 'days'));
            }
            setIsSubmitted(true);
            setHasError(false);
            refresh();
            navigate('/')
        }
    };

    const signUp = async (inputsConnexion) => {
        try {
            const response = await API.post('users/signup', {
                email: inputsConnexion.email,
                pseudo: inputsConnexion.pseudo,
                password: inputsConnexion.password,
                confirm: inputsConnexion.confirm,
            });
            if (response.status === 201) {
                setIsSignupSubmitted(true);
                setTimeout(() => {
                    login(inputsConnexion);
                }, 1000);
                return true;
            }
        } catch (err) {
            setHasError(true);
            setIsSignupSubmitted(true);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('timeSession');

        setAuthState({
            ...authState,
            me: null,
            isLogged: false,
        });

        socket.send('userLogout', { id: authState?.me?.id });
        socket.off('userConnect');

        refresh();
        reload();
    };

    const reload = () => {
        navigate(location.pathname + location.search);
    };

    return {
        isSubmitted,
        isSignupSubmitted,
        hasError,
        logout,
        login,
        signUp,
        reload,
    };
}

export default UseAuth;