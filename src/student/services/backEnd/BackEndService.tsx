import { createContext, ReactNode, useContext } from "react";

export interface IBackEndProps extends IBackEnd {
    children?: ReactNode
}

export interface IBackEnd {
    joinLecture: (link: string, student: Student) => Promise<any>
}

export function BackEndService(props: IBackEndProps) {
    const value = {
        joinLecture: props.joinLecture || joinLecture
    };

    return (
        <BackEndContext.Provider value={value}>
            {props.children}
        </BackEndContext.Provider>
    );
}

const BASE_URL = "http://localhost:8000/api";


const joinLecture = async (link: string, student: Student) => {
    const response = await fetch(`${BASE_URL}/lectures/${link}/student-login`, {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify( student )
    });
    return await response.json();
};



const BackEndContext = createContext<IBackEnd>({ joinLecture });

export const useBackEnd = () => {
    return useContext(BackEndContext);
};

