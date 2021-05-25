import { makeStyles, Paper, Button, Grid, Checkbox, TextField } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import { ImageView } from './imageView';
import { testData } from './testData';

export function QuestionsList() {
    let answers = new Map();
    let quiz = testData();

    const classes = makeStyles({
        details: {
            padding: "20px 10px",
            background: "#fedf9d",
            overflow: 'auto',
        }
    })();

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
                                        onChange={(e) => handleCheckboxChange(e, i, j)}
                                    />
                                    <TextField id="outlined-basic" variant="outlined" defaultValue={option.text} InputProps={{
                                        readOnly: true,
                                    }} />
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