import React, { useContext, useState, ChangeEvent, useCallback } from "react";
import { TextField, Button, CircularProgress, Backdrop } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";
import "fontsource-roboto";
import { useHistory } from "react-router-dom";
import { useBackEnd } from "../../services/BackEndService";
import { StoreContext } from "../../services/StoreService";
import IconButton from '@material-ui/core/IconButton';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import QrReader from "react-qr-reader";
import { useSocket } from "../../services/SocketService";


interface StudentFormViewProps {
    session?: string;
    onFail?: (error: string) => void;
}

export function StudentFormView(props: StudentFormViewProps) {
    const store = useContext(StoreContext);
    const backEnd = useBackEnd();
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

    const isFormCompleted = () => {
        return session.length === 7 &&
            name.length > 0 && name.length <= 30 &&
            surname.length > 0 && surname.length <= 30;
    };

    const handleButtonClick = useCallback(() => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);

            if (session){
                const handleCreate = (parsed: StudentCreateResponsePayload) =>{
                    store.studentId = parsed.data.studentID;
                    history.replace("/student/session");
                    socketEmiter.off("student_created", handleCreate);
                    console.log("student created", parsed);
                };
                socketEmiter.on("student_created", handleCreate);
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
