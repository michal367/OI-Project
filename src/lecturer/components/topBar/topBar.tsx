import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { StoreContext } from '../../services/StoreService';
import { useState } from 'react';
import { useEffect } from 'react';
import NotifiableTab from "../notifiableTab/NotifiableTab"
import Button from '@material-ui/core/Button';
export default function TopBar() {
    const store = useContext(StoreContext);
    const location = useLocation();

    const [selectedTab, setSelectedTab] = useState(location.pathname);

    const routes = {
        index: "/lecturer",
        session: "/lecturer/session",
        quiz: "/lecturer/quiz",
        questions: "/lecturer/questions",
        timestamp: "/lecturer/timestamp",
    }
    const possibleRoutes = Object.values(routes);

    useEffect(() => {
        if (possibleRoutes.includes(location.pathname)) setSelectedTab(location.pathname);
    }, [location.pathname, possibleRoutes]);

    const newQuestion = () => {
        let newStudentQuestion:StudentQuestion = {
            studentNick: "Null",
            hours:"null",
            minutes:"null",
            text:"null",
        }
        store.studentQuestions = [...store.studentQuestions, newStudentQuestion];
    }

    return (
        <AppBar position="static">
            <Tabs
                value={selectedTab}
                centered
            >
                {(store.sessionId === "") ?
                    <NotifiableTab value={routes.index} label="Rozpocznij sesję" routes={routes.index}/>
                    :
                    <NotifiableTab value={routes.session} label="Uczestnicy" observableList={store.studentQuestions} routes={routes.session}/>
                }
                <NotifiableTab value={routes.quiz} label="Stwórz Quiz" routes={routes.quiz}/>
                <NotifiableTab value={routes.questions} label="Pytania" routes={routes.questions}/>
                <NotifiableTab value={routes.timestamp} label="Zdarzenia" routes={routes.timestamp}/>
                <Button onClick={newQuestion}>New question</Button>
            </Tabs>
        </AppBar>
    );
}