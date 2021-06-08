import { Button, Grid, makeStyles, Paper } from '@material-ui/core';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useSocket } from '../../services/SocketService';
import { StoreContext } from '../../services/StoreService';
import { Answer } from './Answer';
import { ImageView } from './imageView';
import { Option } from './Option';
import { testData } from './testData';

interface QuestionsListProps {
    handleBlock: (() => void);
    handleEnable: (() => void);
    handleClose: (() => void);
}

export function QuestionsList(props: QuestionsListProps) {
    const [quiz, setQuiz] = useState(testData());
    const [quizID, setQuizID] = useState("");
    const [answersRecord, setAnswersRecord] = useState<Record<string, boolean | string | undefined>>({});
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
        setQuizID(payload.data.quizID);
        store.quizTime = payload.data.timeSeconds;
        store.quizStartTime = Date.now();
        setAnswersRecord({});
        props.handleEnable();
    }, [props, store]);

    useEffect(() => {
        socketEmiter.addListener("send_quiz", refreshQuiz);
        return () => {
            socketEmiter.removeListener("send_quiz", refreshQuiz);
        };
    }, [refreshQuiz, socketEmiter]);

    const handleCheckboxChange = (isChecked: boolean, questionNumber: number, answerNumber: number) => {

        let key = questionNumber + ":" + answerNumber;
        setAnswersRecord((prev) => {
            prev[key] = !prev[key];
            return prev;
        })
    }

    const handleTextAreaChange = (text: string, questionNumber: number) => {
        let key = questionNumber + "";
        setAnswersRecord((prev) => {
            prev[key] = text;
            return prev;
        })
    };

    const generateAnswersData = () => {
        let data: (boolean[] | string)[] = [];
        for (let i = 0; i < quiz.questions.length; i++) {
            let len = quiz.questions[i].options?.length;
            if (len) {
                let answers: boolean[] = [];
                for (let j = 0; j < len; j++) {
                    answers.push(!!answersRecord[i + ":" + j]);
                }
                data.push(answers);
            } else {
                data.push(answersRecord[i] ? answersRecord[i] + "" : "")
            }
        }
        return data;
    }

    const submit = () => {
        let payload: QuizResponsePayload = {
            event: "send_quiz_response",
            data: {
                quizID: quizID,
                answers: generateAnswersData(),
            }
        };
        console.log(payload);
        sendJsonMessage(payload);
        setAnswersRecord({});
        props.handleBlock();
        props.handleClose();
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
                                <Option checked={!!answersRecord[i + ":" + j]} onChange={(checked) => {
                                    handleCheckboxChange(checked, i, j)
                                }} text={option.text} />
                            ))) : (
                                <Answer label={"Odpowiedź"} value={answersRecord[i] ? answersRecord[i] + "" : ""} onChange={(text) => {
                                    handleTextAreaChange(text, i)
                                }} />
                            )}
                        </Grid>

                    </div>
                </Paper>
            ))}
            <Button fullWidth variant="contained" color="primary" onClick={submit}> Wyślij Quiz </Button>
        </>
    );
}
