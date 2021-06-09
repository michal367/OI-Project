import { makeStyles, Paper, TextField, useTheme, Divider } from '@material-ui/core';
import { useCallback, useContext, useEffect } from 'react';
import ReactScrollableFeed from 'react-scrollable-feed';
import { useSocket } from '../../services/SocketService';
import { StoreContext } from "../../services/StoreService";


export function StudentsQuestionListView() {
    const { socketEmiter } = useSocket();
    const store = useContext(StoreContext);
    const theme = useTheme();
    const classes = makeStyles({
        root: {
            width: "100%",
            height: "100%",
            borderRadius: "0",
        },
        questionsHeader:{
            padding: 10,
            fontSize: "16px",
            display: "block",
            color: "white",
            background: theme.palette.secondary.main,
        },
        questionField: {
            overflow: "auto",
            height: "100%",
            maxHeight: "calc(100% - 36px)",
        },
        tmp: {
            maxHeight: "100%",
        },
        field:{
            margin:"5px 0px"
        },
        messageReplyButton: {
            flexShrink: 0,
            display: "none",
        },
        message: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "7px 25px",
            margin: "7px 0",
            "&:hover": {
                background: "rgba(0,0,0,0.05)",
                "& .MuiButton-root": {
                    display: "block",
                }
            },
            "& *":{
                pointerEvents: "none",
            },
        },
        messageHeader: {

        },
        messageContent: {
            display: "flex",
        },
        messageText: {
            flexGrow: 1,
            width:"100%"
        },
        questionText:{
            width:"100%"
        },
    })();

    const refreshQuestionList = useCallback((payload: SendQuestionResponsePayload) => {
        console.log("refreshQuestionList");
        console.log(payload);
        const studentQuestion: StudentQuestion = {
            studentNick: payload.data.studentID,
            time: new Date(),
            text: payload.data.text,
            processed: false,
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
            <span className={classes.questionsHeader}>
                Pytania od studentów
            </span>
            <Divider />
            <div className={classes.questionField}>
                <div style={{ maxHeight: "100%" }}>
                    <ReactScrollableFeed>
                        {store.studentQuestions.map((studentQuestion, index) => {
                            return (
                                <div
                                    key={index}
                                >
                                    <div className={classes.message}>
                                        <div className={classes.messageText}>
                                            <TextField className={classes.field} error={!studentQuestion.processed}
                                                fullWidth={true}
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
            </div>
        </Paper>
    );
}

export default StudentsQuestionListView;
