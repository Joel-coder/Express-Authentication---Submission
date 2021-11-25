import React, { createContext, useReducer } from "react";
import authInitialState from "./initialStates/authInitialState";
import exampleInitialState from "./initialStates/exampleInitialState";
import auth from "./reducers/auth";
import example from "./reducers/example";

export const GlobalContext = createContext({});

export const GlobalStateProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(auth, authInitialState);
    const [exampleState, exampleDispatch] = useReducer(example, exampleInitialState);

    return (
        <GlobalContext.Provider value={{
            authState,
            authDispatch,
            exampleState,
            exampleDispatch
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalStateProvider;
