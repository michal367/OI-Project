import { useContext, useState } from "react";
import { Fab, CircularProgress, TextField } from "@material-ui/core";
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


export function CreateSessionView() {
    const store = useContext(StoreContext);
    const history = useHistory();
    const theme = useTheme();
    const backEnd = useBackEnd();
    const { sendJsonMessage, socketEmiter } = useSocket();
    const [sessionName, setSessionName] = useState(""); 
    const [name, setName] = useState(""); 
    const [surname, setSurname] = useState(""); 
    const handleSessionNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setSessionName(event.target.value);
    }
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setName(event.target.value);
    }
    const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setSurname(event.target.value);
    }
    const classes = makeStyles({
        rootOfRoots:{
            background: theme.palette.secondary.light,
            gap: "50px",
            minHeight: "100vh",
            alignItems: "center",
            position: "absolute",
            width: "100%",
            top: 0,
            zIndex: -1,
            paddingTop: 75,
            paddingBottom: "10px",
        },
        sessionNameField:{
            top:100,
            left:312,
            position:"relative",
            width:"20%",
            fontWeight:"bold",
            backgroundColor:"white",
        },
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
            const handleCreate = (parsed: LectureCreateResponsePayload) =>{
                setSuccess(true);
                setLoading(false);
        
                store.sessionId = parsed.data.lectureID;
                store.sendQuizStep = 0;
                store.timeToNextQuiz = 0;
                store.link = parsed.data.lectureLink;
                history.push({
                    pathname: "lecturer/session",
                    state: { isOpen: true }
                });
                socketEmiter.off("lecture_created", handleCreate);
                console.log("lecture created", parsed);
            };
            socketEmiter.on("lecture_created", handleCreate);
            // there can be negative response - it is not handled yet
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
    };


    return (
        <div className={classes.rootOfRoots}>
        <TextField className={classes.sessionNameField} variant="outlined" 
                   fullWidth={true} label={"Imię"} value={name} 
                   onChange={handleNameChange}
                   />
        <TextField className={classes.sessionNameField} variant="outlined" 
                   fullWidth={true} label={"Nazwisko"} value={surname} 
                   onChange={handleSurnameChange}
                   />
        <TextField className={classes.sessionNameField} variant="outlined" 
                   fullWidth={true} label={"Nazwa sesji"} value={sessionName} 
                   onChange={handleSessionNameChange}
                   />
        
        <div className={classes.root}>
            <h1 className={classes.header}>Rozpocznij sesję</h1>
            <div className={classes.wrapper}>
                <Fab
                    aria-label="save"
                    color="primary"
                    className={buttonClassName}
                    onClick={handleButtonClick}
                    disabled={sessionName.length === 0 || name.length === 0 || surname.length === 0 }
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
    </div>
    );
}