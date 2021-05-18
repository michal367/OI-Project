import { makeStyles, Paper, Button, Grid, Checkbox, TextField, CardContent, Card } from '@material-ui/core';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { ImageView } from './imageView';
import { testData } from './testData';
import Store, { StoreContext } from "../../services/StoreService";
import { useContext, useEffect } from "react";
import { useSocket } from '../../services/SocketService';

export function QuestionsList() {
    let answers = new Map();
    const [quiz, setQuiz] = useState(testData());
    const [quizID, setQuizID] = useState("");
    const store = useContext(StoreContext);
    const { socketEmiter, sendJsonMessage } = useSocket();
    const classes = makeStyles({
        details: {
            padding: "20px 10px",
            background: "#fedf9d",
            overflow: 'auto',
        }
    })();
    // 
    const refreshQuiz = useCallback((payload: ServerQuizRequestPayload) => {
        console.log("refreshQuiz");
        setQuiz(payload.data.questions);
        setQuizID(payload.data.quiz_id);
    }, []);

    useEffect(() => {
        socketEmiter.addListener("send_quiz", refreshQuiz);
        return () => {
            socketEmiter.removeListener("send_quiz", refreshQuiz);
        };
    }, [refreshQuiz, socketEmiter]);

        // 

    const handleCheckboxChange = (e: ChangeEvent<any>, questionNumber: number, answerNumber: number) => {

        if (!answers.has(questionNumber)) {
            const len = quiz.questions[questionNumber].options?.length;
            if (len === undefined) return;

            let array = [];
            for (let i = 0; i < len; i++) {
                array.push(false);
            }

            array[answerNumber] = e.target.checked;
            answers.set(questionNumber, array);
        }
        else {
            let array = answers.get(questionNumber);
            array[answerNumber] = e.target.checked;
            answers.set(questionNumber, array);
        }
    }

    const handleTextAreaChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, questionNumber: number) => {
        const { value } = e.target;
        answers.set(questionNumber, value);
    };

    const submit = () => {
        let result = [];

        for (let i = 0; i < quiz.questions.length; i++) {
            let answer = answers.get(i);
            result.push(answer);
            console.log("answer for question: ", i, "is:", answer);
        }
        console.log(result);
        let payload: QuizResponsePayload = {
            event: "send_quiz_response",
            data: {
                quiz_id: quizID,
                answers: result
            }
        };
        console.log(payload);
        sendJsonMessage(payload);
    }

    return (
        <>
            {quiz.questions.map((question, i) => (
                <Paper className={classes.details} variant="outlined" square >
                    <div className='question-text' style={{ marginBottom: "10px", fontSize: "1.2rem" }}>{i + 1}.{question.text}</div>
                    {question.imageSrc && <ImageView imageSrc={question.imageSrc} />}
                    <div className='answer-section'>
                        <Grid container spacing={1}>
                            {question.options ? (question.options.map((option, j) => (
                                <div style={{ display: "flex", marginBottom: "10px" }}>
                                    <Checkbox
                                        color="primary"
                                        defaultChecked={false}
                                        onChange={(e) => handleCheckboxChange(e, i, j)}
                                    />
                                    <Button variant="outlined">{option.text}</Button>
                                </div>
                            ))) : (
                                <TextField
                                    multiline={true}
                                    id="standard-basic"
                                    variant="filled"
                                    label="Odpowiedź"
                                    fullWidth={true}
                                    rows={5}
                                    onChange={(e) => handleTextAreaChange(e, i)}
                                />
                            )}
                        </Grid>

                    </div>
                </Paper>
            ))}
            <Button fullWidth={true} variant="contained" color="primary" onClick={submit}> Wyślij Quiz </Button>
        </>
    );
}