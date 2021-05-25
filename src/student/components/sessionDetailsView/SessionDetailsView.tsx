import React, { useContext } from "react";
import { Button, makeStyles, Paper } from '@material-ui/core';
import { StoreContext } from "../../services/StoreService";
import StopIcon from '@material-ui/icons/Stop';
import { useHistory } from "react-router-dom";
import { useSocket } from "../../services/SocketService";

export default function SessionDetailsView() {
    const store = useContext(StoreContext);
    const history = useHistory();
    const { sendJsonMessage } = useSocket();

    const classes = makeStyles({
        details: {
            padding: 20,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start"
        },
        icon: {
            marginRight: 10,
            fontSize: 20,
        }
    })();

    const handleClickEnd = () => {
        let message: Payload = {
            event: "delete_student"
        };
        sendJsonMessage(message);

        store.operation?.clear();
        history.push("/student", { dialogOpen: true });
    };

    return (
        <Paper className={classes.details} variant="outlined" square >
            <div>
                <p><span>Kod zaproszenia: </span> {store.invitation}</p>
                <p><span>Nick: </span> {store.studentNick}</p>
            </div>
            <Button
                onClick={handleClickEnd}
                color="inherit"
                variant="contained"
            >
                <StopIcon fontSize="large" className={classes.icon} />
                    Rozłącz się
            </Button >
        </Paper>
    );
}

