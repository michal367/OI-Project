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
import { useSocket } from "../../services/SocketService";
import { lazareTheme } from "../../util/theme/customTheme";

export function QuizStatsView() {
    const store = useContext(StoreContext);
    const [selectedQuizStats, setQuizStats] = useState<ScheduledQuiz | undefined>(
        store.scheduledQuizzes.length > 0 ? store.scheduledQuizzes[0] : undefined
    );

    const theme = useTheme();
    const { sendJsonMessage } = useSocket();

    useEffect(() => {
        setQuizStats((prev) => prev && store.scheduledQuizzes.indexOf(prev) !== -1 ? prev : undefined);
    }, [store.scheduledQuizzes]);

    const classes = makeStyles({
        root: {
            ...lazareTheme.root,
        },
        content: {
            ...lazareTheme.fullWidthWrapper,
            display: "grid",
            gridTemplateColumns: "400px 1fr",
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
            marginRight: "20px",
            maxWidth: 288,
        }
    })();

    const handleQuiz = (quizIndex: number) => {
        setQuizStats(store.scheduledQuizzes[quizIndex]);
    };

    const handleDeleteStats = (quizIndex: number) => {
        let statsToBeDeleted = store.scheduledQuizzes[quizIndex];
        store.scheduledQuizzes = store.scheduledQuizzes.filter(storeQuiz => storeQuiz.id !== statsToBeDeleted.id);
    }

    const handleEnded = (quizIndex: number) => {
        let scheduledQuizzes = store.scheduledQuizzes;
        scheduledQuizzes[quizIndex].inProgress = false;
        store.scheduledQuizzes = scheduledQuizzes;
    }

    const handleShowResults = () => {
        let tmpQuizzes = store.scheduledQuizzes;
        tmpQuizzes.forEach(
            (scheduledQuiz: ScheduledQuiz) => {
                if (scheduledQuiz === selectedQuizStats) {
                    scheduledQuiz.alreadyShowedResults = true;

                    const payload: ShowAnswersPayload = {
                        event: 'show_answers',
                        data: {
                            quizID: scheduledQuiz?.quiz?.id ?? ""
                        }
                    }
                    sendJsonMessage(payload);
                }
            }
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
        <div className={classes.root}>
            <div className={classes.content}>
                <Paper variant="outlined" square className={classes.quizColumn}>
                    <List component="nav">
                        {store.scheduledQuizzes.map((quizStats : ScheduledQuiz, i) => {
                            return (
                                <StatsListItem
                                    index={i}
                                    isSelected={quizStats.id === selectedQuizStats?.id}
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
                                totalSelected={selectedQuizStats.studentIDs.length}
                            />)
                        })
                    }
                </Paper>

                    <ImportExport onImport={onImport} objectToExport={store.scheduledQuizzes} fileName="scheduledQuizzes" />

                <Fab
                    variant="extended"
                    color="secondary"
                    className={classes.shareFab + " " + classes.showButton}
                    onClick={() => handleShowResults()}
                    disabled={!selectedQuizStats}
                >
                    {selectedQuizStats?.alreadyShowedResults ? (
                        <><DoneIcon className={classes.extendedIcon} />Wyślij odpowiedzi ponownie</>
                    ) : (
                        <><SendIcon className={classes.extendedIcon} />Wyślij poprawne odpowiedzi</>
                    )}
                </Fab>
            </div>

        </div >
    );
}

