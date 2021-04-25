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
    TextField,
    Checkbox,
    FormControlLabel,
} from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useBackEnd, useBackEndSocket } from "../../services/BackEndService";
import { StoreContext } from "../../services/StoreService";
import { getComparator, Order, stableSort } from "../../util/comparators";
import { QuizListView } from "./QuizListView";

// interface StudentListViewProps {
//     lecture?: Lecture
// }

// export interface StudentListRow extends Student {
//     orderIndex: number;
// }
function getSteps() {
    return [
        "Wybierz quiz do przesłania",
        "Wybierz czas na rozwiązanie quizu",
        "Zaznacz studentów",
        "Wyślij quiz",
    ];
}
export function SendQuizView() {
    const store = useContext(StoreContext);
    const theme = useTheme();
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
            width: "fit-content"
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
                return <QuizListView />;
            case 1:
                return (
                    <form className={classes.container} noValidate>
                        <TextField
                            disabled={checked}
                            id="time"
                            label="Czas na rozwiązanie"
                            type="time"
                            defaultValue={time}
                            onChange={handlePicker}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
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
                    </form>
                );
            case 2:
                return (
                    <Button
                        disabled
                        className={classes.button}
                        variant="contained"
                    >
                        Wybór losowy
                    </Button>
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
                                        (store.quizes[store.selectedQuiz] != undefined) ? store.quizes[store.selectedQuiz].title : ""
                                    }
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Ilość przeznaczonego czasu:"
                                    secondary={
                                        checked ? "nieograniczone" : time
                                    }
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Ilość przydzielonych studentów:"
                                    secondary={
                                        store.selectedStudents.length
                                    }
                                />
                            </ListItem>
                        </List>
                    </div>
                );
            default:
                return `Unknown step`;
        }
    };
    const [checked, setChecked] = React.useState(true);
    const [time, setTime] = React.useState('02:00');
    const handlePicker = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    const steps = getSteps();

    const handleNext = () => {
        store.sendQuizStep = store.sendQuizStep + 1;
    };

    const handleBack = () => {
        store.sendQuizStep = store.sendQuizStep - 1;
    };

    const handleReset = () => {
        store.sendQuizStep = 0;
        store.selectedStudents = [];
        store.selectedQuiz = -1;
    };

    const isStepReady = (step: number) => {
        switch (step) {
            case 0:
                return store.selectedQuiz < 0;
            case 1:
            case 3:
                return false;
            case 2:
                return store.selectedStudents.length === 0;
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
