import React, { createContext, useEffect } from 'react';
import { useSetState } from 'react-use';
import conf from '../conf/main';
import ax, { axData } from '../conf/ax';

interface User {
    email: string;
}

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    isLoginPending: boolean;
    loginError: string | null;
}

interface AuthContextValue {
    state: AuthState;
    login: (username: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = React.createContext<AuthContextValue | null>(null);

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
    isLoginPending: false,
    loginError: null,
};

const updateJwt = (jwt: string | null) => {
    axData.jwt = jwt;
    if (jwt) {
        sessionStorage.setItem(conf.jwtSessionStorageKey, jwt);
    } else {
        sessionStorage.removeItem(conf.jwtSessionStorageKey);
    }
};

interface ContextProviderProps {
    children: React.ReactNode;
}


export const ContextProvider: React.FC<ContextProviderProps> = (props: ContextProviderProps) => {
    const [state, setState] = useSetState<AuthState>(initialState);

    const setLoginPending = (isLoginPending: boolean) => setState({ isLoginPending });
    const setLoginSuccess = (isLoggedIn: boolean, user: User | undefined) => setState({ isLoggedIn, user });
    const setLoginError = (loginError: string | null) => setState({ loginError });

    const handleLoginResult = (error: string | null, result?: { access_token?: string; email?: User }) => {
        setLoginPending(false);
        console.log(result);
        
        if (result?.email) {
            if (result.access_token) {
                updateJwt(result.access_token);
            }
            setLoginSuccess(true, result.email);
        } else if (error) {
            setLoginError(error);
        }
    };

    useEffect(() => {
        const persistedJwt = sessionStorage.getItem(conf.jwtSessionStorageKey);
        if (persistedJwt) {
            setLoginPending(true);
            loadPersistedJwt(handleLoginResult);
        }
    }, []);
    

    const login = async (username: string, password: string) => {
        setLoginPending(true);
        setLoginSuccess(false, undefined);
        setLoginError(null);

        await fetchLogin(username, password, handleLoginResult);
    };

    const logout = () => {
        setLoginPending(false);
        updateJwt(null);
        setLoginSuccess(false, undefined);
        setLoginError(null);
    };

    return (
        <AuthContext.Provider
            value={{
                state,
                login,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

const fetchLogin = async (username: string, password: string, callback: (error: string | null, result?: { access_token?: string; email?: User }) => void) => {
    try {
        const response = await ax.post(conf.loginEndpoint, {
            email: username,
            password,
        });

        if (response.data.access_token) {
            callback(null, response.data);
        } else {
            callback('Invalid username and password', undefined);
        }
    } catch (e) {
        callback('Fail to initiate login', undefined);
    }
};

const loadPersistedJwt = async (callback: (error: string | null, result?: { access_token?: string; email?: User }) => void) => {
    try {
        const persistedJwt = sessionStorage.getItem(conf.jwtSessionStorageKey);
        if (persistedJwt) {
            axData.jwt = persistedJwt;
            const response = await ax.get(conf.jwtUserEndpoint);

            if (response.data.id > 0) {
                console.log(response);
                callback(null, { email: response.data.email });
            } else {
                callback(null);
            }
        }
    } catch (e) {
        callback('Fail to initiate auto login');
    }
};
