import { makeStyles, Paper, useTheme } from "@material-ui/core";

export default function FeedbackView() {
    const theme = useTheme();
    const classes = makeStyles({
        details: {
            width: "100%",
            height: "100%",
            maxHeight: "100%",
            background: theme.palette.secondary.light,
        },
    })();

    return (
        <Paper className={classes.details} variant="outlined" square>
        </Paper>
    );
}