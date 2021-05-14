import { makeStyles, createStyles, withStyles, useTheme } from '@material-ui/core/styles';
import {LinearProgress, Paper, Typography} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import React from 'react';

interface AnswerBarProps{
    answer: {
        text: string,
        isCorrect: boolean,
        selected: number,
    },
    totalSelected: number,
}

export function AnswerBar(props: AnswerBarProps) {
    const theme = useTheme();
    const AnswerProgress = withStyles(() => createStyles({
        root: {
          height: "100%",
        },
        colorPrimary: {
          backgroundColor: "#fff",
        },
        bar: {
          backgroundColor: props.answer.isCorrect ? green[200] : red[200],
        },
      }),
    )(LinearProgress);
    const classes = makeStyles({
		answer:{
			width: "100%",
			height: "100%",
            position: "relative",
            "&:hover :nth-child(2)":{
                display: "none",
            },
            "& :nth-child(3)":{
                display: "none",
            },
            "&:hover :nth-child(3)":{
                display: "flex",
            },
		},
        answerChild:{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
        },
    })();
    return (<Paper className={classes.answer}>
        <AnswerProgress className={classes.answerChild} variant="determinate" value={props.answer.selected * 100 / props.totalSelected} />
        <Typography className={classes.answerChild}>
            {props.answer.text}
        </Typography>
        <Typography className={classes.answerChild}>
            {(props.answer.selected * 100 / props.totalSelected) + "%"}
        </Typography>
    </Paper>)
}