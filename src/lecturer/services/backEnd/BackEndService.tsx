import { createContext, ReactNode, useContext } from "react";
import useWebSocket from 'react-use-websocket';
import EventEmitter from "events";

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

const BASE_URL = "http://localhost:8000/api";
const SOCKET_URL = "ws://localhost:8080/";


const createLecture = async () => {
    const response = await fetch(`${BASE_URL}/lectures`, {
        method: "POST",
        mode: 'cors'
    });
    return await response.json();
};

const getLectureLink = async (id: string) => {
    const response = await fetch(`${BASE_URL}/lectures/link/${id}`, {
        method: "GET",
        mode: 'cors'
    });
    return await response.json();
};

const getStudentsForLecture = async (id: string) => {
    const response = await fetch(`${BASE_URL}/lectures/${id}/student-list`, {
        method: "GET",
        mode: 'cors'
    });
    return await response.json();
};

const BackEndContext = createContext<IBackEnd>({ createLecture, getLectureLink, getStudentsForLecture });

export const useBackEndSocket = () => {
    let socketEmiter = new EventEmitter();

    let onMessage = (event: MessageEvent<any>) => {
        if (event.data === "studentAdded") {
            socketEmiter.emit("studentAdded");
            console.log("studentAdded");
        }
    }
    return { socketEmiter, ...useWebSocket(SOCKET_URL, { onMessage, onOpen: () => console.log('opened'), share: true }) };
};

export const useBackEnd = () => {
    return useContext(BackEndContext);
};

