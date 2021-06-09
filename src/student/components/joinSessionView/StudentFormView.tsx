import { Backdrop, Button, CircularProgress, TextField } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import clsx from "clsx";
import "fontsource-roboto";
import { ChangeEvent, useCallback, useContext, useState, useEffect } from "react";
import QrReader from "react-qr-reader";
import { useHistory } from "react-router-dom";
import { useSocket } from "../../services/SocketService";
import { StoreContext } from "../../services/StoreService";


interface StudentFormViewProps {
    session?: string;
    onFail: (error: string) => void;
}

export function StudentFormView(props: StudentFormViewProps) {
    const store = useContext(StoreContext);
    const { sendJsonMessage, socketEmiter } = useSocket();
    const theme = useTheme();
    const history = useHistory();

    const classes = makeStyles({
        wrapper: {
            position: "relative",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            width: "100%",
            "& > *": {
                width: "100%",
            },
            padding: 20,
        },
        buttonSuccess: {
            backgroundColor: green[500],
            "&:hover": {
                backgroundColor: green[700],
            },
        },
        fabProgress: {
            color: green[500],
            position: "absolute",
            top: "calc(50% - 19px)",
            left: "calc(50% - 19px)",
            zIndex: 1,
        },
        sessionBtn: {
            width: "100%",
            padding: "15px",
            color: theme.palette.grey[50],
        },
    })();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [openQr, setOpenQr] = useState(false);

    const buttonClassname = clsx({
        [classes.sessionBtn]: 1,
        [classes.buttonSuccess]: success,
    });

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [session, setSession] = useState(props?.session ?? "");

    const handleChangeSession = (event: ChangeEvent<HTMLInputElement>) => {
        let sessionInvNumber = event.target.value.replace(/[^0-9]/gi, "");

        if (sessionInvNumber.length <= 7) setSession(sessionInvNumber);
    };

    const changeToLettersOnly = (value: string) => {            
        return value.replace(/[^a-zA-ZąęłżźćóńśĄŻŹĆĘŁÓŃŚäöüßÄÖÜẞ ]/gi, "")
    };

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(changeToLettersOnly(event.target.value));
    };

    const handleChangeSurname = (event: ChangeEvent<HTMLInputElement>) => {
        setSurname(changeToLettersOnly(event.target.value));
    };

    const isFormCompleted = useCallback(() => {
        return session.length === 7 &&
            name.length > 0 && name.length <= 30 &&
            surname.length > 0 && surname.length <= 30;
    }, [name, surname, session]);

    const handleButtonClick = useCallback(() => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);

            if (session){
                const handleCreate = (parsed: StudentCreateResponsePayload) =>{
                    store.studentId = parsed.data.studentID;
                    store.sessionName = parsed.data.sessionName;
                    store.tutorName = parsed.data.tutor;
                    history.replace("/student/session");
                    socketEmiter.off("student_created", handleCreate);
                    console.log("student created", parsed);
                };
                socketEmiter.on("student_created", handleCreate);
                const handleFail = (error: string) => {
                    setLoading(false);
                    props.onFail(error);
                }
                socketEmiter.on("student_not_created", handleFail);
                // there can be negative response - it is not handled yet
                const payload: StudentCreateRequestPayload = {
                    event: "create_student",
                    data: {
                        lectureLink: session,
                        name: name,
                        surname: surname,
                        nick: name[0] + surname
                    }
                }
                store.studentNick = name[0] + surname;
                sendJsonMessage(payload);
            }
        }
    }, [history, loading, name, sendJsonMessage, session, socketEmiter, store, surname]);

    const handleScan = (data: string | null) => {
        if (!data) return;

        try {
            const url = new URL(data);
            let pUrl = url.pathname.split("/");
            if (pUrl.length < 2) return;

            let code = pUrl[1];
            if (code.length !== 7) return;

            let codeNumber = parseInt(code);
            if (isNaN(codeNumber)) return;

            setSession(codeNumber + "");
            setOpenQr(false);
        } catch (e) {
            console.log("Not a valid url");
        }
    }

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault();
            if (!(loading || !isFormCompleted())){
                handleButtonClick();
               
            } 
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [handleButtonClick, isFormCompleted, loading]);

    return (
        <form autoComplete="off" className={classes.form}>
            <Backdrop open={openQr} onClick={() => { setOpenQr(false) }} style={{ zIndex: 10 }}>
                {openQr && <QrReader
                    delay={300}
                    onError={(err) => { console.error(err) }}
                    onScan={handleScan}
                    style={{ width: '100%', maxWidth: "350px" }}
                />}
            </Backdrop>
            {(!props?.session) && (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                        id="outlined-secondary"
                        label="Klucz zaproszenia do sesji"
                        variant="outlined"
                        value={session}
                        color="secondary"
                        onChange={handleChangeSession}
                        style={{ flexGrow: 1 }}
                    />
                    <IconButton color="primary" aria-label="qr scan" component="span" style={{ fontSize: "2rem" }} onClick={() => setOpenQr(true)}>
                        <CenterFocusWeakIcon fontSize="inherit" />
                    </IconButton>
                </div>
            )}
            <TextField
                id="outlined-secondary"
                label="Imię"
                variant="outlined"
                value={name}
                color="secondary"
                onChange={handleChangeName}
                inputProps={{ maxLength: 30 }}
            />
            <TextField
                id="outlined-secondary"
                label="Nazwisko"
                variant="outlined"
                value={surname}
                color="secondary"
                onChange={handleChangeSurname}
                inputProps={{ maxLength: 30 }}
            />
            <div className={classes.wrapper}>
                <Button
                    variant="contained"
                    color="secondary"
                    className={buttonClassname}
                    disabled={loading || !isFormCompleted()}
                    onClick={handleButtonClick}
                >
                    Dołącz do sesji
                </Button>
                {loading && (
                    <CircularProgress
                        size={38}
                        className={classes.fabProgress}
                    />
                )}
            </div>
        </form>
    );
}
