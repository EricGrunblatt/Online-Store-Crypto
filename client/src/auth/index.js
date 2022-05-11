import React, { createContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
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

    function setErrorMessage(message) {
        setAuth({
            errorMessage: message
        })
    }

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn
                })
            }
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

    auth.getLoggedIn = async function () {
        try {
            const response = await api.getLoggedIn();
            if (response.status !== 200) {
                alert("ERROR: received response.status=" + response.status)
            }
            else if (response.data.status === "OK") {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user,
                    }
                });
            }
            else if (response.data.status === "ERROR") {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: false,
                        user: null
                    }
                });
            }
            else {
                alert("ERROR: response.status=200, but response.body.status not recognized")
            }
        } catch (err) {
            //alert("ERROR: something went really wrong");
        }
    }

    auth.registerUser = async function(userData, store) {
        try {
            console.log("user is now registering");
            const response = await api.registerUser(userData);  
            if (response.status !== 200) {
                alert("ERROR: received response.status=" + response.status)
            }
            else if (response.data.status === "OK") {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                alert("Successfully Registered");
                store.initalLoad();
                history.push("/");
            }
            else if (response.data.status === "ERROR") {
                return setAuth({
                    errorMessage: response.data.errorMessage
                })
            }
            else {
                alert("ERROR: response.status=200, but response.body.status not recognized")
            }
            
        } catch (err) {
            //alert("ERROR: something went really wrong");
        }
    }

    auth.loginUser = async function(userData, store) {
        try {
            const response = await api.loginUser(userData);
            if (response.status !== 200) {
                alert("ERROR: received response.status=" + response.status)
            }
            else if (response.data.status === "OK") {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                auth.getLoggedIn();
                store.initialLoad();
                
            }
            else if (response.data.status === "ERROR") {
                return setAuth({
                    errorMessage: response.data.errorMessage
                })
            }
            else {
                alert("ERROR: response.status=200, but response.body.status not recognized")
            }
        } catch (err) {
            alert("ERROR: something went really wrong")
        }
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if(response.data.status === "OK") {
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