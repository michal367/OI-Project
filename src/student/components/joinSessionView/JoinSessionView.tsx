import { Button, Dialog, DialogActions, DialogTitle, Paper } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "fontsource-roboto";
import { StudentFormView } from "../joinSessionView/StudentFormView";
import { useRouteMatch } from "react-router";
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";

interface JoinSessionLocationState {
    dialogOpen?: boolean;
}

export function JoinSessionView() {
    const match = useRouteMatch<MatchParams>("/student/code/:session");
    const location = useLocation<JoinSessionLocationState>();
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    useEffect(() => {
        if (location.state)
            setDialogOpen(location.state.dialogOpen ?? false);
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

    return (
        <div className={classes.root}>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
            >
                <DialogTitle>Sesja została zakończona</DialogTitle>
                {/* <DialogContent>
                    <DialogContentText >
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent> */}
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Rozumiem
                    </Button>
                </DialogActions>
            </Dialog>


            <Paper variant="outlined" square className={classes.card}>
                {sessionId.length === 7 ?
                    <StudentFormView session={sessionId} /> : <StudentFormView />
                }
            </Paper>
        </div>
    );
}
