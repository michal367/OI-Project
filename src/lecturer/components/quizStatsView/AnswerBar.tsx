import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { LinearProgress, Paper, Typography } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

interface AnswerBarProps {
    answer: {
        text: string,
        isCorrect: boolean,
    },
    selected: number,
    totalSelected: number,
}

export function AnswerBar(props: AnswerBarProps) {
    const percent = props.selected * 100 / ((props.totalSelected > 0) ? props.totalSelected : 300);
    const AnswerProgress = withStyles(() => createStyles({
        root: {
            height: "100%",
        },
        colorPrimary: {
            backgroundColor: props.answer.isCorrect ? green[200] : red[200],
        },
        bar: {
            backgroundColor: props.answer.isCorrect ? green[500] : red[500],
        },
    }),
    )(LinearProgress);
    const classes = makeStyles({
        answer: {
            width: "100%",
            height: "max(100% , fit-content)",
            position: "relative",
            "&:hover :nth-child(2)": {
                opacity: 0,
            },
            "& :nth-child(3)": {
                opacity: 0,
            },
            "&:hover :nth-child(3)": {
                opacity: 1,
            },
        },
        answerChild: {
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            color: "#fff",
            alignItems: "center",
        },
        answerText: {
            position: "relative",
            height: "100%",
            width: "100%",
            display: "flex",
            padding: 10,
            color: "#fff",
            alignItems: "center",
        },
    })();
    return (<Paper className={classes.answer}>
        <AnswerProgress className={classes.answerChild} variant="determinate" value={percent} />
        <Typography className={classes.answerText}>
            {props.answer.text}
        </Typography>
        <Typography className={classes.answerChild} style={{ fontSize: 26 }}>
            {(Math.round(percent * 10) / 10) + "%"}
        </Typography>
    </Paper>)
}