import EventEmitter from "events";
import { createContext, ReactNode, useContext } from "react";
import useWebSocket from "react-use-websocket";
import { API_URL, SOCKET_URL } from "../../common/util/config";

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



const joinLecture = async (link: string, student: Student) => {
    const response = await fetch(`${API_URL}/lectures/${link}/student-login`, {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify( student )
    });
    return await response.json();
};


const socketEmiter = new EventEmitter();

export const useBackEndSocket = () => {

    let onMessage = (event: MessageEvent<any>) => {
        socketEmiter.emit(event.data);
        console.log("onMessage", event.data);
    }

    return {
        socketEmiter,
        ...useWebSocket(SOCKET_URL, {
            onMessage,
            onOpen: () => socketEmiter.emit('onOpen'),
            onClose: () => socketEmiter.emit('onClose'),
            share: true,
            shouldReconnect: (closeEvent) => {                
                console.log("closeEvent");
                return true;
            },
            reconnectAttempts: Number.POSITIVE_INFINITY,
            reconnectInterval: 3000,
        })
    };
};


const BackEndContext = createContext<IBackEnd>({ joinLecture });

export const useBackEnd = () => {
    return useContext(BackEndContext);
};

