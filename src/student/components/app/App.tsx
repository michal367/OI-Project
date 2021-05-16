import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { JoinSessionView } from "../joinSessionView/JoinSessionView";
import { SessionDashboardView } from "../sessionDashboardView/SessionDashboardView";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import "fontsource-roboto";
import Store, { StoreContext } from "../../services/StoreService";
import Backdrop from '@material-ui/core/Backdrop';
import GridLoader from "react-spinners/GridLoader";
import { useContext, useEffect } from "react";
import { useSocket } from "../../services/SocketService";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#E1F1FF",
            main: "#80A3E4",
            dark: "#4870AC",
            // contrastText: will be calculated,
        },
        secondary: {
            light: "#FFEECB",
            main: "#D9A21B",
            dark: "#877455",
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
});

function App() {
    const store = useContext(StoreContext);
    const { socketEmiter } = useSocket(); //for keeping socket open

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
                            <Redirect to="/student" />
                        </Route>
                    </Switch>
                </ThemeProvider>
            </Router>
        </Store>
    );
}
export default App;
