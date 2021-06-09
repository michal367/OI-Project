import { makeStyles, Paper, TextField } from '@material-ui/core';
import { useCallback, useContext, useEffect } from 'react';
import ReactScrollableFeed from 'react-scrollable-feed';

import { useSocket } from '../../services/SocketService';
import { StoreContext } from '../../services/StoreService';


export function StudentsQuestionListView() {
    const { socketEmiter } = useSocket();
    const store = useContext(StoreContext);
    const classes = makeStyles({
        root: {
            width: "100%",
            height: "100%",
            borderRadius: "0",

        },
        questionsHeader: {
            padding: 10,
            fontSize: "16px",
            display: "block",
        },
        questionField: {
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
            padding: "7px 15px",
            "&:hover": {
                background: "rgba(0,0,0,0.15)",
                "& .MuiButton-root": {
                    display: "block",
                }
            },
            "& *": {
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
            width: "100%"
        },
        questionText: {
            width: "100%"
        },
    })();


    useEffect(
        () => {
            return () => {
                store.studentQuestions.forEach(question => question.viewed = true);
            }
        }
        , [])

    return (
        <Paper className={classes.root} variant="outlined" square>
            <b className={classes.questionsHeader}>
                Pytania od studentów
        </b>
            <div className={classes.questionField}>
                <ReactScrollableFeed>
                    {store.studentQuestions.map((studentQuestion, index) => {
                        return (
                            <div
                                key={index}
                            >
                                <div className={classes.message}>
                                    <div className={classes.messageText}>
                                        <TextField className={classes.field} error={!studentQuestion.viewed}
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
        </Paper>
    );
}

export default StudentsQuestionListView;
