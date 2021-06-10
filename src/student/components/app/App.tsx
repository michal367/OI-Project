import { CssBaseline } from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "fontsource-roboto";
import { useCallback, useContext, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { useSocket } from "../../services/SocketService";
import Store, { StoreContext } from "../../services/StoreService";
import { JoinSessionView } from "../joinSessionView/JoinSessionView";
import { SessionDashboardView } from "../sessionDashboardView/SessionDashboardView";
import { useHistory } from "react-router-dom";

const theme = createMuiTheme({
    palette: {
        primary: {

            main: "#4C3957",
        },
        secondary: {
            
            main: "#41658A",
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});

function App() {
    const store = useContext(StoreContext);
    const { socketEmiter, sendJsonMessage } = useSocket();
    const history = useHistory();

    // heroku 55s timeout fix
    useEffect(() => {
        if (window.location.hostname.includes("heroku")) {
            const interval = setInterval(() => {
                sendJsonMessage({ event: "ping" });
            }, 50000)
            return () => clearInterval(interval);
        }
    }, [sendJsonMessage]);

    useEffect(() => {
        const onClose = () => {
            store.isLoading = true;
        };
        const onOpen = () => {
            store.isLoading = false;
        };
        socketEmiter.on("onClose", onClose);
        socketEmiter.on("onOpen", onOpen);
        return () => {
            socketEmiter.off("onClose", onClose);
            socketEmiter.off("onOpen", onOpen);
        }
    }, [socketEmiter, store]);

    const handleNotReconnected = useCallback((payload: Payload) => {
        history.push("/student", { dialogOpen: true });
        store.lectureID = null;
    }, [history, store]);
    const handleReconnected = useCallback((payload: Payload) => {
        history.push("/student/session");
    }, [history, store]);

    useEffect(() => {
        if (store.studentId !== null) {
            console.log("use effect student id niepuste");
            const payload: StudentReconnectRequestPayload = {
                "event": "reconnect_student",
                "data": {
                    "lectureLink": store.invitation,
                    "studentID": store.studentId
                }
            };

            sendJsonMessage(payload);
        }
        return () => {
        }
    }, [sendJsonMessage, store.invitation]);

    useEffect(() => {
        socketEmiter.on("student_not_reconnected", handleNotReconnected);
        socketEmiter.on("student_reconnected", handleReconnected);
        return () => {
            socketEmiter.off("student_not_reconnected", handleNotReconnected);
            socketEmiter.off("student_reconnected", handleReconnected);
        }
    }, [handleNotReconnected, socketEmiter]);


    return (

        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Backdrop style={{ zIndex: 1, backgroundColor: "rgba(0,0,0,.8)" }} open={store.isLoading} >
                <GridLoader color={theme.palette.primary.main} loading={true} margin={10} size={50} />
            </Backdrop>

            <Switch>
                <Route path="/student/session">
                    <SessionDashboardView />
                </Route>
                <Route path='/student/code/:session'>
                    <JoinSessionView />
                </Route>
                <Route path='/'>
                    <JoinSessionView />
                    <Redirect to="/student/" />
                </Route>
            </Switch>
        </ThemeProvider>

    );
}
export default App;
