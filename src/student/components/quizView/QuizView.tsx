import { makeStyles, Paper, useTheme, Button, Grid, Checkbox, TextField } from '@material-ui/core';
import { FlashAuto, QuestionAnswer } from '@material-ui/icons';
import { ChangeEvent, useContext, useRef, useState } from 'react';

export default function QuizView() {
    var questionNumber = 1;

    const [checked, setChecked] = useState<boolean[]>([]);
    const [question, setQuestion] = useState<string>("");

    const classes = makeStyles({
        details: {
            padding: 20,
            height: "100%",
            maxHeight: "100%",
            background: "#fedf9d;",
            overflow: 'auto'
        },
        overlay : {
            maxWidth: '100%',
            maxHeight: '100%',
            width: 900,
            height: 450,
            overflow: "auto",
        },
    })();

    const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{   
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

    const openQuestions = [
        {
			questionText: 'The iPhone was created by which company?',
		},
    ];

    const handleCheckboxChange = (e: ChangeEvent<any>, questionNumber: number, answerNumber : number) => {
        console.log("close question number: ", questionNumber, "answer number: ", answerNumber, "value: ", e.target.checked);
    }
    
    const handleTextAreaChange = ( e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, questionNumber : number) => {
        const { value } = e.target;
        console.log("Open question number: ", questionNumber, "asnwer: ", value);
    };
    
    const submit = () => {
        console.log("Submit");
    }

    return (
        <Paper className={classes.overlay}>
        {questions.map((quest, i) => (
            
        <Paper className={classes.details} variant="outlined" square >
            {questionNumber++}
            <div >
				<>
					<div >
						<div className='question-text'>{quest.questionText}</div>
					</div>
					<div className='answer-section'>
                        <Grid container spacing={1}>
						    {quest.answerOptions.map((answerOption, j) => (
                                <>
                                    <Grid item xs={1}>
                                        <Checkbox
                                            color="primary"
                                            checked={checked[i]}
                                            onChange={(e) => handleCheckboxChange(e, i, j)}
                                        />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <TextField id="outlined-basic" variant="outlined" defaultValue={answerOption.answerText} InputProps={{
                                            readOnly: true,
                                        }}/>
                                    </Grid>
                                </>
						    ))}
                        </Grid>
					</div>
				</>
		    </div>
        </Paper>
        ))}
        {openQuestions.map((quest, i) => (
            <Paper className={classes.details} variant="outlined" square >
                {questionNumber++}
                <div >
                    <>
                        <div >
                            <div className='question-text'>{quest.questionText}</div>
                        </div>
                        <div className='answer-section'>
                        <TextField
                            multiline={true}
                            id="standard-basic"
                            variant="filled"
                            label="Odpowiedź"
                            fullWidth={true}
                            rows={5}
                            value={question}
                            onChange={(e) => handleTextAreaChange(e, i)}
                        />
                        </div>
                    </>
            </div>
            </Paper>
        ))}
    <Button fullWidth={true} variant="contained" color="primary" onClick={submit}> Submit </Button>
    </Paper>
    );
}

