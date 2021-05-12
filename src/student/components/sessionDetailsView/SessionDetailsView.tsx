import { useContext } from "react";
import { makeStyles, Paper } from '@material-ui/core';
import { StoreContext } from "../../services/StoreService";

export default function SessionDetailsView() {
    const store = useContext(StoreContext);

    const classes = makeStyles({
        details: {
            padding: 20,
            width: "100%",
            height: "100%",
        }
    })();

    return (
        <Paper className={classes.details} variant="outlined" square >            
            <p><span>Kod zaproszenia: </span> {store.invitation}</p>
            <p><span>Nick: </span> {store.studentNick}</p>
        </Paper>
    );
}

