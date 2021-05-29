import { makeStyles, Paper, TextField } from '@material-ui/core';
import { useCallback, useEffect, useContext, useRef, useState } from 'react';
import { useSocket } from '../../services/SocketService';
import { StoreContext } from "../../services/StoreService";
import ReactScrollableFeed from 'react-scrollable-feed';


export function StudentsQuestionListView() {
    const { socketEmiter } = useSocket();
    const store = useContext(StoreContext);
    const [studentQuestions, setStudentQuestions] = useState(store.studentQuestions);
    useEffect(() => setStudentQuestions(store.studentQuestions),[store, store.studentQuestions]);
    const classes = makeStyles({
        root: {
            width: "100%",
            height: "100%",
            borderRadius: "0",

        },
        questionsHeader: {
            padding: 10,
            fontSize: "16px",
            textDecoration: "underline",

        },
        questionField: {
            padding: 10,
            overflow: "auto",
            height: "98%"
        },
        tmp: {
            maxHeight: "100%",
        },
        field: {
            margin: "5px 0px"
        },
        messageReplyButton: {
            flexShrink: 0,
            display: "none",
        },
        message: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
            "&:hover": {
                background: "rgba(0,0,0,0.2)",
                "& .MuiButton-root": {
                    display: "block",
                }
            },
            padding: 5,
        },
        messageHeader: {

        },
        messageContent: {
            display: "flex",
        },
        messageText: {
            flexGrow: 1,
            width: "100%"
        },
        questionText: {
            width: "100%"
        },
    })();

    const refreshQuestionList = useCallback((payload: SendQuestionResponsePayload) => {
        console.log(payload);
        const studentQuestion: StudentQuestion = {
            studentNick: payload.data.studentID,
            time: new Date(),
            text: payload.data.text,
            processed: false,
        };
        const newStudentQuestions = studentQuestions;
        newStudentQuestions.push(studentQuestion);
        store.studentQuestions = newStudentQuestions;
    }, [store]);

    useEffect(() => {
        socketEmiter.on("send_student_question", refreshQuestionList);
        return () => {
            socketEmiter.off("send_student_question", refreshQuestionList);
        };
    }, [refreshQuestionList, socketEmiter]);

    return (
        <Paper className={classes.root} variant="outlined" square>
            <b className={classes.questionsHeader}>
                Pytania od studentów:
        </b>
            <div className={classes.questionField}>
                <ReactScrollableFeed>
                    {studentQuestions.map((studentQuestion, index) => {
                        return (
                            <div
                                key={index}
                            >
                                <div className={classes.message}>
                                    <div className={classes.messageText}>
                                        <TextField className={classes.field} error={!studentQuestion.processed} variant="outlined"
                                            fullWidth
                                            multiline
                                            label={studentQuestion.time.toLocaleTimeString("en-GB") + " | Anonimowy student"}
                                            defaultValue={studentQuestion.text} InputProps={{
                                                className: classes.questionText,
                                                readOnly: true,
                                            }} />
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </ReactScrollableFeed>
            </div>
        </Paper>
    );
}

export default StudentsQuestionListView;
