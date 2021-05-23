import { Button, Dialog, DialogActions, DialogTitle, Paper } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "fontsource-roboto";
import { StudentFormView } from "../joinSessionView/StudentFormView";
import { useRouteMatch } from "react-router";
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";

interface JoinSessionLocationState {
    dialogOpen?: boolean;
    dialogText?: string;
}

const text = {
    sessionEnded: "Sesja została zakończona",
    failedToJoin: "Nie udało się połaczyć",
}

export function JoinSessionView() {
    const match = useRouteMatch<MatchParams>("/student/code/:session");
    const location = useLocation<JoinSessionLocationState>();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogText, setDialogText] = useState(text.sessionEnded);

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    useEffect(() => {
        if (location.state) {
            setDialogOpen(location.state.dialogOpen ?? false);
            setDialogText(location.state.dialogText ?? text.sessionEnded);
        }
    }, [location.state]);

    let sessionId;
    if (match)
        sessionId = match.params.session;
    else
        sessionId = location.search.substring(1);

    const theme = useTheme();
    const classes = makeStyles({
        root: {
            background: theme.palette.primary.light,
            gap: "50px",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        card: {
            maxWidth: 600,
            width: "100%",
        }
    })();

    const handleJoinFailed = (error?: string) => {
        setDialogOpen(true);
        setDialogText(text.failedToJoin)
    }

    return (
        <div className={classes.root}>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
            >
                <DialogTitle>{dialogText}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Rozumiem
                    </Button>
                </DialogActions>
            </Dialog>


            <Paper variant="outlined" square className={classes.card}>
                <StudentFormView session={sessionId.length === 7 ? sessionId : undefined} onFail={handleJoinFailed} />
            </Paper>
        </div>
    );
}
