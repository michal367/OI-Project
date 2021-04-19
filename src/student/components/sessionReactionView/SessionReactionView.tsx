import { makeStyles, Paper, useTheme } from '@material-ui/core';

export default function SessionReactionView() {
    
    const theme = useTheme();

    const classes = makeStyles({
        details: {
            padding: 20,
            height: "100%",
            maxHeight: "100%",
        }
    })();

    return (
        <Paper className={classes.details} variant="outlined" square >
            SessionReactionView
        </Paper>
    );
}

