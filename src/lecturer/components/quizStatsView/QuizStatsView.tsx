import {
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Fab
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BackspaceIcon from '@material-ui/icons/Backspace';
import { makeStyles, useTheme } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../services/StoreService";
import { green } from "@material-ui/core/colors";
import DoneIcon from '@material-ui/icons/Done';
import { QuestionBlock } from "./QuestionBlock";
import { ImportExport } from "../importExport/ImportExport";

export function QuizStatsView() {
    const store = useContext(StoreContext);
    const [selectedQuizStats, setQuizStats] = React.useState<ScheduledQuiz | undefined>(
        store.endedQuizzes.length > 0 ? store.endedQuizzes[0] : undefined
    );

    const theme = useTheme();

    useEffect(() => {
        setQuizStats((prev) => prev && store.endedQuizzes.indexOf(prev) !== -1 ? prev : undefined);
    }, [store.endedQuizzes]);

    const classes = makeStyles({
        root: {
            background: theme.palette.primary.light,
            maxHeight: "100vh",
            height: "100vh",
            display: "grid",
            gridTemplateColumns: "400px 1fr",
            position: "absolute",
            width: "100%",
            top: 0,
            zIndex: -1,
            padding: "0 10px",
            paddingTop: 75,
            paddingBottom: 100,
            gap: 15,
        },
        quizColumn: {
            height: "80vh",
            overflow: "auto",
            width: "100%",
            marginBottom: "auto",
            display: "flex",
            flexDirection: "column",
            "& Mui-expanded": { marginBottom: 0 },
            "& li .MuiListItemSecondaryAction-root": {
                display: "none",
            },
            "& li:hover .MuiListItemSecondaryAction-root": {
                display: "block",
            },
        },
        statsColumn: {
            height: "80vh",
            overflow: "auto",
            width: "100%",
            marginBottom: "auto",
            display: "grid",
            gap: 20,
            padding: 20,
            gridTemplateColumns: "1fr 1fr",
            gridAutoRows: "calc(50% - 10px)",
            "&:after": {
                gridColumn: "span 2",
                height: "10px",
                marginTop: "-10px",
                content: '""',
            },
        },
        quizStatRow: {
            paddingTop: 16,
            paddingBottom: 16,
        },
        answer: {
            width: "100%",
            height: "100%",
            position: "relative",
        },
        answerChild: {
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
        showButton: (selectedQuizStats?.alreadyShowedResults ? {
            background: green[500],
            "&:hover": {
                background: green[700],
            }
        } : {}),
        action: {
            position: "absolute",
            bottom: 20,
            left: 20,
            display: "flex",
            gap: 20,
        },
        shareFab: {
            height: 55,
            fontSize: 16,
            marginRight: "20px"
        }
    })();

    const handleQuiz = (quizIndex: number) => {
        setQuizStats(store.endedQuizzes[quizIndex]);
    };

    const handleDeleteStats = (quizIndex: number) => {
        let statsToBeDeleted = store.endedQuizzes[quizIndex];
        store.endedQuizzes = store.endedQuizzes.filter(storeQuiz => storeQuiz !== statsToBeDeleted);
    }

    const handleShowResults = () => {
        let tmpQuizzes = store.endedQuizzes;
        tmpQuizzes.forEach(
            (element: ScheduledQuiz) => (element === selectedQuizStats) ? (element.alreadyShowedResults = true) : (null)
        )
        store.endedQuizzes = tmpQuizzes;
    }

    const onImport = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result != null) {
            let jsonString = e.target.result as string;
            store.endedQuizzes = [...store.endedQuizzes, ...JSON.parse(jsonString)];
        }
    }

    return (
        <>
            <div className={classes.root}>
                <Paper variant="outlined" square className={classes.quizColumn}>
                    <List component="nav">
                        {store.endedQuizzes.map((quizStats, i) => (
                            <ListItem
                                button
                                selected={quizStats === selectedQuizStats}
                                onClick={(event) => handleQuiz(i)}
                                className={classes.quizStatRow}
                            >
                                <ListItemIcon>
                                    {quizStats === selectedQuizStats && (
                                        <AssignmentIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={quizStats.quiz?.title} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={(event) => handleDeleteStats(i)}>
                                        <BackspaceIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
                <Paper
                    variant="outlined"
                    square
                    className={classes.statsColumn}
                >
                    {selectedQuizStats?.questionStats.sort((a, b) => a.index - b.index)
                        .map((questionStat, j) => {
                            let question = selectedQuizStats?.quiz?.questions[j];
                            return question && (<QuestionBlock
                                question={question}
                                questionStat={questionStat}
                                totalSelected={selectedQuizStats.students.length}
                            />)
                        })
                    }
                </Paper>
                <div className={classes.action}>

                    <ImportExport onImport={onImport} objectToExport={store.endedQuizzes} fileName="endedQuizzes.json" />

                    <Fab
                        variant="extended"
                        color="secondary"
                        className={classes.shareFab + " " + classes.showButton}
                        onClick={(event) => handleShowResults()}
                    >
                        {
                            selectedQuizStats?.alreadyShowedResults ?
                                (<><DoneIcon className={classes.extendedIcon} />Pokaż ponownie</>)
                                : (<><SendIcon className={classes.extendedIcon} />Pokaż wyniki</>)
                        }
                    </Fab>
                </div>
            </div>
        </>
    );
}

