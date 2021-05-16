import { makeStyles, Paper, Grid, TextField, useTheme } from '@material-ui/core';
import { testData } from '../quizView/testData';

export default function FeedbackView() {
    let answers:Map<number, number[]> = new Map();

    const fullFillMap = () => {
        var i;
        for (i = 0; i < quiz.questions.length; i++) {
            let array = [];
            array.push(1);
            array.push(3);
            answers.set(i, array);
        }
    }
    const correctFullFilled = (i:number, j:number) => {
        if(answers.get(i)?.includes(j)){
            return classes.correctFullFilledAnswer;
        } else{
            return classes.correctAnswer;
        };
    }

    const wrongFullFilled = (i:number, j:number) => {
        if(answers.get(i)?.includes(j)){
            return classes.wrongFullFilledAnswer;
        } else{
            return classes.wrongAnswer;
        };
    }

    let quiz = testData();
    const theme = useTheme();
    const classes = makeStyles({
        details: {
            width: "100%",
            height: "100%",
            maxHeight: "100%",
            padding: "10px 10px",
            background: theme.palette.secondary.light,
        },
        correctFullFilledAnswer: {
            border: '5px solid #80A3E4',
            color:"green",
            fontWeight: 'bold',
        },
        correctAnswer: {
            color:"green",
            fontWeight: 'bold',
        },
        wrongFullFilledAnswer:{
            border: '5px solid #80A3E4',
            color:"red",
            fontWeight: 'bold',
        },
        wrongAnswer:{
            color:"red",
            fontWeight: 'bold',
        },
        questionText:{
            fontSize:"20px",
        },
    })();

    return (
        <>
            {fullFillMap()}
            {quiz.questions.map((question, i) => ( 
                <div>
                {question.options ? 
                (<Paper className={classes.details} variant="outlined" square >
                    <b className={classes.questionText}>{(i+1) +". " +question.text}</b>
                    <Grid container spacing={1}>
                    {(question.options.map((option, j) => (
                        <Grid item xs={11}>
                            {(option.isCorrect ? (
                            <TextField  variant="outlined" defaultValue={option.text} InputProps={{
                                    className: correctFullFilled(i,j),
                                    readOnly: true,
                                }}/>     
                            ) : (
                            <TextField variant="outlined" defaultValue={option.text} InputProps={{
                                className: wrongFullFilled(i,j),
                                readOnly: true,
                            }}/>
                        ))}
                    </Grid>)
                    ))}
                    </Grid>
                </Paper>
                ) : (<></>) }
            </div>
            ))}
        </>
    );
}