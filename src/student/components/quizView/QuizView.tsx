import { makeStyles, Paper } from '@material-ui/core';
import { useState } from 'react';
import { QuestionsList } from './QuestionsList';


export default function QuizView() {

    const classes = makeStyles({
        overlay : {
            maxWidth: '100%',
            maxHeight: '100%', 
            overflow: "auto",
        },
    })();
    // const updateCheckedValues = (key:string) => {
    //     setCheckedValues((prev) => {
    //         prev[key] = !prev[key];
    //         return prev;
    //     })
    // }
    return (
        <Paper className={classes.overlay}>
            <QuestionsList />
        </Paper>
    );
}