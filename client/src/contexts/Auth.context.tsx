import React, { createContext, useEffect } from 'react';
import { useSetState } from 'react-use';
import conf from '../conf/main';
import ax,{ axData } from '../conf/ax';

interface User {
    id: number;
    // Define other properties of the user object
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
    const setLoginSuccess = (isLoggedIn: boolean, user: User | null) => setState({ isLoggedIn, user });
    const setLoginError = (loginError: string | null) => setState({ loginError });

    const handleLoginResult = (error: string | null, result?: { jwt?: string; user?: User }) => {
        setLoginPending(false);
        console.log('handleLoginResult:',result);
        
        if (result && result.user) {
            if (result.jwt) {
                updateJwt(result.jwt);
            }
            setLoginSuccess(true, result.user);
        } else if (error) {
            setLoginError(error);
        }
    };

    useEffect(() => {
        setLoginPending(true);
        loadPersistedJwt(handleLoginResult);
    }, []);

    const login = async (username: string, password: string) => {
        setLoginPending(true);
        setLoginSuccess(false, null);
        setLoginError(null);

        await fetchLogin(username, password, handleLoginResult);
    };

    const logout = () => {
        setLoginPending(false);
        updateJwt(null);
        setLoginSuccess(false, null);
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

const fetchLogin = async (username: string, password: string, callback: (error: string | null, result?: { jwt?: string; user?: User }) => void) => {
    try {
        const response = await ax.post(conf.loginEndpoint, {
            email: username,
            password,
        });
        console.log(response);
        
        if (response.data.access_token) {
            callback(null, response.data);
        } else {
            callback('Invalid username and password', undefined);
        }
    } catch (e) {
        callback('Fail to initiate login', undefined);
    }
};

const loadPersistedJwt = async (callback: (error: string | null, result?: { jwt?: string; user?: User }) => void) => {
    try {
        const persistedJwt = sessionStorage.getItem(conf.jwtSessionStorageKey);
        if (persistedJwt) {
            axData.jwt = persistedJwt;
            const response = await ax.get(conf.jwtUserEndpoint);
            if (response.data.id > 0) {
                callback(null, { user: response.data });
            } else {
                callback(null);
            }
        }
    } catch (e) {
        callback('Fail to initiate auto login');
    }
};
