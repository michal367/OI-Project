import { createContext, ReactNode, useContext } from "react";

export interface IBackEndProps {
    createLecture?: () => Promise<Lecture>
    children?: ReactNode
}

export interface IBackEnd {
    createLecture: () => Promise<Lecture>
}

export function BackEndService(props: IBackEndProps) {
    const value = {
        createLecture: props.createLecture || createLecture
    };

    return (
        <BackEndContext.Provider value={value}>
            {props.children}
        </BackEndContext.Provider>
    );
}

const BASE_URL = "http://localhost:8000/api";

const createLecture = () => {
    return new Promise<Lecture>((resolve, reject) => {
        fetch(`${BASE_URL}/lectures`, {
            method: "POST",
            //TODO fix cors
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then((lecture: Lecture) => {
                resolve(lecture);
            })
    })
};

const BackEndContext = createContext<IBackEnd>({ createLecture });

export const useBackEnd = () => {
    return useContext(BackEndContext);
};

