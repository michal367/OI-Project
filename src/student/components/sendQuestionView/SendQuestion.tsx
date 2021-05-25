
import { Button, ButtonGroup, makeStyles, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useContext, useState } from "react";
import { useSocket } from "../../services/SocketService";
import { StoreContext } from "../../services/StoreService";

export function SendQuestion() {
    const store = useContext(StoreContext);
    const [value, setValue] = useState("");
    const [waitTime, setWaitingTime] = useState(false);
    const { sendJsonMessage } = useSocket();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    const classes = makeStyles({
        wrapper: {
            height: "100%",
            display: "flex",
        },
        inputArea: {
            flexGrow: 1,
            "& .MuiOutlinedInput-root": {
                borderRadius: "4px 0 0 4px",
            },
        },
        sendButton: {
            flexShrink: 0,
            width: 50,
        },
    })();

    const stopWaiting = async () => {
        setWaitingTime(false);
    }

    const sendQuestion = () => {
        store.studentQuestion.studentNick = store.studentNick;
        store.studentQuestion.time = new Date();

        store.studentQuestion.text = value
        setValue("");

        setWaitingTime(true);
        setTimeout(stopWaiting, 5000);

        const payload: SendQuestionRequestPayload = {
            event: "send_question",
            data: {
                text: store.studentQuestion.text
            }
        };
        console.log(payload);
        sendJsonMessage(payload);
    };
    return (
        <div>
            <ButtonGroup
                className={classes.wrapper}
                variant="contained"
                color="primary"
                aria-label="contained primary button group"
            >
                <TextField
                    id="standard-multiline-flexible"
                    label={waitTime ? "Poczekaj przed kolejnym 5s" : "Zadaj anonimowe pytanie"}
                    variant="outlined"
                    className={classes.inputArea}
                    value={value}
                    disabled={waitTime}
                    onChange={handleChange}
                />
                <Button
                    size="small"
                    onClick={() => sendQuestion()}
                    disabled={value.length === 0 || waitTime}
                    className={classes.sendButton}
                >
                    <SendIcon />
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default SendQuestion;