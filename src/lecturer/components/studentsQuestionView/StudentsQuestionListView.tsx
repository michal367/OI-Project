import { useContext } from "react";
import { StoreContext } from "../../services/StoreService";
import { makeStyles, useTheme } from "@material-ui/core";
import { studentQusestionsMock } from "../../util/mockData";
export function StudentsQuestionListView() {
    const theme = useTheme();
    const store = useContext(StoreContext);
    const classes = makeStyles({
        root: {
            width: "100%",
            height: "100%",
            background: theme.palette.secondary.light,
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
        messageHeader:{

        },
        messageContent: {
            display: "flex",
        },
        messageText: {
            flexGrow: 1,
        },
    })();


    return (
        <div className={classes.root}>
            {studentQusestionsMock.map((studentQuestion, index) => {
                return (
                    <div
                        key={index}
                    >
                        <div className={classes.message}>
                            <div className={classes.messageText}>
                                <b className={classes.messageHeader}>
                                    {studentQuestion.hours + ":" + studentQuestion.minutes + " | " + studentQuestion.studentNick}:
                                </b>
                                <div className="question-text">
                                    {studentQuestion.text}
                                </div>
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default StudentsQuestionListView;