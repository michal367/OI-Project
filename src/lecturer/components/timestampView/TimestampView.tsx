import { makeStyles, useTheme } from "@material-ui/core";
import { useEffect } from "react";
import { TimestampTable } from "./TimestampTable";

export function TimestampView() {

    const theme = useTheme();

    const classes = makeStyles({
        root: {
            background: theme.palette.primary.light,
            maxHeight: "100vh",
            height: "100vh",
            position: "absolute",
            width: "100%",
            top: 0,
            zIndex: -1,
            padding: "0 10px",
            paddingTop: 85,
            paddingBottom: 30,
        },
        wrapper: {
            width: "745px",
            overflow: "auto",
            height: "100%",
            margin: "0 auto",
        },
    })();

    useEffect(() => {
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <TimestampTable />
            </div>
        </div>
    );
}
