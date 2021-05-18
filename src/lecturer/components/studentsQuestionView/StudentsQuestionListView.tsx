import { makeStyles, Paper } from '@material-ui/core';
import { useCallback, useEffect, useContext } from 'react';
import { useSocket } from '../../services/SocketService';
import { StoreContext } from "../../services/StoreService";



export function StudentsQuestionListView() {
    const { socketEmiter } = useSocket();
    const store = useContext(StoreContext);
    const classes = makeStyles({
        root: {
            width: "100%",
            padding: 10,
            borderRadius: "0",
        },
        tmp: {
            maxHeight: "100%",
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
        },
    })();

    const refreshQuestionList = useCallback((payload: SendQuestionResponsePayload) => {
        console.log("refreshQuestionList");
        console.log(payload);
        const studentQuestion: StudentQuestion = {
            studentNick: payload.data.studentID,
            time: new Date(),
            text: payload.data.text
        };
        const newStudentQuestions = store.studentQuestions;
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
            {store.studentQuestions.map((studentQuestion, index) => {
                return (
                    <div
                        key={index}
                    >
                        <div className={classes.message}>
                            <div className={classes.messageText}>
                                <b className={classes.messageHeader}>
                                    {studentQuestion.time.toLocaleTimeString("en-GB") + " | Anonimowy student"}:
                                </b>
                                <div className="question-text">
                                    {studentQuestion.text}
                                </div>
                            </div>

                        </div>
                    </div>
                );
            })}
        </Paper>
    );
}

export default StudentsQuestionListView;