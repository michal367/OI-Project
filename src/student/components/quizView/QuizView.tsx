import { makeStyles, Paper } from '@material-ui/core';
import { QuestionsList } from './QuestionsList';

interface BlockFunction {
    handleBlock: (() => void);
    handleEnable: (() => void);
}

export default function QuizView(props: BlockFunction) {

    const classes = makeStyles({
        overlay : {
            maxWidth: '100%',
            maxHeight: '100%', 
            overflow: "auto",
        },
    })();
    
    return (
        <Paper className={classes.overlay}>
            <QuestionsList handleBlock={props.handleBlock} handleEnable={props.handleEnable} ></QuestionsList>
        </Paper>
    );
}