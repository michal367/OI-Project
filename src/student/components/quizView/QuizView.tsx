import { makeStyles, Paper } from '@material-ui/core';
import { propTypes } from 'qrcode.react';
import { QuestionsList } from './QuestionsList';

interface ClosingFunction {
    handleClose: (() => void);
}

export default function QuizView(props: ClosingFunction) {

    const classes = makeStyles({
        overlay : {
            maxWidth: '100%',
            maxHeight: '100%', 
            overflow: "auto",
        },
    })();
    
    return (
        <Paper className={classes.overlay}>
            <QuestionsList handleClose={props.handleClose}></QuestionsList>
        </Paper>
    );
}