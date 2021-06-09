import { Button, CircularProgress, TextField } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import clsx from "clsx";
import "fontsource-roboto";
import { useCallback, useContext, useEffect, useState } from "react";
import { useSocket } from "../../services/SocketService";
import { StoreContext } from "../../services/StoreService";
import { lazareTheme } from "../../util/theme/customTheme";


export function CreateSessionView(props: { update: () => void }) {
    const store = useContext(StoreContext);
    const theme = useTheme();
    const { sendJsonMessage, socketEmiter } = useSocket();
    const [lectureName, setLectureName] = useState(store.lectureName);
    const [name, setName] = useState(store.tutorFirstName);
    const [surname, setSurname] = useState(store.tutorLastName);
    const handleSessionNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLectureName(event.target.value);
        store.lectureName = event.target.value;
    }
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        store.tutorFirstName = event.target.value;
    }
    const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(event.target.value);
        store.tutorLastName = event.target.value;
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
                    sessionName: lectureName,
                }
            }
            sendJsonMessage(payload);
        }
    }, [loading, name, props, sendJsonMessage, lectureName, socketEmiter, store, surname]);

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault();
            if (!(lectureName.length === 0 || name.length === 0 || surname.length === 0 )){
                handleButtonClick();
            } 
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [lectureName, name, surname, handleButtonClick]);

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
                            fullWidth={true} label={"Nazwa sesji"} value={lectureName}
                            onChange={handleSessionNameChange}
                        />
                    </div>
                    <div className={classes.wrapper}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={buttonClassName}
                            onClick={handleButtonClick}
                            disabled={ !success && (loading || lectureName.length === 0 || name.length === 0 || surname.length === 0) }
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
