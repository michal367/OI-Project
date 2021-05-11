import {
    makeStyles,
    useTheme,
    Button,
    Backdrop,
    Card,
} from "@material-ui/core";
import { useState } from "react";
import QuizView from "../quizView/QuizView";
import SessionQuestionView from "../sendQuestionView/SessionQuestionView";
import SessionDetailsView from "../sessionDetailsView/SessionDetailsView";
import SessionReactionView from "../sessionReactionView/SessionReactionView";
import FeedbackView from "../feedbackView/FeedbackView";
import { ReactionName } from "../../util/reactionsEnum";
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
            zIndex: theme.zIndex.drawer + 1,
            color: "#fff",
        },
        header: {
            width: "100%",
            padding: "10px 10px",
        },
        body: {
            width: "100%",
            display: "flex",
            gap: 10,
            padding: "0 10px",
            flexGrow: 1,
        },
        questionBody: {
            width: "100%",
            display: "flex",
            gap: 10,
            padding: "0 10px",
        },
        footer: {
            width: "100%",
            padding: "10px 10px",
        },
        overlay: {
            minWidth: "95%",
            minHeight: "95%",
            width: 300,
            height: 400,
            padding: "5px 10px",
            display: "flex",
            flexDirection: "column"
        }
    })();

    const [open, setOpen] = useState(false);

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
                <FeedbackView />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleToggle}
                >
                    Rozwiąż quiz
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
                        <p>00:00</p>
                        <Button onClick={handleClose} style={{ marginLeft: "auto", padding: "6px 0px" }}>Zamknij</Button>
                    </div>
                    <QuizView />
                </Card>
            </Backdrop>
        </div>
    );
}
