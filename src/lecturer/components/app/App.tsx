import { CssBaseline, makeStyles } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";
import "fontsource-roboto";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Redirect, Route, Switch
} from "react-router-dom";
import { GridLoader } from "react-spinners";
import { useSocket } from "../../services/SocketService";
import Store, { StoreContext } from "../../services/StoreService";
import { CreateQuestionView } from "../createQuestionView/CreateQuestionView";
import { CreateQuizView } from "../createQuizView/CreateQuizView";
import { CreateSessionView } from "../createSessionView/CreateSessionView";
import { QuestionsListView } from "../questionsListView/QuestionsListView";
import { QuizStatsView } from "../quizStatsView/QuizStatsView";
import { QuizzesListView } from "../quizzesListView/QuizzesListView";
import { SessionDashboardView } from "../sessionDashboardView/SessionDashboardView";
import { TimestampView } from "../timestampView/TimestampView";
import TopBar from "../topBar/topBar";

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
    const { socketEmiter, sendJsonMessage } = useSocket(); //for keeping socket open
    const [isLectureStarted, setIsLectureStarted] = useState<boolean>(!!store.lectureID);
    
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


    const handleNotReconnected = useCallback((payload: Payload) => {
        setIsLectureStarted(false);
    },[]);
    
    useEffect(()=>{
        socketEmiter.on("lecture_not_reconnected", handleNotReconnected);
        // TODO: handle lecture_connected if you want to
        if(store.lectureID != null){
            const payload: LectureReconnectRequestPayload = {
                "event": "reconnect_lecture",
                "data": {
                    "lectureID": store.lectureID
                }         
            };
            store.lectureID = null;
            sendJsonMessage(payload);
        }

        return () =>{
            socketEmiter.off("lecture_not_reconnected", handleNotReconnected);
        }
    }, [handleNotReconnected, sendJsonMessage, socketEmiter, store, store.lectureID]);

    const updateSessionState = () => {
        setIsLectureStarted((prev) => !prev);
    }

    const classes = makeStyles({
        mainContainer:{
            minWidth: "100vw",
            minHeight: "100vh",
        }
    })();
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
                            color={theme.palette.secondary.light}
                            loading={true}
                            margin={10}
                            size={50}
                        />
                    </Backdrop>
                    <Route path="/" render={({ location }) => {
                        return (
                            <div className={classes.mainContainer}>
                                <TopBar currentLocation={location.pathname} />

                                <Switch>

                                    <Route exact path="/lecturer/" render={() => {
                                        return (
                                            isLectureStarted ?
                                                <Redirect to={{
                                                    pathname: "lecturer/session",
                                                    state: { isOpen: true }
                                                }} /> :
                                                <CreateSessionView update={updateSessionState} />
                                        )
                                    }} />

                                    <Route exact path="/lecturer/quiz" render={() => {
                                        return <CreateQuizView />
                                    }} />

                                    <Route exact path="/lecturer/quizzes" render={() => {
                                        return <QuizzesListView />
                                    }} />

                                    <Route exact path="/lecturer/question" render={() => {
                                        return <CreateQuestionView />
                                    }} />

                                    <Route exact path="/lecturer/questions" render={() => {
                                        return <QuestionsListView />
                                    }} />

                                    <Route exact path="/lecturer/stats" render={() => {
                                        return (
                                            isLectureStarted ?
                                                <QuizStatsView /> :
                                                <Redirect to="/lecturer/" />
                                        )
                                    }} />

                                    <Route exact path="/lecturer/timestamp" render={() => {
                                        return (
                                            isLectureStarted ?
                                                <TimestampView /> :
                                                <Redirect to="/lecturer/" />
                                        )
                                    }} />

                                    <Route exact path="/lecturer/session" render={() => {
                                        return (
                                            isLectureStarted ?
                                                <SessionDashboardView update={updateSessionState} /> :
                                                <Redirect to="/lecturer/" />
                                        )
                                    }} />

                                    <Route path="/" render={() => {
                                        return (
                                            isLectureStarted ?
                                                <Redirect to="/lecturer/session" /> :
                                                <Redirect to="/lecturer/" />
                                        )
                                    }} />

                                </Switch>
                            </div>
                        )
                    }} />
                </ThemeProvider>
            </Router>
        </Store>
    );
}

export default App;
