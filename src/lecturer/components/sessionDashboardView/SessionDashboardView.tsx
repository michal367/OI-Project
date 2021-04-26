import {
    makeStyles,
    useTheme,
} from "@material-ui/core";
import { useState } from "react";
import { SendQuizView } from "../sendQuizView/SendQuizView";
import { StudentListView } from "../studentListView/StudentListView";

export function SessionDashboardView() {
    const theme = useTheme();

    const classes = makeStyles({
        root: {
            background: theme.palette.primary.light,
            maxHeight: "100vh",
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            width: "100%",
            top: 0,
            zIndex: -1,
            paddingTop: "55px",
            paddingBottom: "10px",
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: "#fff",
        },
        main: {
            width: "100%",
            flexShrink: 2,
            flexGrow: 1,
            height: "100%",
            display: "flex",
            gap: 10,
            minHeight: 100,
            padding: "0 10px",
        },
        aside: {
            width: "100%",
            flexShrink: 4,
            flexGrow: 1,
            height: "100%",
            minHeight: 100,
            padding: "10px 10px",
        },
        overlay: {
            minWidth: "80%",
            minHeight: "90%",
            width: 300,
            height: 400,
        }
    })();

    return (
        <div className={classes.root}>
            <div className={classes.main}>
                <StudentListView />
            </div>
            <div className={classes.aside}>
                <SendQuizView />
            </div>
        </div>
    );
}
