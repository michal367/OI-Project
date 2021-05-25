import {
    Paper,
    List,
    Fab
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../services/StoreService";
import { green } from "@material-ui/core/colors";
import DoneIcon from '@material-ui/icons/Done';
import { QuestionBlock } from "./QuestionBlock";
import { StatsListItem } from "./StatsListItem";
import { ImportExport } from "../importExport/ImportExport";

export function QuizStatsView() {
    const store = useContext(StoreContext);
    const [selectedQuizStats, setQuizStats] = useState<ScheduledQuiz | undefined>(
        store.scheduledQuizzes.length > 0 ? store.scheduledQuizzes[0] : undefined
    );

    useEffect(() => {
        setQuizStats((prev) => prev && store.scheduledQuizzes.indexOf(prev) !== -1 ? prev : undefined);
    }, [store.scheduledQuizzes]);

    const theme = useTheme();
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
        setQuizStats(store.scheduledQuizzes[quizIndex]);
    };

    // const refreshClock = useCallback((timeToWait) => {
    //     if (timeToWait - Date.now() < 0) {
    //         if (timerWait)
    //             clearTimeout(timerWait);
    //         setClock(0);
    //     } else
    //         setClock(timeToWait - Date.now());
    // }, [timerWait])

    // useEffect(() => {
    //     if (store.sendQuiz.timeToEnd - Date.now() > 0 && !timerWait) {
    //         setClock(store.sendQuiz.timeToEnd - Date.now());
    //         setTimerWait(setInterval(() => { refreshClock(store.sendQuiz.timeToEnd) }, 1000));
    //     }
    // }, [store.sendQuiz.timeToEnd, refreshClock, timerWait, store])


    const handleDeleteStats = (quizIndex: number) => {
        let statsToBeDeleted = store.scheduledQuizzes[quizIndex];
        store.scheduledQuizzes = store.scheduledQuizzes.filter(storeQuiz => storeQuiz !== statsToBeDeleted);
    }

    const handleEnded = (quizIndex: number) => {
        let scheduledQuizzes = store.scheduledQuizzes;
        scheduledQuizzes[quizIndex].inProgress = false;
        store.scheduledQuizzes = scheduledQuizzes;
    }

    const handleShowResults = () => {
        let tmpQuizzes = store.scheduledQuizzes;
        tmpQuizzes.forEach(
            (element: ScheduledQuiz) => (element === selectedQuizStats) ? (element.alreadyShowedResults = true) : (null)
        )
        store.scheduledQuizzes = tmpQuizzes;
    }

    const onImport = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result != null) {
            let jsonString = e.target.result as string;
            store.scheduledQuizzes = [...store.scheduledQuizzes, ...JSON.parse(jsonString)];
        }
    }

    return (
        <>
            <div className={classes.root}>
                <Paper variant="outlined" square className={classes.quizColumn}>
                    <List component="nav">
                        {store.scheduledQuizzes.map((quizStats, i) => {
                            return (
                                <StatsListItem
                                    index={i}
                                    isSelected={quizStats === selectedQuizStats}
                                    onSelect={() => handleQuiz(i)}
                                    onDelete={() => handleDeleteStats(i)}
                                    onEnded={() => handleEnded(i)}
                                    timeToEnd={quizStats.timeToEnd ?? 0}
                                    inProgress={!!quizStats.inProgress} // !! changes (boolean | undefined) to boolean
                                    title={quizStats.quiz?.title ?? ""}
                                />
                            )
                        }
                        )}
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

                    <ImportExport onImport={onImport} objectToExport={store.scheduledQuizzes} fileName="scheduledQuizzes" />

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

