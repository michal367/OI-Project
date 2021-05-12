import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { StoreContext } from '../../services/StoreService';
import { useState } from 'react';
import { useEffect } from 'react';

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

    useEffect(() => {
        if (possibleRoutes.includes(location.pathname)) setSelectedTab(location.pathname);
    }, [location.pathname, possibleRoutes]);



    return (
        <AppBar position="static">
            <Tabs
                value={selectedTab}
                centered
            >
                {(store.sessionId === "") ?
                    <Tab label="Rozpocznij sesję" value={routes.index} component={RouterLink} to={routes.index} />
                    :
                    <Tab label="Uczestnicy" value={routes.session} component={RouterLink} to={routes.session} />
                }
                <Tab label="Stwórz Quiz" value={routes.quiz} component={RouterLink} to={routes.quiz} />
                <Tab label="Pytania" value={routes.questions} component={RouterLink} to={routes.questions} />
                {(store.sessionId === "") ? <></> :
                    <Tab
                        label="Statystyki"
                        value={routes.stats}
                        component={RouterLink}
                        to={routes.stats}
                    />
                }
            </Tabs>
        </AppBar>
    );
}
