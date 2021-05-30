let location = window.location;
let port = location.port;

// development
if (port === "3000" || port === "3001")
    port = "8000";

port = port ? ":" + port : "";

export const URL = location.protocol + '//' + location.hostname + port;
export const API_URL = URL + "/api";

let wsProtocol = "ws:";
if (location.protocol === "https:")
    wsProtocol = "wss:";
export const SOCKET_URL = wsProtocol + "//" + location.hostname + port + "/ws/";

console.log(URL);
console.log(API_URL);
console.log(SOCKET_URL);
