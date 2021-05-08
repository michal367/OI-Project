  
import { useContext, useState } from "react";
import { StoreContext } from "../../services/StoreService";
import { Button, ButtonGroup, TextField, makeStyles } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

export function SendQuestion() {
    const store = useContext(StoreContext);
    const [value, setValue] = useState("");
    const [waitTime, setWaitingTime] = useState(false);
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

    const stopWaiting = async() =>{
        setWaitingTime(false);
    }

    const sendQuestion = () => {
        store.studentQuestion.studentNick = store.studentNick;
        store.studentQuestion.time = new Date()
        store.studentQuestion.text = value
        setValue("");

        setWaitingTime(true);
        setTimeout(stopWaiting, 5000);
        console.log(store.studentQuestion.text);
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
                    label="Napisz coś"
                    variant="outlined"
                    className={classes.inputArea}
                    value={value}
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