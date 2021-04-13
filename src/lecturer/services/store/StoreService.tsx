import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";


const initialState = {
    link: "",
    sessionId: "none"
};

const Store = (props: any) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {props.children}
        </Context.Provider>
    )
};

export const Context = createContext<any>([initialState]);
export default Store;