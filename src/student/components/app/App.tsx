import { CssBaseline } from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "fontsource-roboto";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { useSocket } from "../../services/SocketService";
import Store, { StoreContext } from "../../services/StoreService";
import { JoinSessionView } from "../joinSessionView/JoinSessionView";
import { SessionDashboardView } from "../sessionDashboardView/SessionDashboardView";

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

    return (
        <Store>
            <Router>
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
            </Router>
        </Store>
    );
}
export default App;
