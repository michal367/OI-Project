import 'fontsource-roboto';

import { CssBaseline, makeStyles } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { GridLoader } from 'react-spinners';

import { useSocket } from '../../services/SocketService';
import Store, { StoreContext } from '../../services/StoreService';
import { CreateQuestionView } from '../createQuestionView/CreateQuestionView';
import { CreateQuizView } from '../createQuizView/CreateQuizView';
import { CreateSessionView } from '../createSessionView/CreateSessionView';
import { QuestionsListView } from '../questionsListView/QuestionsListView';
import { QuizStatsView } from '../quizStatsView/QuizStatsView';
import { QuizzesListView } from '../quizzesListView/QuizzesListView';
import { SessionDashboardView } from '../sessionDashboardView/SessionDashboardView';
import { TimestampView } from '../timestampView/TimestampView';
import TopBar from '../topBar/topBar';

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

    const updateSessionState = () => {
        setIsLectureStarted((prev) => !prev);
    }


    
    // hotfix by me
    // TODO get reaction index with string sent with payload
    // TODO make it work nice and properly, because I do not know how 
    const TIME_WAITING = 20000;
    const refreshReactions = useCallback((payload?: ReactionResponsePayload) => {
        const reactionsString = [
            "HEART",
            "HAPPY",
            "SAD",
            "UP",
            "DOWN"
        ];
        let index: number;
        if (payload) {
            let indexString: string = payload.data.reaction;
            index = reactionsString.indexOf(indexString);
        } else {
            index = Math.round(Math.random() * reactionsString.length);
        }
        let tmpValues = store.reactionValues;
        tmpValues[index]++;
        store.reactionValues = tmpValues;
        if (!store.reactionModes[index] || store.lastReactionTime > 0)
        store.lastReactionTime = Date.now() + TIME_WAITING;
    },[store]);
    
    useEffect(() => {
        socketEmiter.on("send_student_reaction", refreshReactions);
        return () => {
            socketEmiter.off("send_student_reaction", refreshReactions);
        };
    }, [refreshReactions, socketEmiter]);

    const classes = makeStyles({
        mainContainer:{
            minWidth: "100vw",
            minHeight: "100vh",
        }
    })();
    return (
        
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

    );
}

export default App;
