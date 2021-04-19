import { useContext } from "react";
import { makeStyles, Paper, useTheme } from '@material-ui/core';
import { StoreContext } from "../../services/StoreService";

export default function SessionDetailsView() {
    
    const theme = useTheme();
    const store = useContext(StoreContext);

    const classes = makeStyles({
        details: {
            padding: 20,
            width: "100%",
            height: "100%",
            maxHeight: "100%",
        }
    })();

    return (
        <Paper className={classes.details} variant="outlined" square >
            SessionDetailsView
            <p><span>Invitation: </span> {store.invitation}</p>
            <p><span>Nick: </span> {store.studentNick}</p>
        </Paper>
    );
}

