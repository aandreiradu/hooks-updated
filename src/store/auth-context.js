import React, { createContext, useState } from 'react'


const authInitialState = {
    isLoggedIn: false,
    login: () => { }
};


export const AuthContext = createContext(authInitialState);


const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = () => {
        setIsLoggedIn(true);
    };


    const authContextValue = {
        isLoggedIn: isLoggedIn,
        login: loginHandler
    }

    return (

        <AuthContext.Provider value={authContextValue}>
            {props.children}
        </AuthContext.Provider>
    )
};


export default AuthContextProvider;
