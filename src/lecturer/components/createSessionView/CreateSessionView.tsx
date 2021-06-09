import { useTheme, makeStyles, Button, CircularProgress, TextField } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";
import React, { useContext, useState, useCallback, useEffect } from "react";
import { useSocket } from "../../services/SocketService";
import { StoreContext } from "../../services/StoreService";
import { lazareTheme } from "../../util/theme/customTheme";
import CheckIcon from "@material-ui/icons/Check";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";


export function CreateSessionView(props: { update: () => void }) {
    const store = useContext(StoreContext);
    const theme = useTheme();
    const { sendJsonMessage, socketEmiter } = useSocket();
    const [sessionName, setSessionName] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const handleSessionNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSessionName(event.target.value);
    }
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(event.target.value);
    }
    const classes = makeStyles({
        root: {
            ...lazareTheme.root,
        },
        content: {
            ...lazareTheme.columnWrapper,
            justifyContent: "center",
            marginBottom: "15%",
        },
        createSessionFrom: {
            maxWidth: "100vw",
            display: 'grid',
            gridAutoFlow: 'row',
            gap: 10,
        },
        createSessionTextField: {
            width: "100%",
            flexShrink: 1,
            '& label.Mui-focused': {
                color: theme.palette.secondary.dark,
            },
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.secondary.dark,
                },
            },
        },
        formRow: {
            width: "100%",
            display: 'flex',
            gap: 10,
        },
        formColumn: {
            width: "100%",
            display: 'flex',
            flexDirection: "column",
            gap: 10,
            flexShrink: 1,
        },
        wrapper: {
            position: "relative",
        },
        formWrapper: {
            maxWidth: 810,
            width: "100%",
            margin: "0 auto",
            display: "flex",
            gap: "10px",
        },
        buttonSuccess: {
            color: green[100] +"!important",
            backgroundColor: green[800],
            "&:hover": {
                backgroundColor: green[900],
            },
        },
        createProgress: {
            color: green[800],
            position: "absolute",
            top: 11,
            left: 25,
            zIndex: 1,
        },
        sessionBtn: {
            width: "150px",
            height: "100%",
            fontSize: "75px",
            color: lazareTheme.palette.background,
        },
        header: {
            fontSize: 46,
            textAlign: "center",
            width: "100%",
            color: theme.palette.primary.dark,
            fontWeight: "normal",
            "& span": {
                color: theme.palette.secondary.dark,
                fontWeight: "bolder",
            },
        },
    })();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const buttonClassName = clsx({
        [classes.buttonSuccess]: success,
        [classes.sessionBtn]: 1,
    });

    const handleButtonClick = useCallback(() => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            const handleCreate = (parsed: LectureCreateResponsePayload) => {
                setTimeout(() => {
                    setSuccess(true);
                    setLoading(false);
                    store.lectureID = parsed.data.lectureID;
                    store.sendQuizStep = 0;
                    store.timeToNextQuiz = 0;
                    store.link = parsed.data.lectureLink;
                    props.update();
                },1000);
                socketEmiter.off("lecture_created", handleCreate);
                console.log("lecture created", parsed);
            };
            socketEmiter.on("lecture_created", handleCreate);
            //TODO there can be negative response - it is not handled yet
            const payload: LectureCreateRequestPayload = {
                event: "create_lecture",
                data: {
                    tutor: name + " " + surname,
                    sessionName: sessionName,
                }
            }
            sendJsonMessage(payload);
            setSessionName("");
        }
    }, [loading, name, props, sendJsonMessage, sessionName, socketEmiter, store, surname]);

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault();
            if (!(sessionName.length === 0 || name.length === 0 || surname.length === 0 )){
                handleButtonClick();
            } 
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [sessionName, name, surname, handleButtonClick]);

    return (
        <div className={classes.root}>
            <div className={classes.content} >
                <div className={classes.createSessionFrom}>
                    <h1 className={classes.header}>Rozpocznij nową sesję z <span>LazareCONNECT</span></h1>
                    <div className={classes.formWrapper}>
                    <div className={classes.formColumn}>
                        <div className={classes.formRow}>
                            <TextField className={classes.createSessionTextField} variant="outlined"
                                fullWidth={true} label={"Imię"} value={name}
                                onChange={handleNameChange}
                            />
                            <TextField className={classes.createSessionTextField} variant="outlined"
                                fullWidth={true} label={"Nazwisko"} value={surname}
                                onChange={handleSurnameChange}
                            />
                        </div>
                        <TextField className={classes.createSessionTextField} variant="outlined"
                            fullWidth={true} label={"Nazwa sesji"} value={sessionName}
                            onChange={handleSessionNameChange}
                        />
                    </div>
                    <div className={classes.wrapper}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={buttonClassName}
                            onClick={handleButtonClick}
                            disabled={ !success && (loading || sessionName.length === 0 || name.length === 0 || surname.length === 0) }
                        >
                            {success ? (
                                <CheckIcon
                                    fontSize="inherit"
                                    color="inherit"
                                />
                            ) : (
                                <PlayArrowIcon
                                    fontSize="inherit"
                                    color="inherit"
                                />
                            )}
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={100}
                                className={classes.createProgress}
                            />
                        )}

                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
