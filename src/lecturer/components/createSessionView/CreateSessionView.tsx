import { useContext, useState } from "react";
import { Fab, CircularProgress } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CheckIcon from "@material-ui/icons/Check";
import clsx from "clsx";
import "fontsource-roboto";
import { useBackEnd } from "../../services/BackEndService";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../../services/StoreService";
import { useSocket } from "../../services/SocketService";


export function CreateSessionView(props: { update: () => void }) {
    const store = useContext(StoreContext);
    const history = useHistory();
    const theme = useTheme();
    const { sendJsonMessage, socketEmiter } = useSocket();

    const classes = makeStyles({
        root: {
            background: theme.palette.secondary.light,
            gap: "50px",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            width: "100%",
            top: 0,
            zIndex: -1,
            paddingTop: 75,
            paddingBottom: "10px",
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
    const buttonClassName = clsx({
        [classes.sessionBtn]: 1,
        [classes.buttonSuccess]: success,
    });

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            const handleCreate = (parsed: LectureCreateResponsePayload) => {
                setSuccess(true);
                setLoading(false);
                store.lectureID = parsed.data.lectureID;
                store.sendQuizStep = 0;
                store.timeToNextQuiz = 0;
                store.link = parsed.data.lectureLink;

                props.update();
                socketEmiter.off("lecture_created", handleCreate);
                console.log("lecture created", parsed);
            };
            socketEmiter.on("lecture_created", handleCreate);
            // there can be negative response - it is not handled yet
            const payload: LectureCreateRequestPayload = {
                event: "create_lecture",
                data: {
                    tutor: "Apple I-Dzik"
                }
            }
            sendJsonMessage(payload);
        }
    };


    return (
        <div className={classes.root}>
            <h1 className={classes.header}>Rozpocznij sesję</h1>
            <div className={classes.wrapper}>
                <Fab
                    aria-label="save"
                    color="primary"
                    className={buttonClassName}
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

            </div>
        </div>
    );
}