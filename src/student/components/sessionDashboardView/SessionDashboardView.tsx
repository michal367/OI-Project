import {
    makeStyles,
    useTheme,
    Button,
    Backdrop,
    Card,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import QuizView from "../quizView/QuizView";
import SessionQuestionView from "../sendQuestionView/SessionQuestionView";
import SessionDetailsView from "../sessionDetailsView/SessionDetailsView";
import SessionReactionView from "../sessionReactionView/SessionReactionView";
import FeedbackView from "../feedbackView/FeedbackView";
import { TimerClock } from "../timerClock/timerClock";
import { ReactionName } from "../../../common/util/reactions/enum";
import { StoreContext } from "../../services/StoreService";

export function SessionDashboardView() {
    const theme = useTheme();

    const classes = makeStyles({
        root: {
            background: theme.palette.primary.light,
            maxHeight: "100vh",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 100,
            color: "#fff",
        },
        header: {
            width: "100%",
            flexShrink: 4,
            flexGrow: 1,
            height: "150%",
            minHeight: 100,
            padding: "0px 10px",
        },
        body: {
            width: "100%",
            flexShrink: 2,
            flexGrow: 1,
            height: "100%",
            display: "flex",
            gap: 10,
            minHeight: 100,
            padding: "0 10px",
        },
        feedBackBody: {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
        },
        questionBody: {
            width: "100%",
            flexShrink: 2,
            flexGrow: 1,
            display: "flex",
            gap: 10,
            padding: "0 10px",
        },
        footer: {
            width: "100%",
            flexShrink: 4,
            flexGrow: 1,
            height: "100%",
            minHeight: 100,
            padding: "10px 10px",
        },
        overlay: {
            minWidth: "95%",
            minHeight: "95%",
            width: 300,
            height: 400,
            padding: "5px 10px",
            display: "flex",
            flexDirection: "column",
        },
        okButton: {
            color: "white",
            backgroundColor: "green",
        },
        wrapper: {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
        },
        quizButton: {
            "& span": {
                flexWrap: "wrap",
                gap:"10px"
            }
        }
    })();

    const [open, setOpen] = useState(false);
    const [disable, setDisable] = useState(false);

    const store = useContext(StoreContext);

    const handleBlock = () => {
        setDisable(true);
    }

    const handleEnable = () => {
        setDisable(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleReaction = (reaction: ReactionName) => {
        console.log(reaction);
    }

    return (
        <div className={classes.root}>

            <div className={classes.header}>
                <SessionDetailsView />
            </div>
            <div className={classes.body}>
                <div className={classes.wrapper}>
                    <div className={classes.feedBackBody}>
                        <FeedbackView />
                    </div>
                    <Button className={classes.okButton}>Ok</Button>
                </div>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleToggle}
                    disabled={disable}
                    className={classes.quizButton}
                >
                    Rozwiąż quiz

                    <TimerClock targetTime={new Date(store.quizStartTime + 1000 * store.quizTime)} onTimerEnd={handleBlock} />
                </Button>
            </div>
            <div className={classes.questionBody}>
                <SessionQuestionView />
            </div>
            <div className={classes.footer}>
                <SessionReactionView onReaction={handleReaction} />
            </div>
            <Backdrop
                className={classes.backdrop}
                open={open}
            >
                <Card className={classes.overlay}>
                    <div style={{ display: "flex" }}>
                        <p><TimerClock targetTime={new Date(store.quizStartTime + 1000 * store.quizTime)} onTimerEnd={handleClose} /></p>
                        <Button onClick={handleClose} style={{ marginLeft: "auto", padding: "6px 0px" }}>Zamknij</Button>
                    </div>
                    <QuizView handleBlock={handleBlock} handleEnable={handleEnable} handleClose={handleClose} />
                </Card>
            </Backdrop>
        </div>
    );
}
