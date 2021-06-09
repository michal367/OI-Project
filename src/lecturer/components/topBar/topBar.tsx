import { useTheme, withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../services/StoreService';
import routeToTabsValue from '../../util/route/routeToTabsValue';
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
    }, [props.currentLocation]);

    const tabProps = (route: string) => {
        return { routes: route, value: routeToTabsValue(route) };
    }

    const processQuestions = () => {
        store.studentQuestions.forEach(question => question.processed = true)        
    }

    const theme = useTheme();
    const NotifiableTabs = withStyles({
        indicator: {
            backgroundColor: theme.palette.secondary.light,
            padding: 2,
        },
    })(Tabs);

    return (
        <AppBar position="relative" style={{ flexShrink: 0, }}>
            <NotifiableTabs
                value={selectedTab}
                centered
            >
                <NotifiableTab label="Sesja" resetFunction={processQuestions} number={store.studentQuestions.filter(question => !question.processed).length} {...tabProps(store.lectureID ? routes.session : routes.index)} />
                <NotifiableTab label="Quizy" {...tabProps(routes.quiz)} />
                <NotifiableTab label="Pytania" {...tabProps(routes.questions)} />
                {store.lectureID && (
                    <NotifiableTab label="Zdarzenia" {...tabProps(routes.timestamp)} />
                )}
                {store.lectureID && ( //Can't be in one condition because <Tabs> doesn't accept wrapped children
                    <NotifiableTab label="Statystyki" {...tabProps(routes.stats)} />
                )}
            </NotifiableTabs>
        </AppBar>
    );
}
