import { makeStyles, Paper, useTheme } from "@material-ui/core";
import SendQuestion from "./SendQuestion";

export default function SessionQuestionView() {
    const theme = useTheme();
    const classes = makeStyles({
        details: {
            width: "100%",
            height: "100%",
        },
        wrapper: {
            height: "100%",
            display: "flex",

            boxSizing: "border-box",
        },
        messageArea: {
            padding: 10,
            flexGrow: 1,
            overflow: "auto"
        },
        inputBar: {
            padding: 10,
            flexShrink: 0,
            background: theme.palette.primary.light,
            width: "100%",
        },
    })();

    return (
        <Paper className={classes.details} variant="outlined" square>
            <div className={classes.wrapper}>
                <div className={classes.inputBar}>
                    <SendQuestion />
                </div>
            </div>
        </Paper>
    );
}