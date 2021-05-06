import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { StoreContext } from '../../services/StoreService';

export default function TopBar() {
    const store = useContext(StoreContext);
    const location = useLocation();

    return (
        <AppBar position="static">
            <Tabs
                value={location.pathname}
                centered
            >
                <Tab label="Rozpocznij sesję" value="/" component={RouterLink} to="/" />
                <Tab label="Uczestnicy" value="/session" component={RouterLink} to="/session" disabled={!store.sessionId || store.sessionId.length === 0}/>
                <Tab label="Stwórz Quiz" value="/quiz" component={RouterLink} to="/quiz" />
                <Tab label="Pytania" value="/questions" component={RouterLink} to="/questions"/>
            </Tabs>
        </AppBar>
    );
}
