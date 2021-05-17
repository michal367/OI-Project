import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { StoreContext } from '../../services/StoreService';
import { useState } from 'react';
import { useEffect } from 'react';
import { makeStyles, Button } from "@material-ui/core";
import NotifiableTab from "../notifiableTab/NotifiableTab"
export default function TopBar() {
    const store = useContext(StoreContext);
    const location = useLocation();

    const [selectedTab, setSelectedTab] = useState(location.pathname);

    const routes = {
        index: "/lecturer",
        session: "/lecturer/session",
        quiz: "/lecturer/quiz",
        questions: "/lecturer/questions",
        stats: "/lecturer/stats",
    }
    const possibleRoutes = Object.values(routes);

    const classes = makeStyles({
        tab: {
            position: "relative",
        },
        badge: {
            position: "absolute",
            top: "-10px",
            right: "-10px",
            width: "25px",
            height: "25px",
            background: "red",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
        },
    })();
    useEffect(() => {
        if (possibleRoutes.includes(location.pathname)) setSelectedTab(location.pathname);
    }, [location.pathname, possibleRoutes]);

    const newQuestion = () => {
        let newStudentQuestion: StudentQuestion = {
            studentNick: "Null",
            hours: "null",
            minutes: "null",
            text: "null",
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
                    <NotifiableTab
                        label="Sesja"
                        routes={routes.index}
                    />
                    :
                    <NotifiableTab
                        label="Sesja"
                        observableList={store.studentQuestions}
                        routes={routes.session}
                    />
                }
                <NotifiableTab
                    label="Quizy"
                    routes={routes.quiz}
                />
                <NotifiableTab
                    label="Pytania"
                    routes={routes.questions}
                />
                {(store.sessionId != "") && (<NotifiableTab
                    label="Statystyki"
                    routes={routes.stats}
                />)}
                <Button onClick={newQuestion}>New question</Button>
            </Tabs>
        </AppBar>
    );
}
