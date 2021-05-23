import { createContext, ReactNode, useContext } from "react";
import { API_URL } from "../../common/util/config";

export interface IBackEndProps extends IBackEnd {
    children?: ReactNode
}

export interface IBackEnd {
    createLecture: () => Promise<Lecture>
    getLectureLink: (id: string) => Promise<string>
    getStudentsForLecture: (id: string) => Promise<Student[]>
}

export function BackEndService(props: IBackEndProps) {
    const value = {
        createLecture: props.createLecture || createLecture,
        getLectureLink: props.getLectureLink || getLectureLink,
        getStudentsForLecture: props.getStudentsForLecture || getStudentsForLecture,
    };

    return (
        <BackEndContext.Provider value={value}>
            {props.children}
        </BackEndContext.Provider>
    );
}


const createLecture = async () => {
    const response = await fetch(`${API_URL}/lectures`, {
        method: "POST",
        mode: 'cors'
    });
    return await response.json();
};

const getLectureLink = async (id: string) => {
    const response = await fetch(`${API_URL}/lectures/link/${id}`, {
        method: "GET",
        mode: 'cors'
    });
    return await response.json();
};

const getStudentsForLecture = async (id: string) => {
    const response = await fetch(`${API_URL}/lectures/${id}/student-list`, {
        method: "GET",
        mode: 'cors'
    });
    return await response.json();
};

const BackEndContext = createContext<IBackEnd>({ createLecture, getLectureLink, getStudentsForLecture });

export const useBackEnd = () => {
    return useContext(BackEndContext);
};

