import { useContext, useState, useRef, ChangeEvent } from "react";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { useRouteMatch } from "react-router";
import clsx from "clsx";
import "fontsource-roboto";
import { useHistory } from "react-router-dom";
import { MatchParams } from "../../@types/types";
import { useBackEnd } from "../../services/backEnd/BackEndService";
import { StoreContext } from "../../services/StoreService";

export function ChooseNicknameView() {
    const store = useContext(StoreContext);
    const backEnd = useBackEnd();
    const theme = useTheme();
    const history = useHistory();
    const match = useRouteMatch<MatchParams>("/:session");
    const classes = makeStyles({
        root: {
            background: theme.palette.primary.light,
            gap: "50px",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        wrapper: {
            position: "relative",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "350px",
            "& > *": {
                width: "100%",
            }
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
    const timer = useRef<number>();
    const [name, setName] = useState('');
    const [session, setSession] = useState(match?.params.session);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);

            let fakeStudent: Student = { id: "", nick: name, name: "name1", surname: "surname1" }
            backEnd?.joinLecture(session || "", fakeStudent).then((response) => {
                console.log(response);
                store.studentNick = name;
                store.invitation = session;
                history.replace("/session");
            }).catch((response) => {
                setLoading(false);
                console.error(response);
            })


        }
    };

    return (
        <div className={classes.root}>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField
                    id="outlined-secondary"
                    label="Twój nick"
                    variant="outlined"
                    color="secondary"
                    onChange={handleChange}
                />
                <div className={classes.wrapper}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={buttonClassname}
                        disabled={loading}
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
        </div>
    );
}
