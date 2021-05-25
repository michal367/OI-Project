import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../../services/StoreService';
import { useState } from 'react';
import { useEffect } from 'react';
import NotifiableTab from "./NotifiableTab"
export default function TopBar() {
    const store = useContext(StoreContext);
    const location = useLocation();

    const [selectedTab, setSelectedTab] = useState(location.pathname);

    const routes = {
        index: "/lecturer",
        session: "/lecturer/session",
        quiz: "/lecturer/quizzes",
        questions: "/lecturer/questions",
        stats: "/lecturer/stats",
        timestamp: "/lecturer/timestamp",
    }
    const possibleRoutes = Object.values(routes);

  
    useEffect(() => {
        if (possibleRoutes.includes(location.pathname)) setSelectedTab(location.pathname);
    }, [location.pathname, possibleRoutes]);

    const processQuestions = () =>{
        store.studentQuestions.forEach(question => question.processed = true)
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
                    <NotifiableTab value={routes.session} label="Uczestnicy" observableList={store.studentQuestions} routes={routes.session} resetFunction={processQuestions}/>
                }
                <NotifiableTab value={routes.quiz} label="Quizy" routes={routes.quiz}/>
                <NotifiableTab value={routes.questions} label="Pytania" routes={routes.questions}/>
                <NotifiableTab value={routes.timestamp} label="Zdarzenia" routes={routes.timestamp}/>
                {(store.sessionId !== "") && (<NotifiableTab
                    label="Statystyki"
                    routes={routes.stats}
                />)}
            </Tabs>
        </AppBar>
    );
}
