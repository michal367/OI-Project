import {
    makeStyles,
    useTheme,
    Button,
    Backdrop,
    CardContent,
    Card,
} from "@material-ui/core";
import { useState } from "react";
import QuizView from "../quizView/QuizView";
import SessionQuestionView from "../sendQuestionView/SessionQuestionView";
import SessionDetailsView from "../sessionDetailsView/SessionDetailsView";
import { ReactionName } from "../sessionReactionView/ReactionItem";
import SessionReactionView from "../sessionReactionView/SessionReactionView";
import FeedbackView from "../feedbackView/FeedbackView";
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
            flexShrink: 4,
            flexGrow: 1,
            height: "150%",
            minHeight: 100,
            padding: "10px 10px",
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
        questionBody:{
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
            minWidth: "80%",
            minHeight: "90%",
            width: 300,
            height: 400,
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
                <FeedbackView/>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleToggle}
                >
                    Solve quiz
                </Button>
            </div>
            <div className={classes.questionBody}>
                <SessionQuestionView/>
            </div>
            <div className={classes.footer}>
                <SessionReactionView onReaction={handleReaction} />
            </div>
            <Backdrop
                className={classes.backdrop}
                open={open}
            >

                <Card className={classes.overlay}>
                    <CardContent>
                        <QuizView />
                        <Button onClick={handleClose}>close</Button>
                    </CardContent>
                </Card>
            </Backdrop>
        </div>
    );
}
