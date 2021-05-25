import { makeStyles, Paper } from '@material-ui/core';
import { propTypes } from 'qrcode.react';
import { QuestionsList } from './QuestionsList';

interface QuizViewProps {
    handleBlock: (() => void);
    handleEnable: (() => void);
    handleClose: (() => void);
}
export default function QuizView(props: QuizViewProps) {

    const classes = makeStyles({
        overlay : {
            maxWidth: '100%',
            maxHeight: '100%', 
            overflow: "auto",
        },
    })();
    
    return (
        <Paper className={classes.overlay}>
            <QuestionsList handleBlock={props.handleBlock} handleEnable={props.handleEnable} handleClose={props.handleClose}></QuestionsList>
        </Paper>
    );
}
