import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CreateSessionView } from "../createSessionView/CreateSessionView";
import { PickQuizView } from "../pickQuizView/PickQuizView";
import "fontsource-roboto";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import TopBar from "../topBar/topBar";
import { CreateQuestionView } from "../createQuestionView/CreateQuestionView";
import { QuestionsListView } from "../questionsListView/QuestionsListView";
import { useBackEndSocket } from "../../services/BackEndService";
import Store, { StoreContext } from "../../services/StoreService";
import { SessionDashboardView } from "../sessionDashboardView/SessionDashboardView";
import Backdrop from "@material-ui/core/Backdrop";
import GridLoader from "react-spinners/GridLoader";
import { useContext, useEffect } from "react";
import { QuizStatsView } from "../quizStatsView/QuizStatsView";

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
    const { socketEmiter } = useBackEndSocket(); //for keeping socket open

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
        };
    }, [socketEmiter, store]);

    return (
        <Store>
            <Router>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Backdrop
                        style={{ zIndex: 1, backgroundColor: "rgba(0,0,0,.8)" }}
                        open={store.isLoading}
                    >
                        <GridLoader
                            color={theme.palette.primary.main}
                            loading={true}
                            margin={10}
                            size={50}
                        />
                    </Backdrop>

                    <TopBar />

                    <Switch>
                        <Route exact path="/">
                            <CreateSessionView />
                        </Route>

                        <Route path="/session">
                            <SessionDashboardView />
                        </Route>

                        <Route path="/quiz">
                            <PickQuizView />
                        </Route>

                        <Route path="/question">
                            <CreateQuestionView />
                        </Route>

                        <Route path="/questions">
                            <QuestionsListView />
                        </Route>

                        <Route path="/stats">
                            <QuizStatsView />
                        </Route>

                        <Route path="/">
                            <CreateSessionView />
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </ThemeProvider>
            </Router>
        </Store>
    );
}

export default App;
