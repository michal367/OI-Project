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
    const { socketEmiter, sendJsonMessage } = useSocket();
    const [isLectureStarted, setIsLectureStarted] = useState<boolean>(store.lectureID != null);
    // TODO: line above is executed before loading from local storage so store.lectureID is null for short time
    
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
        const handleInProgress = (parsed: ShowAnswersPayload) => {
            let quizzes = store.scheduledQuizzes;
            quizzes[store.scheduledQuizzes.length - 1].id = parsed.data.quizID;
            store.scheduledQuizzes = quizzes;
        }
        socketEmiter.on("quiz_in_progress", handleInProgress);
        return () => {
            socketEmiter.off("quiz_in_progress", handleInProgress);
        }
    }, [socketEmiter, store]);

    useEffect(() => {
        const onClose = () => {
            store.isLoading = true;
        };
        const onOpen = () => {
            store.isLoading = false;
        };
        const onQuizResponse = (payload: ServerQuizResponsePayload) => {
            let quizzes = store.scheduledQuizzes;
            let responses = payload.data.answers;
            let quizStats = quizzes.filter(scheduledQuiz => scheduledQuiz.id === payload.data.quizID)[0];
            let index = (quizzes.indexOf(quizStats));
            quizStats.questionStats.forEach(qStat => {
                let question = quizStats?.quiz?.questions[qStat.index];
                let response = responses[qStat.index];
                if (question?.options?.length ?? 0 > 0) {
                    qStat.options.forEach(oStat => {
                        if (!oStat.numberOfTimesSelected)
                            oStat.numberOfTimesSelected = 0;
                        oStat.numberOfTimesSelected += response[oStat.index];
                    })
                } else {
                    let answersArray = qStat.options;
                    answersArray.push(response);
                    qStat.options = answersArray;
                }
            })
            quizzes[index] = quizStats
            store.scheduledQuizzes = quizzes;
        }
        socketEmiter.on("onClose", onClose);
        socketEmiter.on("onOpen", onOpen);
        socketEmiter.on("quiz_answers_added", onQuizResponse);
        return () => {
            socketEmiter.off("onClose", onClose);
            socketEmiter.off("onOpen", onOpen);
            socketEmiter.off("quiz_answers_added", onQuizResponse);
        };
    }, [socketEmiter, store]);


    const handleNotReconnected = useCallback((payload: Payload) => {
        setIsLectureStarted(false);
        store.lectureID = null;
    }, []);

    useEffect(() => {
        socketEmiter.on("lecture_not_reconnected", handleNotReconnected);

        if (store.lectureID != null) {
            setIsLectureStarted(true);
            const payload: LectureReconnectRequestPayload = {
                "event": "reconnect_lecture",
                "data": {
                    "lectureID": store.lectureID
                }
            };
            sendJsonMessage(payload);
        }
        else {
            setIsLectureStarted(false);
        }

        return () => {
            socketEmiter.off("lecture_not_reconnected", handleNotReconnected);
        }
    }, [handleNotReconnected, sendJsonMessage, socketEmiter]);

    const updateSessionState = () => {
        setIsLectureStarted((prev) => !prev);
    }

    const classes = makeStyles({
        mainContainer: {
            minWidth: "100vw",
            minHeight: "100vh",
        }
    })();
    return (
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
                                                pathname: "/lecturer/session",
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
    );
}

export default App;
