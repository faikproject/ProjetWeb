import React, { useState, useEffect, createContext, useCallback, useContext } from 'react';
//API
import { useQuery } from 'react-query';
import { getMe } from '../api/users';
//LIBS
import moment from 'moment';
//CONTEXTS
import { SocketContext } from '../context/socketContext';

const AuthContext = createContext();

const AuthProvider = (props) => {
    moment.suppressDeprecationWarnings = true;

    const socket = useContext(SocketContext);

    const isLogged = () => {
        const userStr = localStorage.getItem('user');
        return userStr ? true : false;
    };
    const [authState, setAuthState] = useState({
        me: null,
        isLogged: isLogged(),
    });
    const me = useQuery('me', getMe, {
        enabled: window.location.pathname.includes('dashboard/profil') ? false : isLogged(),
        staleTime: 1_000,
    });

    const setMe = useCallback(() => {
        if (me.isSuccess && me.data) {
            const currentTime = moment();
            const timeSession = moment(localStorage.getItem('timeSession'));
            // console.log(currentTime.format('YYYY-MM-DD HH:mm'), timeSession.format('YYYY-MM-DD HH:mm'));

            if (isLogged() && currentTime.isBefore(timeSession, 'minute')) {
                socket.send('userConnect', { id: me.data.id });

                setAuthState({
                    me: me.data,
                    isLogged: isLogged(),
                });
            } else {
                localStorage.removeItem('user');
                localStorage.removeItem('timeSession');
                setAuthState({
                    me: null,
                    isLogged: false,
                });
            }
        }
        // eslint-disable-next-line
    }, [me.isSuccess, me.isRefetching, me.data]);

    const refresh = () => {
        me.refetch();

        return authState;
    };

    useEffect(() => {
        setMe();
        //eslint-disable-next-line
    }, [setMe]);

    return <AuthContext.Provider value={[authState, setAuthState, refresh]}>{props.children}</AuthContext.Provider>;
};
export { AuthContext, AuthProvider };