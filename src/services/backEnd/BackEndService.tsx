import { createContext, ReactNode, useContext } from "react";




export interface IBackEndProps {
    startSession?: () => Promise<void>
    children?: ReactNode
}

export interface IBackEndContext {
    startSession: () => Promise<void>
    children?: ReactNode
}

export function BackEndService(props: IBackEndProps) {
    const value = {
        startSession: props.startSession || startSession
    };

    return (
        <BackEndContext.Provider value={value}>
            {props.children}
        </BackEndContext.Provider>
    );
}

const startSession = () => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            console.log("Backend says: Session starting");
            resolve();
        }, 2000)

    })
};

const BackEndContext = createContext<IBackEndContext>({ startSession });

export const useBackEnd = () => {
    return useContext(BackEndContext);
};

