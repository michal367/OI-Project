import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { TimestampTable } from "./TimestampTable";
import { lazareTheme } from "../../util/theme/customTheme";

export function TimestampView() {

    const classes = makeStyles({
        root: {
            ...lazareTheme.root,
        },
        content: {
            ...lazareTheme.slimColumnWrapper,
            gap: 20,
            height: "calc(100vh - 48px)",
            minHeight: "500px",
            boxSizing: "border-box",
        },
    })();

    useEffect(() => {
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <TimestampTable />
            </div>
        </div>
    );
}
