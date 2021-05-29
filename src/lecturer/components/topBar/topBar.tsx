import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { StoreContext } from '../../services/StoreService';
import { useState } from 'react';
import { useEffect } from 'react';
import routeToTabsValue from '../../../common/util/routeToTabsValue';
import NotifiableTab from './NotifiableTab';

interface TopBarProps {
    currentLocation: string;
}

export default function TopBar(props: TopBarProps) {
    const store = useContext(StoreContext);
    const [selectedTab, setSelectedTab] = useState(routeToTabsValue(props.currentLocation));

    const routes = {
        index: "/lecturer",
        session: "/lecturer/session",
        quiz: "/lecturer/quizzes",
        questions: "/lecturer/questions",
        timestamp: "/lecturer/timestamp",
        stats: "/lecturer/stats",
    }

    useEffect(() => {
        setSelectedTab(routeToTabsValue(props.currentLocation));
    }, [props.currentLocation, routeToTabsValue]);

    const processQuestions = () => {
        store.studentQuestions.forEach(question => question.processed = true)
    }

    const tabProps = (route: string) => {
        return { routes: route, value: routeToTabsValue(route) };
    }

    return (
        <AppBar position="static">
            <Tabs
                value={selectedTab}
                centered
            >
                <NotifiableTab label="Sesja" observableList={store.studentQuestions} {...tabProps(store.lectureID ? routes.session : routes.index)} />
                <NotifiableTab label="Quizy" {...tabProps(routes.quiz)} />
                <NotifiableTab label="Pytania" {...tabProps(routes.questions)} />
                {store.lectureID && (
                    <NotifiableTab label="Zdarzenia" {...tabProps(routes.timestamp)} />
                )}
                {store.lectureID && ( //Can't be one condition because <Tabs> doesn't accept wrapped children
                    <NotifiableTab label="Statystyki" {...tabProps(routes.stats)} />
                )}
            </Tabs>
        </AppBar>
    );
}
