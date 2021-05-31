import { CssBaseline } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";
import "fontsource-roboto";
import React, { useContext, useEffect } from "react";
import {
    BrowserRouter as Router,
    Redirect, Route, Switch
} from "react-router-dom";
import { GridLoader } from "react-spinners";
import { useSocket } from "../../services/SocketService";
import Store, { StoreContext } from "../../services/StoreService";
import { CreateQuestionView } from "../createQuestionView/CreateQuestionView";
import { CreateSessionView } from "../createSessionView/CreateSessionView";
import { PickQuizView } from "../pickQuizView/PickQuizView";
import { QuestionsListView } from "../questionsListView/QuestionsListView";
import { QuizStatsView } from "../quizStatsView/QuizStatsView";
import { QuizzesListView } from "../quizzesListView/QuizzesListView";
import { SessionDashboardView } from "../sessionDashboardView/SessionDashboardView";
import { TimestampView } from "../timestampView/TimestampView";
import TopBar from "../topBar/topBar";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#E1F1FF",
            main: "#80A3E4",
            dark: "#4870AC",
        },
        secondary: {
            light: "#FFEECB",
            main: "#D9A21B",
            dark: "#877455",
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});

function App() {
    const store = useContext(StoreContext);
    const { socketEmiter, sendJsonMessage } = useSocket(); //for keeping socket open

    // heroku 55s timeout fix
    useEffect(() => {
        if (window.location.hostname.includes("heroku")) {
            const interval = setInterval(() => {
                sendJsonMessage({ event: "ping" });
            }, 50000)
            return () => clearInterval(interval);
        }
    }, []);

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
                        <Route exact path="/lecturer/">
                            <CreateSessionView />
                        </Route>

                        <Route path="/lecturer/session">
                            <SessionDashboardView />
                        </Route>

                        <Route path="/lecturer/quiz">
                            <PickQuizView />
                        </Route>

                        <Route path="/lecturer/quizzes">
                            <QuizzesListView />
                        </Route>

                        <Route path="/lecturer/question">
                            <CreateQuestionView />
                        </Route>

                        <Route path="/lecturer/questions">
                            <QuestionsListView />
                        </Route>

                        <Route path="/lecturer/stats">
                            <QuizStatsView />
                        </Route>
                        <Route path="/lecturer/timestamp">
                            <TimestampView />
                        </Route>
                        <Route path="/">
                            {(store.sessionId === "") ?
                                <Redirect to="/lecturer/" />
                                :
                                <Redirect to="/lecturer/session" />
                            }
                        </Route>
                    </Switch>
                </ThemeProvider>
            </Router>
        </Store>
    );
}

export default App;
