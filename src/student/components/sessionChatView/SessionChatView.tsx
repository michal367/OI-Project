import { makeStyles, Paper, useTheme } from '@material-ui/core';

export default function SessionChatView() {
    
    const theme = useTheme();

    const classes = makeStyles({
        details: {
            padding: 20,
            width: "100%",
            height: "100%",
            maxHeight: "100%",
            background: theme.palette.secondary.light,
        },
        tmp:{
            height: 700
        }
    })();

    return (
        <Paper className={classes.details} variant="outlined" square >
            SessionChatView
            <div className={classes.tmp} ></div>
        </Paper>
    );
}