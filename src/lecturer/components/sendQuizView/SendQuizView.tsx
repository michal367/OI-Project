import {
    makeStyles,
    useTheme,
    Paper,
    List,
    ListItem,
    ListItemText,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Grid,
    Typography,
    Button,
    Checkbox,
    FormControlLabel,
    FormControl,
    TextField,
    Card,
    Divider
} from "@material-ui/core";
import { useContext, useState, useEffect, ChangeEvent, useCallback } from "react";
import { StoreContext } from "../../services/StoreService";
import { QuizListView } from "./QuizListView";
import { getRandomIndexes } from "../../../common/util/random";
import { formatTime } from "../../../common/util/time";
import TimerIcon from '@material-ui/icons/Timer';
import { useSocket } from "../../services/SocketService";
import { v4 } from "uuid";

interface SendQuizViewProps {
    studentList?: Student[];
    students?: [string[], (checked: boolean) => void, (randomNumbers: Array<number>) => void];
    minimal?: boolean;
    setMinimal?: React.Dispatch<React.SetStateAction<boolean>>;
}

function getSteps() {
    return [
        "Wybierz quiz do przesłania",
        "Wybierz czas na rozwiązanie quizu",
        "Zaznacz studentów",
        "Wyślij quiz",
    ];
}



export function SendQuizView(props: SendQuizViewProps) {
    const theme = useTheme();
    const { sendJsonMessage, socketEmiter } = useSocket();
    const store = useContext(StoreContext);
    let [selectedStudents, toggleAllSelectedStudents, toggleRandomSelectedStudents] = props.students ?? [[], () => { }, () => { }];
    const studentList = props.studentList ?? [];
    const studentCount = studentList.length;
    const [students, setStudents] = useState<string[]>(selectedStudents);
    const [minutes, setMinutes] = useState<number>(store.sendQuiz.timeSeconds !== undefined ? Math.floor(store.sendQuiz.timeSeconds / 60) : 1);
    const [seconds, setSeconds] = useState<number>(store.sendQuiz.timeSeconds ? Math.floor(store.sendQuiz.timeSeconds) % 60 : 0);
    const [time, setTime] = useState<number>(store.sendQuiz.timeSeconds ?? 60);
    const [quiz, setQuiz] = useState<boolean>(Boolean(store.sendQuiz.quiz));
    const [unlimitedTime, setUnlimitedTime] = useState<boolean>(false);
    const [randomStudentsNumber, setRandomStudentsNumber] = useState<string>();
    const [timerWait, setTimerWait] = useState<NodeJS.Timeout>();
    const [clock, setClock] = useState(0);
    const [minimal, setMinimal] = useState(props.minimal);
    
    useEffect(() => setMinimal(props.minimal));

    useEffect(() => {
        if (props.students) {
            let [students] = props.students;
            setStudents(students);
        }
    }, [props.students]);


    useEffect(() => {
        if (store.sendQuiz.quiz)
            setQuiz(store.quizzes.indexOf(store.sendQuiz.quiz) !== -1)
        else
            setQuiz(false);
    }, [store.quizzes, store.sendQuiz.quiz]);

    const setSelectedQuiz = (quiz: FrontQuiz | undefined) => {
        let sendQuiz = store.sendQuiz;
        sendQuiz.quiz = quiz;
        store.sendQuiz = sendQuiz;
        setQuiz(quiz !== undefined);
    }

    const setSelectedTime = (minutes: unknown, seconds: unknown) => {
        let minutesNumber: number = Number(minutes);
        let secondsNumber: number = Number(seconds);
        setMinutes(minutesNumber);
        setSeconds(secondsNumber);
        let timeInSeconds = 60 * minutesNumber + secondsNumber;
        let sendQuiz = store.sendQuiz;
        sendQuiz.timeSeconds = timeInSeconds;
        store.sendQuiz = sendQuiz;
        setTime(store.sendQuiz.timeSeconds ?? 0);
    }
    const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
        let numberStr = e.target.value.replace(/[^0-9]/g, '');
        setSelectedTime(numberStr, seconds);
    }
    const handleSecondsChange = (e: ChangeEvent<HTMLInputElement>) => {
        let numberStr = e.target.value.replace(/[^0-9]/g, '');
        setSelectedTime(minutes, numberStr);
    }

    const handleRandomStudentsNumber = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        let numberStr = e.target.value.replace(/[^0-9]/g, '');
        setRandomStudentsNumber(numberStr);
    };
    const changeSelectedStudents = (isFull: boolean) => () => {
        toggleAllSelectedStudents(isFull);
    }
    const drawSelectedStudents = () => {
        let number = Number(randomStudentsNumber);
        if (!isNaN(number)) {
            if (number > 0 && number < studentCount) {
                let randomStudents = getRandomIndexes(studentCount, number);
                toggleRandomSelectedStudents(randomStudents);
            }
            else if (number >= studentCount) {
                toggleAllSelectedStudents(false);
            }
            else if (number === 0) {
                toggleAllSelectedStudents(true);
            }
        }
    }
    const classes = makeStyles({
        root: {
            width: "100%",
            padding: 1,
            height: "93%",
            ...(() => {
                if (minimal) return { maxHeight: 220 }
                return { maxHeight: "100vh" }
            })(),
        },
        container: {
            display: "flex",
            flexDirection: "column",
            width: "fit-content",
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
            "& div": {
                paddingLeft: "10px"
            }
        },
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        actionsContainer: {
            marginBottom: theme.spacing(2),
        },
        resetContainer: {
            padding: theme.spacing(3),
        },
        stepper: {},
        step: {
            maxHeight: "50vh",
        },
        minimalContent: {
            height: "100%",
            width: "100%",
            backgroundColor: "white",
            fontSize: 24,
            "& .MuiButton-label": {
                display: "flex",
                gap: 10,
            },
            "& .MuiSvgIcon-root": {
                marginRight: 10,
                marginTop: 2,
            },
        },
    })();
    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <QuizListView selected={store.sendQuiz.quiz} onChange={setSelectedQuiz} />;
            case 1:
                return (
                    <FormControl className={classes.container}>
                        <Grid container spacing={3} style={{ margin: "0 0 5px 0" }}>
                            <Grid item xs={3} style={{ paddingLeft: "0" }}>
                                <TextField
                                    label="Minuty"
                                    type="number"
                                    value={minutes.toString()}
                                    onChange={handleMinutesChange}
                                    inputProps={{ min: 0 }}
                                    disabled={unlimitedTime}
                                    autoFocus={!unlimitedTime}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Sekundy"
                                    type="number"
                                    value={seconds.toString()}
                                    onChange={handleSecondsChange}
                                    inputProps={{ min: 0 }}
                                    disabled={unlimitedTime}
                                    autoFocus={!unlimitedTime}
                                />
                            </Grid>
                        </Grid>
                        {/*
                        //TODO: implement unlimited time quiz
                        Not supported 
                        
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={unlimitedTime}
                                    onChange={handleChange}
                                    name="checked"
                                    color="primary"
                                />
                            }
                            label="Bez limitu"
                        />
                         */}
                        
                    </FormControl>
                );
            case 2:
                return (
                    <>
                        <Button
                            className={classes.button}
                            variant="contained"
                            onClick={drawSelectedStudents}
                            disabled={!randomStudentsNumber || Number(randomStudentsNumber) === 0}
                        >
                            Wybór losowy
                        </Button>
                        <TextField
                            label="Liczba"
                            value={randomStudentsNumber}
                            onChange={handleRandomStudentsNumber}
                            style={{ width: "75px" }} />
                        <br />

                        <Button
                            className={classes.button}
                            variant="contained"
                            onClick={changeSelectedStudents(students.length === studentCount)}
                        >
                            {students.length === studentCount ? 'Odznacz wszystkich' : 'Zaznacz wszystkich'}
                        </Button>
                    </>
                );
            case 3:
                return (
                    <div>
                        <Typography>
                            {`Upewnij się, że wszystko jest prawidłowo ustawione i wyślij quiz:`}
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Nazwa przydzielonego quizu:"
                                    secondary={
                                        (store.sendQuiz.quiz ?? { title: "" }).title
                                    }
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Ilość przeznaczonego czasu:"
                                    secondary={
                                        time > 0 ? formatTime(time * 1000) : "nieograniczone"
                                    }
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Ilość przydzielonych studentów:"
                                    secondary={students.length}
                                />
                            </ListItem>
                        </List>
                    </div>
                );
            default:
                return `Unknown step`;
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUnlimitedTime(event.target.checked);
        if (event.target.checked === true) {
            let tmpQuiz: ScheduledQuiz = store.sendQuiz;
            tmpQuiz.timeSeconds = 0;
            store.sendQuiz = tmpQuiz;
            setTime(0);
        }
        else {
            setSelectedTime(minutes, seconds);
        }
    };
    const steps = getSteps();


    const refreshClock = useCallback((timeToWait) => {
        if (timeToWait - Date.now() < 0) {
            if (timerWait)
                clearTimeout(timerWait);
            setClock(0);
        } else
            setClock(timeToWait - Date.now());
    }, [timerWait])

    const handleNext = useCallback(() => {
        if (store.sendQuizStep === steps.length - 1) {
            let newScheduledQuiz = store.sendQuiz;
            newScheduledQuiz.questionStats = [];
            newScheduledQuiz.quiz?.questions.forEach((question, index) => {
                let qStat: QuestionStat = {
                    index,
                    options: []
                }
                if ((question.options ?? []).length > 0)
                    question.options?.forEach((answer, index) => {
                        let aStat: AnswerStat = {
                            index,
                            numberOfTimesSelected: 0,
                        }
                        qStat.options.push(aStat);
                    });
                newScheduledQuiz.questionStats.push(qStat);
            })
            console.log("scheduled quiz", store.sendQuiz);
            let timeToWait = Date.now() + 1000 * (time ?? 0);
            newScheduledQuiz.timeToEnd = timeToWait;
            setClock(timeToWait - Date.now());
            let scheduledQuizzes = store.scheduledQuizzes;
            scheduledQuizzes.push(JSON.parse(JSON.stringify(newScheduledQuiz)));
            store.scheduledQuizzes = JSON.parse(JSON.stringify(scheduledQuizzes));
            setTimerWait(setInterval(() => { refreshClock(newScheduledQuiz.timeToEnd) }, 1000));

            let payload: QuizRequestPayload = {
                event: "send_quiz",
                data: {
                    quizID: store.sendQuiz.id,
                    studentIDs: store.sendQuiz.studentIDs,
                    timeSeconds: (time ?? 0),
                    questions: store.sendQuiz.quiz
                }
            };
            sendJsonMessage(payload);
            console.log(payload);
        }
        store.sendQuizStep = store.sendQuizStep + 1;
    }, [refreshClock, steps.length, store, time, sendJsonMessage]);

    useEffect(() => {
        return () => {
            if (timerWait)
                clearTimeout(timerWait);
        }
    }, [timerWait])

    useEffect(() => {
        let timeToEnd = store.sendQuiz.timeToEnd ?? 0;
        if (timeToEnd > 0 && timeToEnd - Date.now() > 0 && !timerWait) {
            setClock(store.sendQuiz.timeToEnd ?? 0 - Date.now());
            setTimerWait(setInterval(() => { refreshClock(store.sendQuiz.timeToEnd) }, 1000));
            store.sendQuizStep = 4;
        }
    }, [store.sendQuiz.timeToEnd, refreshClock, timerWait, store])


    const handleBack = () => {
        store.sendQuizStep = store.sendQuizStep - 1;
    };

    const handleReset = () => {
        if (clock > 0) return;
        store.sendQuizStep = 0;
        setMinutes(1);
        setSeconds(0);
        store.sendQuiz = {
            id: v4(),
            studentIDs: [],
            questionStats: [],
            alreadyShowedResults: false,
            timeSeconds: 0,
            inProgress: true,
            timeToEnd: 0,
        }
    }

    const handleSendAnswers = () => {
        const payload: ShowAnswersPayload = {
            event: 'show_answers',
            data: {
                quizID: store.sendQuiz.id ?? "",
            }
        }
        sendJsonMessage(payload);
    };
    const isStepReady = useCallback((step: number) => {
        switch (step) {
            case 3:
                return false;
            case 0:
                return !quiz;
            case 1:
                return !(time > 0 || unlimitedTime);
            case 2:
                return students.length === 0;
            default:
                return true;
        }
    }, [quiz, time, unlimitedTime, students]);

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                if (!isStepReady(store.sendQuizStep)) {
                    handleNext();
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [store, isStepReady, handleNext]);

    const updateMinimal = () => {
        if (props.setMinimal)
            props!.setMinimal(prev => !prev)
        setMinimal(prev => !prev);
    }

    return (
        <Card className={classes.root} style={{ transition: "max-height 0.5s" }}>
            {minimal ?
                (<Button
                    variant="outlined"
                    color="secondary"
                    className={classes.minimalContent}
                    size="large"
                    onClick={() => props.setMinimal ? updateMinimal() : null}
                >
                    <span>{clock > 0 ? "Do końca quizu" : "Wyślij nowy quiz"}</span>
                    <Divider orientation="vertical" flexItem />
                    <span style={{ display: "inline-flex" }}>
                        <TimerIcon fontSize="large" />
                        {clock > 0 ? formatTime(clock) : "00:00:00"}
                    </span>
                </Button>) :
                (<><Stepper
                    activeStep={store.sendQuizStep}
                    orientation="vertical"
                    className={classes.stepper}
                >
                    {steps.map((label, index) => (
                        <Step key={label} className={classes.step}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                {getStepContent(index)}
                                <div className={classes.actionsContainer}>
                                    <div>
                                        <Button
                                            disabled={store.sendQuizStep === 0}
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Wstecz
                                        </Button>
                                        <Button
                                            disabled={isStepReady(
                                                store.sendQuizStep
                                            )}
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {store.sendQuizStep === steps.length - 1
                                                ? "Wyślij"
                                                : "Dalej"}
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                    {store.sendQuizStep === steps.length && (
                        <Paper square elevation={0} className={classes.resetContainer}>
                            <Typography>Quiz został wysłany.</Typography>
                            <Button onClick={handleSendAnswers} className={classes.button} disabled={clock > 0}>
                                {"Wyślij odpowiedzi"}
                            </Button>
                            <Button onClick={handleReset} className={classes.button} disabled={clock > 0}>
                                {clock > 0 ? "Do końca quizu: " + formatTime(clock) : "Wyślij nowy quiz"}
                            </Button>
                        </Paper>
                    )}
                </>)}
        </Card>
    );
}
