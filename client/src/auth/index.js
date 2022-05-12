import React, { createContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'
import { Alert, AlertTitle } from '@mui/material';

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

	let registerloginAlert = "";
    auth.getLoggedIn = async function () {
        try {
            const response = await api.getLoggedIn();
            if (response.status !== 200) {
				registerloginAlert = <Alert severity="error">
					<AlertTitle>{"ERROR: response.status=200, but response.body.status not recognized"}</AlertTitle>
				</Alert>
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
				registerloginAlert = <Alert severity="error">
					<AlertTitle>{"ERROR: response.status=200, but response.body.status not recognized"}</AlertTitle>
				</Alert>
            }
        } catch (err) {
			registerloginAlert = <Alert severity="error">
				<AlertTitle>{"ERROR: something went really wrong"}</AlertTitle>
			</Alert>
        }
    }

    auth.registerUser = async function(userData, store) {
        try {
            console.log("user is now registering");
            const response = await api.registerUser(userData);  
            if (response.status !== 200) {
				registerloginAlert = <Alert severity="error">
					<AlertTitle>{"ERROR: received response.status=" + response.status}</AlertTitle>
				</Alert>
            }
            else if (response.data.status === "OK") {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
				registerloginAlert = <Alert severity="success">
					<AlertTitle>{"Successfully Registered"}</AlertTitle>
				</Alert>
                store.initalLoad();
                history.push("/");
            }
            else if (response.data.status === "ERROR") {
                return setAuth({
                    errorMessage: response.data.errorMessage
                })
            }
            else {
				registerloginAlert = <Alert severity="error">
					<AlertTitle>{"ERROR: response.status=200, but response.body.status not recognized"}</AlertTitle>
				</Alert>
            }
            
        } catch (err) {
			registerloginAlert = <Alert severity="error">
					<AlertTitle>{"ERROR: something went really wrong"}</AlertTitle>
				</Alert>
        }
    }

    auth.loginUser = async function(userData, store) {
        try {
            const response = await api.loginUser(userData);
            if (response.status !== 200) {
				registerloginAlert = <Alert severity="error">
					<AlertTitle>{"ERROR: received response.status=" + response.status}</AlertTitle>
				</Alert>
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
				registerloginAlert = <Alert severity="error">
					<AlertTitle>{"ERROR: response.status=200, but response.body.status not recognized"}</AlertTitle>
				</Alert>
            }
        } catch (err) {
			registerloginAlert = <Alert severity="error">
				<AlertTitle>{"ERROR: something went really wrong"}</AlertTitle>
			</Alert>
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
			{registerloginAlert}
        </AuthContext.Provider>
		
    );
}

export default AuthContext;
export { AuthContextProvider };