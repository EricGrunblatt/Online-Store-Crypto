import React, { createContext, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMessage: ''
    });
    const history = useHistory();

    function setErrorMessage() {
        return setAuth({
            errorMessage: ''
        })
    }

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false
                })
            }
            default:
                return auth;
        }
    }

    auth.registerUser = async function(userData, store) {
        try {
            const response = await api.registerUser(userData);  
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
            
        } catch (err) {
            return setAuth({
                errorMessage: err.response.data.errorMessage
            })
        }
    }

    auth.loginUser = async function(userData, store) {
        try {
            const response = await api.loginUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
        } catch (err) {
            console.log(err.response.data.errorMessage);
            return setAuth({
                errorMessage: err.response.data.errorMessage
            })
        }
        
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if(response.status === 200) {
            authReducer({
                type: AuthActionType.LOGOUT_USER,
                payload: {
                    user: null,
                    loggedIn: false,
                    errorMessage: ''
                }
            })
            history.push("/");
        }
    }

    return (
        <AuthContext.Provider value={{
            auth, setErrorMessage
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };