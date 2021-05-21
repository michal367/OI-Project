import EventEmitter from "events";
import { ReactNode } from "react";
import useWebSocket from "react-use-websocket";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import { SOCKET_URL } from "../../common/util/config";
import { createGenericContext } from "../util/GenericContext";

interface ISocketProps {
    children?: ReactNode
}

interface ISocket extends WebSocketHook<MessageEvent<any>> {
    socketEmiter: EventEmitter
}

const [useSocket, SocketContextProvider] = createGenericContext<ISocket>();

function SocketService(props: ISocketProps) {
    const socketEmiter = new EventEmitter();

    const onMessage = (event: MessageEvent<any>) => {
        try {
            let obj = JSON.parse(event.data);
            socketEmiter.emit(obj.event, obj);
        } catch (err) {
            console.log("Student: error in json parse");
            socketEmiter.emit(event.data);
        }
        console.log("onMessage", event.data);
    };

    const websocket = useWebSocket(SOCKET_URL, {
        onMessage,
        onOpen: () => {
            socketEmiter.emit('onOpen');
        },
        onClose: () => {
            socketEmiter.emit('onClose');
        },
        share: true,
        shouldReconnect: (closeEvent) => {
            console.log("Student: closeEvent", closeEvent);
            return true;
        },
        reconnectAttempts: Number.POSITIVE_INFINITY,
        reconnectInterval: 3000,
    });

    const value = {
        ...websocket,
        socketEmiter
    };

    return (
        <SocketContextProvider value={value}>
            {props.children}
        </SocketContextProvider>
    );
}


export {
    useSocket,
    SocketService
}


