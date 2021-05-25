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
    TextField
} from "@material-ui/core";
import { useContext, useState, useEffect, ChangeEvent } from "react";
import { StoreContext } from "../../services/StoreService";
import { QuizListView } from "./QuizListView";
import { getRandomIndexes } from "../../util/random";
import { useCallback } from "react";
import { formatTime } from "../../util/time";

interface SendQuizViewProps {
    studentList?: Student[];
    students?: [string[], (checked: boolean) => void, (randomNumbers: Array<number>) => void];
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
    const store = useContext(StoreContext);
    let [selectedStudents, toggleAllSelectedStudents, toggleRandomSelectedStudents] = props.students ?? [[], () => { }, () => { }];
    const studentList = props.studentList ?? [];
    const studentCount = studentList.length;
    const [students, setStudents] = useState<string[]>(selectedStudents);
    const [minutes, setMinutes] = useState<number>(store.sendQuiz.timeInSec !== undefined ? Math.floor(store.sendQuiz.timeInSec / 60) : 1);
    const [seconds, setSeconds] = useState<number>(store.sendQuiz.timeInSec ? Math.floor(store.sendQuiz.timeInSec) % 60 : 0);
    const [time, setTime] = useState<number>(store.sendQuiz.timeInSec ?? 0);
    const [quiz, setQuiz] = useState<boolean>(Boolean(store.sendQuiz.quiz));
    const [checked, setChecked] = useState<boolean>(time === 0);
    const [randomStudentsNumber, setRandomStudentsNumber] = useState<string>();
    const [timerWait, setTimerWait] = useState<NodeJS.Timeout>();
    const [clock, setClock] = useState(0);


    useEffect(() => {
        if (props.students)
            [selectedStudents, toggleAllSelectedStudents] = props.students;
        setStudents(selectedStudents);
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
        sendQuiz.timeInSec = timeInSeconds;
        store.sendQuiz = sendQuiz;
        setTime(store.sendQuiz.timeInSec ?? 0);
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
        details: {
            padding: 20,
            height: "100%",
            maxHeight: "100%",
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
                                    disabled={checked}
                                    autoFocus={!checked}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Sekundy"
                                    type="number"
                                    value={seconds.toString()}
                                    onChange={handleSecondsChange}
                                    disabled={checked}
                                    autoFocus={!checked}
                                />
                            </Grid>
                        </Grid>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChange}
                                    name="checked"
                                    color="primary"
                                />
                            }
                            label="Bez limitu"
                        />
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
        setChecked(event.target.checked);
        if (event.target.checked == true) {
            let tmpQuiz: ScheduledQuiz = store.sendQuiz;
            delete tmpQuiz.timeInSec;
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
            console.log("scheduled quiz", store.sendQuiz);
            let timeToWait = Date.now() + 1000 * (time ?? 0);
            store.timeToNextQuiz = timeToWait;
            setClock(timeToWait - Date.now());
            setTimerWait(setInterval(() => { refreshClock(timeToWait) }, 1000));
        }
        store.sendQuizStep = store.sendQuizStep + 1;
    }, [refreshClock, steps.length, store, time]);

    useEffect(() => {
        return () => {
            if (timerWait)
                clearTimeout(timerWait);
        }
    }, [timerWait])

    useEffect(() => {
        if (store.timeToNextQuiz - Date.now() > 0 && !timerWait) {
            setClock(store.timeToNextQuiz - Date.now());
            setTimerWait(setInterval(() => { refreshClock(store.timeToNextQuiz) }, 1000));
            store.sendQuizStep = 4;
        }
    }, [store.timeToNextQuiz, refreshClock, timerWait, store])


    const handleBack = () => {
        store.sendQuizStep = store.sendQuizStep - 1;
    };

    const handleReset = () => {
        store.sendQuizStep = 0;
        setSelectedTime(undefined, undefined);
        setMinutes(1);
        setSeconds(0);
        setSelectedQuiz(undefined);
        changeSelectedStudents(true);
    };

    const isStepReady = (step: number) => {
        switch (step) {
            case 3:
                return false;
            case 0:
                return !quiz;
            case 1:
                return !(time > 0 || checked);
            case 2:
                return students.length === 0;
            default:
                return true;
        }
    };

    return (
        <Paper className={classes.details} variant="outlined" square>
            <Stepper
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
                    <Button onClick={handleReset} className={classes.button} disabled={clock > 0}>
                        {clock > 0 ? "Do końca quizu: " + formatTime(clock) : "Wyślij nowy quiz."}
                    </Button>
                </Paper>
            )}
        </Paper>
    );
}
