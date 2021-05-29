import { makeStyles, Paper, Button, Grid, TextField } from '@material-ui/core';
import { ChangeEvent, useCallback, useState } from 'react';
import { ImageView } from './imageView';
import { testData } from './testData';
import { StoreContext } from "../../services/StoreService";
import { useContext, useEffect } from "react";
import { useSocket } from '../../services/SocketService';
import { Option } from './Option';

export function QuestionsList() {
    let answers = new Map();
    const [quiz, setQuiz] = useState(testData());
    const [quizID, setQuizID] = useState("");
    const [checked, setChecked] = useState<Record<string, boolean | undefined>>({});

    const store = useContext(StoreContext);
    const { socketEmiter, sendJsonMessage } = useSocket();

    const classes = makeStyles({
        details: {
            padding: "20px 10px",
            background: "#fedf9d",
            overflow: 'auto',
        }
    })();

    const refreshQuiz = useCallback((payload: ServerQuizRequestPayload) => {
        console.log("refreshQuiz");
        setQuiz(payload.data.questions);
        setQuizID(payload.data.quiz_id);
        setChecked({});
    }, []);

    useEffect(() => {
        socketEmiter.addListener("send_quiz", refreshQuiz);
        return () => {
            socketEmiter.removeListener("send_quiz", refreshQuiz);
        };
    }, [refreshQuiz, socketEmiter]);

    const handleCheckboxChange = (checked: boolean, questionNumber: number, answerNumber: number) => {

        // let values = [...checkboxValues];
        // values[questionNumber][answerNumber] = checked;
        // setCheckboxValues(values);
        let key = questionNumber + ":" + answerNumber;
        // props.updateChecked(key);
        setChecked((prev) => {
            prev[key] = !prev[key];
            console.log(prev);
            return prev;
        })

        if (!answers.has(questionNumber)) {
            const len = quiz.questions[questionNumber].options?.length;
            if (len === undefined) return;

            let array = [];
            for (let i = 0; i < len; i++) {
                array.push(false);
            }

            array[answerNumber] = checked;
            answers.set(questionNumber, array);
        }
        else {
            let array = answers.get(questionNumber);
            array[answerNumber] = checked;
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
        // let values : boolean[][] = [];
        // for(let i = 0; i < quiz.questions.length; i++) {
        //     values[i] = []
        //     let len;
        //     if(quiz.questions[i].options === undefined) continue;
        //     else{  len = quiz.questions[i].options!.length;}
        //     for(let j = 0; j < len; j++)
        //         values[i].push(false);
        // }
        // setCheckboxValues(values);
        setChecked({});
    }
    return (
        <>
            {quiz.questions.map((question, i) => (
                <Paper className={classes.details} variant="outlined" square >
                    <div className='question-text' style={{ marginBottom: "10px", fontSize: "1.2rem" }}>{i + 1}.{question.text}</div>
                    {question.imageSrc && <ImageView imageSrc={question.imageSrc} />}
                    <div className='answer-section'>
                        <Grid container spacing={1}>
                            {question.options ? (question.options.map((option, j) => {
                                console.log(checked[i + ":" + j]);
                                return (
                                    <Option checked={!!checked[i + ":" + j]} onChange={(checked) => {
                                        handleCheckboxChange(checked, i, j)
                                    }} text={option.text} />
                                )
                            })) : (
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