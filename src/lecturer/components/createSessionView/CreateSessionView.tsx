import { useState } from "react";
import { Fab, CircularProgress } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CheckIcon from "@material-ui/icons/Check";
import clsx from "clsx";
import "fontsource-roboto";
import { useBackEnd, useBackEndSocket } from "../../services/backEnd/BackEndService";
import { sessionId } from "../app/App";

export function CreateSessionView() {
    const theme = useTheme();
    const backEnd = useBackEnd();
    const {
        sendJsonMessage
    } = useBackEndSocket();

    const classes = makeStyles({
        root: {
            background: theme.palette.secondary.light,
            gap: "50px",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        wrapper: {
            position: "relative",
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
            top: -6,
            left: -6,
            zIndex: 1,
        },
        sessionBtn: {
            width: "200px",
            height: "200px",
            fontSize: "150px",
            color: theme.palette.grey[50],
        },
        header: {
            fontSize: "90px",
            color: theme.palette.primary.dark,
        },
    })();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const buttonClassname = clsx({
        [classes.sessionBtn]: 1,
        [classes.buttonSuccess]: success,
    });
    const [lectureLink, setLectureLink] = useState("");

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            backEnd.createLecture().then((lecture) => {
                setSuccess(true);
                setLoading(false);
                console.log(lecture);

                sessionId.value = lecture.id;

                backEnd.getLectureLink(lecture.id).then(setLectureLink)

                sendJsonMessage({ event: "subscribe", data: { l_id: lecture.id } });
            })
        }
    };

    return (
        <div className={classes.root}>
            <h1 className={classes.header}>Rozpocznij sesję</h1>
            <div className={classes.wrapper}>
                <Fab
                    aria-label="save"
                    color="primary"
                    className={buttonClassname}
                    onClick={handleButtonClick}
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
                </Fab>
                {loading && (
                    <CircularProgress
                        size={210}
                        className={classes.fabProgress}
                    />
                )}
                <div><a target="_blank" rel="noreferrer" href={"http://localhost:3001/" + lectureLink}>LectureLink: http://localhost:3001/{lectureLink}</a></div>
            </div>
        </div>
    );
}
