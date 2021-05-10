/* Code adopted from: https://material-ui.com/components/tables/ */

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
    Typography,
    Button,
    Checkbox,
    FormControlLabel,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    TextField
} from "@material-ui/core";
import { useContext, useState, useEffect, ChangeEvent } from "react";
import { StoreContext } from "../../services/StoreService";
import { QuizListView } from "./QuizListView";
import { getRandomIndexes } from "../../util/random";

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
    const store = useContext(StoreContext);
    let [selectedStudents, toggleAllSelectedStudents, toggleRandomSelectedStudents] = props.students ?? [[], () => { }, () => { }];
    const studentList = props.studentList ?? [];
    const studentCount = studentList.length;
    const [students, setStudents] = useState<string[]>(selectedStudents);
    const [time, setTime] = useState<number>(store.sendQuiz.timeInMin ?? 0);
    const [quiz, setQuiz] = useState<boolean>(Boolean(store.sendQuiz.quiz));
    const [checked, setChecked] = useState<boolean>(!(store.sendQuiz.timeInMin));
    const [randomStudentsNumber, setRandomStudentsNumber] = useState<string>();

    useEffect(() => {
        if (props.students)
            [selectedStudents, toggleAllSelectedStudents] = props.students;
        setStudents(selectedStudents);
    }, [props.students]);

    useEffect(() => {
        if (store.sendQuiz.quiz)
            setQuiz(store.quizes.indexOf(store.sendQuiz.quiz) !== -1)
        else
            setQuiz(false);
    }, [store.quizes, store.sendQuiz.quiz]);

    const theme = useTheme();
    const setSelectedQuiz = (quiz: Quiz | undefined) => {
        store.sendQuiz.quiz = quiz;
        store.sendQuiz = store.sendQuiz;
        setQuiz(quiz !== undefined);
    }
    const setSelectedTime = (value: unknown) => {
        let tmpQuiz: ScheduledQuiz = store.sendQuiz;
        tmpQuiz.timeInMin = value as number;
        store.sendQuiz = tmpQuiz;
        setTime(store.sendQuiz.timeInMin ?? 0);
    }
    const handlePicker = (event: ChangeEvent<{ value: unknown }>) => {
        setSelectedTime(event.target.value);
    };
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
            flexWrap: "wrap",
            flexDirection: "column",
            alignItems: "center",
            width: "fit-content",
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
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
                return <QuizListView quiz={[store.sendQuiz.quiz, setSelectedQuiz]} />;
            case 1:
                return (
                    <FormControl className={classes.container}>
                        <InputLabel id="time-select">
                            Czas na wypełnienie
                        </InputLabel>
                        <Select
                            labelId="time-select"
                            className={classes.textField}
                            id="time-select"
                            value={time > 0 ? time : ""}
                            onChange={handlePicker}
                            disabled={checked}
                            autoFocus={!checked}
                        >
                            <MenuItem value={10}>10 min</MenuItem>
                            <MenuItem value={20}>20 min</MenuItem>
                            <MenuItem value={40}>40 min</MenuItem>
                            <MenuItem value={60}>1 h</MenuItem>
                            <MenuItem value={90}>1.5 h</MenuItem>
                            <MenuItem value={180}>3 h</MenuItem>
                        </Select>

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
                                        time > 0 ? time : "nieograniczone"
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
        let tmpQuiz: ScheduledQuiz = store.sendQuiz;
        delete tmpQuiz.timeInMin;
        store.sendQuiz = tmpQuiz;
        setTime(0);
    };
    const steps = getSteps();



    const handleNext = () => {
        if (store.sendQuizStep === steps.length - 1) {
            console.log("scheduled quiz", store.sendQuiz);
        }
        store.sendQuizStep = store.sendQuizStep + 1;
    };

    const handleBack = () => {
        store.sendQuizStep = store.sendQuizStep - 1;
    };

    const handleReset = () => {
        store.sendQuizStep = 0;
        setSelectedTime(undefined);
        setSelectedQuiz(undefined);
        changeSelectedStudents(true);
    };

    const isStepReady = (step: number) => {
        switch (step) {
            case 3:
                return false;
            case 0:
                return !quiz
            case 1:
                return !(time > 0 || checked)
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
                    <Button onClick={handleReset} className={classes.button}>
                        Wyślij nowy quiz.
                    </Button>
                </Paper>
            )}
        </Paper>
    );
}
