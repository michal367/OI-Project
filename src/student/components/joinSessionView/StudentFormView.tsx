import { useContext, useState, ChangeEvent } from "react";
import { TextField, Button, CircularProgress, Paper } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";
import "fontsource-roboto";
import { useHistory } from "react-router-dom";
import { useBackEnd, useBackEndSocket } from "../../services/BackEndService";
import { StoreContext } from "../../services/StoreService";

interface StudentFormViewProps {
    session?: string;
}

export function StudentFormView(props: StudentFormViewProps) {
    const store = useContext(StoreContext);
    const backEnd = useBackEnd();
    const { sendJsonMessage } = useBackEndSocket();
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

    const changeToCapitalCase = (value: string) => {
        let input = "";
        value
            .toLowerCase()
            .replace(/[^a-zA-ZąęłżźćóńśĄŻŹĆĘŁÓŃŚäöüßÄÖÜẞ ]/gi, "")
            .split(" ")
            .forEach((word) => {
                if (input.length != 0) input += " ";
                if (word.length > 0)
                    input += word[0].toUpperCase() + word.substring(1);
                else input += word;
            });
        return input;
    };

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(changeToCapitalCase(event.target.value));
    };

    const handleChangeSurname = (event: ChangeEvent<HTMLInputElement>) => {
        setSurname(changeToCapitalCase(event.target.value));
    };

    const isFromCompleted = () => {
        return session.length < 7 || name.length === 0 || surname.length === 0;
    };

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);

            let fakeStudent: Student = {
                id: "",
                nick: name[0] + surname,
                name: name,
                surname: surname,
            };

            if (session)
                backEnd?.joinLecture(session, fakeStudent)
                    .then((response) => {
                        console.log(response);
                        store.studentNick = fakeStudent.nick;
                        store.invitation = session;
                        store.studentId = response.student_id;

                        let event: StudentSubPayload = {
                            event: "subscribe_student",
                            data: {
                                student_id: response.student_id,
                                lecture_link: session,
                            },
                        };
                        sendJsonMessage(event);

                        history.replace("/session");
                    })
                    .catch((response) => {
                        setLoading(false);
                        console.error(response);
                    });
        }
    };
    return (
        <form autoComplete="off" className={classes.form}>
            {!props.session && (
                <TextField
                    id="outlined-secondary"
                    label="Klucz zaproszenia do sesji"
                    variant="outlined"
                    value={session}
                    color="secondary"
                    onChange={handleChangeSession}
                />
            )}
            <TextField
                id="outlined-secondary"
                label="Twoje imię"
                variant="outlined"
                value={name}
                color="secondary"
                onChange={handleChangeName}
            />
            <TextField
                id="outlined-secondary"
                label="Twoje nazwisko"
                variant="outlined"
                value={surname}
                color="secondary"
                onChange={handleChangeSurname}
            />
            <div className={classes.wrapper}>
                <Button
                    variant="contained"
                    color="secondary"
                    className={buttonClassname}
                    disabled={loading || isFromCompleted()}
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
