import { createContext, ReactNode, useContext } from "react";
import {studentListMock} from "../../util/mockData";

export interface IBackEndProps extends IBackEnd {
    children?: ReactNode
}

export interface IBackEnd {
    createLecture: () => Promise<Lecture>
    getStudentsForLecture: (id: string) => Promise<Student[]>
}

export function BackEndService(props: IBackEndProps) {
    const value = {
        createLecture: props.createLecture || createLecture,
        getStudentsForLecture: props.getStudentsForLecture || getStudentsForLecture,
    };

    return (
        <BackEndContext.Provider value={value}>
            {props.children}
        </BackEndContext.Provider>
    );
}

const BASE_URL = "http://localhost:8000/api";

const createLecture = () => {
    return fetch(`${BASE_URL}/lectures`, {
        method: "POST",
        //TODO fix cors
        mode: 'cors'
    })
        .then(response => response.json())
};

const getStudentsForLecture = (id: String) => {
    return new Promise<Student[]>((resolve, reject) => {
        resolve(studentListMock);
    });
}

const BackEndContext = createContext<IBackEnd>({ createLecture, getStudentsForLecture });

export const useBackEnd = () => {
    return useContext(BackEndContext);
};

