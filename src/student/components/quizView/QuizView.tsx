import { makeStyles, Paper } from '@material-ui/core';
import { QuestionsList } from './QuestionsList';


export default function QuizView() {

    const classes = makeStyles({
        overlay: {
            maxWidth: '100%',
            maxHeight: '100%',
            overflow: "auto",
        },
    })();

    return (
        <Paper className={classes.overlay}>
            <QuestionsList></QuestionsList>
        </Paper>
    );
}