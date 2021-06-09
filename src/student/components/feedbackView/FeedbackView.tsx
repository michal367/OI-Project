import { makeStyles, Paper, Grid, TextField, useTheme } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSocket } from '../../services/SocketService';
import { StoreContext } from '../../services/StoreService';
import { ImageView } from '../quizView/imageView';

export default function FeedbackView() {
    const { socketEmiter } = useSocket();
    const store = useContext(StoreContext);

    const correctFullFilled = (checked: boolean) => {
        if (checked) {
            return classes.correctFullFilledAnswer;
        } else {
            return classes.correctAnswer;
        };
    }

    const wrongFullFilled = (checked: boolean) => {
        if (checked) {
            return classes.wrongFullFilledAnswer;
        } else {
            return classes.wrongAnswer;
        };
    }

    const [payload, setPayload] = useState<ShowAnswersToStudentPayload>();

    const refreshQuiz = useCallback((payload: ShowAnswersToStudentPayload) => {
        setPayload(payload);
        
        if (store.quizId === payload.data.quizID) {
            store.quizTime = 0;
            store.quizStartTime = 0;
            store.quizId = "";
        }

    }, [store]);

    useEffect(() => {
        socketEmiter.addListener("show_answers", refreshQuiz);
        return () => {
            socketEmiter.removeListener("show_answers", refreshQuiz);
        };
    }, [refreshQuiz, socketEmiter]);

    const theme = useTheme();
    const background = "#D3D0CB";
    const classes = makeStyles({
        details: {
            width: "100%",
            height: "100%",
            maxHeight: "100%",
            padding: "10px 10px",
            background: background,
        },
        correctFullFilledAnswer: {
            border: '5px solid #80A3E4',
            color: "green",
            fontWeight: 'bold',
        },
        correctAnswer: {
            color: "green",
            fontWeight: 'bold',
        },
        wrongFullFilledAnswer: {
            border: '5px solid #80A3E4',
            color: "red",
            fontWeight: 'bold',
        },
        wrongAnswer: {
            color: "red",
            fontWeight: 'bold',
        },
        questionText: {
            fontSize: "20px",
        },
    })();

    return (
        <>
            {payload?.data.correctAnswers?.questions.map((question: Question, i: number) => (
                <div>
                    {question.options ?
                        (<Paper className={classes.details} variant="outlined" square >
                            <b className={classes.questionText}>{(i + 1) + ". " + question.text}</b>
                            {question.imageSrc && <ImageView imageSrc={question.imageSrc} />}
                            <Grid container spacing={1}>
                                {(question.options.map((option, j) => (
                                    <Grid item xs={11}>
                                        {(option.isCorrect ? (
                                            <TextField variant="outlined" defaultValue={option.text} InputProps={{
                                                className: correctFullFilled(payload?.data.studentAnswers[i][j]),
                                                readOnly: true,
                                            }} />
                                        ) : (
                                            <TextField variant="outlined" defaultValue={option.text} InputProps={{
                                                className: wrongFullFilled(payload?.data.studentAnswers[i][j]),
                                                readOnly: true,
                                            }} />
                                        ))}
                                    </Grid>)
                                ))}
                            </Grid>
                        </Paper>
                        ) : (<></>)}
                </div>
            ))}
        </>
    );
}