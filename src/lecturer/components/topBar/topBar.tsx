import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export default function TopBar() {
    const location = useLocation();

    return (
        <AppBar position="static">
            <Tabs
                value={location.pathname}
                centered
            >
                <Tab label="Rozpocznij sesję" value="/" component={RouterLink} to="/" />
                <Tab label="Uczestnicy" value="/session" component={RouterLink} to="/session" />
                <Tab label="Stwórz Quiz" value="/quiz" component={RouterLink} to="/quiz" />
                <Tab label="Stwórz Pytanie" value="/question" component={RouterLink} to="/question"/>
                <Tab label="Import/Eksport" value="/import-export" component={RouterLink} to="/import-export"/>
            </Tabs>
        </AppBar>
    );
}
