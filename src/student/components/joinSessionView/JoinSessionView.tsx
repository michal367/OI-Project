import { Button, Dialog, DialogActions, DialogTitle, Paper } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "fontsource-roboto";
import { StudentFormView } from "../joinSessionView/StudentFormView";
import { useRouteMatch } from "react-router";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";

interface JoinSessionLocationState {
    dialogOpen?: boolean;
    dialogText?: string;
}

const text = {
    sessionEnded: "Sesja została zakończona",
    failedToJoin: "Nie udało się połączyć",
}

export function JoinSessionView() {
    const match = useRouteMatch<MatchParams>("/student/code/:session");
    const location = useLocation<JoinSessionLocationState>();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogText, setDialogText] = useState(text.sessionEnded);

    const getSessionCodeFromURL = () => {
        let codeFromURL = "";
        if (match)
            codeFromURL = match.params.session.replace(/[^0-9]/, "");
        else
            codeFromURL = location.search.substring(1).replace(/[^0-9]/, "");
        return codeFromURL;
    };
    const [sessionCode] = useState(getSessionCodeFromURL());

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    useEffect(() => {
        if (location.state) {
            setDialogOpen(location.state.dialogOpen ?? false);
            setDialogText(location.state.dialogText ?? text.sessionEnded);
        }
    }, [location.state]);



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
        console.log(error);
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
                <StudentFormView session={sessionCode.length === 7 ? sessionCode : undefined} onFail={handleJoinFailed} />
            </Paper>
        </div>
    );
}
