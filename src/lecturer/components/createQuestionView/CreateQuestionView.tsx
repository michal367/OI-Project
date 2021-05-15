import {
    Button,
    ButtonGroup,
    Checkbox,
    CircularProgress,
    Fab,
    FormLabel,
    Grid,
    IconButton,
    makeStyles,
    TextField,
    useTheme,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import { Location } from 'history';
import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { StoreContext } from '../../services/StoreService';


export function CreateQuestionView() {
    const theme = useTheme();
    const store = useContext(StoreContext);
    const location: Location<Object> = useLocation();

    interface ValidationErrors {
        title: string;
        question: string;
        noAnswers: string;
        emptyAnswers: string[];
    }

    enum QuestionType {
        CLOSED,
        OPEN
    }

    let titleVal = "";
    let questionVal = "";
    let modeVal = QuestionType.CLOSED;
    let answersVal: string[] = [];
    let isCorrectVal: boolean[] = [];

    let data: any = location.state;
    if (data !== undefined) {
        let index = data.questionIndex;

        titleVal = store.questions[index].title;
        questionVal = store.questions[index].text;

        if (store.questions[index].options !== undefined) {
            modeVal = QuestionType.CLOSED;

            let options = store.questions[index].options;
            if (options !== undefined) {
                answersVal = options.map(({ text }) => text);
                isCorrectVal = options.map(({ isCorrect }) => isCorrect);
            }
        }
        else {
            modeVal = QuestionType.OPEN;
        }
    }

    const [title, setTitle] = useState<string>(titleVal);
    const [question, setQuestion] = useState<string>(questionVal);
    const [mode, setMode] = useState<number>(modeVal);
    const [answers, setAnswers] = useState<string[]>(answersVal);
    const [checked, setChecked] = useState<boolean[]>(isCorrectVal);
    const [errors, setErrors] = useState<ValidationErrors>({
        title: "",
        question: "",
        noAnswers: "",
        emptyAnswers: [],
    });

    const classes = makeStyles({
        root: {
            background: theme.palette.secondary.light,
            gap: "50px",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            width: "100%",
            top: 0,
            zIndex: -1,
            paddingTop: "55px",
            paddingBottom: "10px",
        },
        form: {
            width: 600,
            "& > *": {
                display: "block-inline",
                marginBottom: "15px",
                margin: theme.spacing(1),
            },

        },
        answerRow: {
            display: "flex",
            gap: 10,
            justifyContent: "space-between",
            flexWrap: "nowrap",
        },
        titleInput: {
            width: "100%",
        },
        textarea: {
            width: "100%",
        },
        checkbox: {
            width: 55.4,
            height: 55.4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        },
        right: {
            display: "flex",
            justifyContent: "flex-end",
            position: "relative",
        },
        errorColor: {
            color: red[500],
        },
        deleteBtn: {
            color: red[700],
            flexShrink: 0,
            width: 55.4,
        },
        buttonSuccess: {
            backgroundColor: green[500],
            "&:hover": {
                backgroundColor: green[700],
            },
        },
        fabProgress: {
            color: green[500],
            position: "absolute",
            top: "calc(50% - 19px)",
            right: "calc(100px - 19px)",
            zIndex: 1,
        },
        sessionBtn: {
            width: 200,
            marginLeft: "auto",
            padding: "15px",
            color: theme.palette.grey[50],
        },
        closedAnswers: {
            "& > *": {
                display: "block-inline",
                marginBottom: "15px",
                margin: theme.spacing(1),
            }
        },
        buttonActive: {
            backgroundColor: theme.palette.primary.main,
            color: "black",
            height: "50px",
            textTransform: "none",
            width: "100px",
            "&:hover": {
                backgroundColor: theme.palette.primary.dark,
            }
        },
        buttonNonactive: {
            height: "50px",
            width: "100px",
            textTransform: "none"
        }
    })();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const buttonClassname = clsx({
        [classes.sessionBtn]: 1,
        [classes.buttonSuccess]: success,
    });

    const handleTitleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value } = e.target;
        setTitle(value);
    };

    const handleQuestionChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value } = e.target;
        setQuestion(value);
    };

    const handleAnswerChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const { value } = e.target;
        const list = [...answers];
        list[index] = value;
        setAnswers(list);
    };

    const handleCheckboxChange = (e: ChangeEvent<any>, index: number) => {
        const value = e.target.checked;
        const listcb = [...checked];
        listcb[index] = value;
        setChecked(listcb);
    };

    const handleAddAnswer = () => {
        setAnswers([...answers, ""]);
        setChecked([...checked, false]);
    };

    const handleRemoveAnswer = (index: number) => {
        const list = [...answers];
        list.splice(index, 1);
        setAnswers(list);
        const list2 = [...checked];
        list2.splice(index, 1);
        setChecked(list2);
    };

    let noError: string = "";
    const validate = () => {
        let required: string = "To pole jest wymagane";
        let tooLongTitle: string = "Tytuł może mieć maksymalnie 40 znaków";
        let noAnswers: string = "Trzeba dodać odpowiedzi";

        let errorTemp: ValidationErrors = {
            title: title ? noError : required,
            question: question ? noError : required,
            noAnswers: answers.length !== 0 || mode === QuestionType.OPEN ? noError : noAnswers,
            emptyAnswers: []
        };

        if (title.length > 40)
            errorTemp.title = tooLongTitle;

        for (let i = 0; i < answers.length; i++)
            errorTemp.emptyAnswers.push(answers[i] || mode === QuestionType.OPEN ? noError : required);

        setErrors(errorTemp);

        return (
            errorTemp.title === noError &&
            errorTemp.question === noError &&
            errorTemp.noAnswers === noError &&
            errorTemp.emptyAnswers.every((x: string) => x === noError)
        );
    };

    const timer = useRef<number>();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!loading) {

            if (!validate()) {
                return;
            }
            setSuccess(false);
            setLoading(true);

            let obj: Question = {
                title: title,
                text: question
            };

            if (mode === QuestionType.CLOSED) {
                let options: Answer[] = [];
                for (let i = 0; i < answers.length; i++) {
                    options.push({
                        index: i + 1,
                        text: answers[i],
                        isCorrect: checked[i],
                    });
                }

                obj.options = options;
            }

            console.log(obj);
            if (data !== undefined) {
                store.questions[data.questionIndex] = obj;

                timer.current = window.setTimeout(() => {
                    setSuccess(true);
                    setLoading(false);
                }, 500);
            }
            else {
                store.questions = [...store.questions, obj];

                timer.current = window.setTimeout(() => {
                    setTitle("");
                    setQuestion("");
                    setAnswers([]);
                    setChecked([]);
                    setSuccess(true);
                    setLoading(false);
                }, 500);
            }
        }
    };


    return (
        <div className={classes.root}>
            <form
                onSubmit={handleSubmit}
                className={classes.form}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="standard-basic"
                    variant="filled"
                    label="Tytuł"
                    value={title}
                    className={classes.titleInput}
                    required
                    error={errors.title !== noError}
                    helperText={errors.title}
                    onChange={handleTitleChange}
                    inputProps={{ maxLength: 40 }}
                />
                <TextField
                    multiline={true}
                    rows={5}
                    required
                    value={question}
                    error={errors.question !== noError}
                    helperText={errors.question}
                    variant="filled"
                    label="Pytanie"
                    className={classes.textarea}
                    fullWidth
                    onChange={handleQuestionChange}
                ></TextField>

                <ButtonGroup
                    variant="outlined"
                    color="primary"
                    aria-label="question type"
                >
                    <Button
                        color={mode === QuestionType.CLOSED ? "primary" : "default"}
                        className={mode === QuestionType.CLOSED ? classes.buttonActive : classes.buttonNonactive}
                        onClick={() => setMode(QuestionType.CLOSED)} >
                        Zamknięte
                    </Button>
                    <Button
                        color={mode === QuestionType.OPEN ? "primary" : "default"}
                        className={mode === QuestionType.OPEN ? classes.buttonActive : classes.buttonNonactive}
                        onClick={() => setMode(QuestionType.OPEN)}
                        style={{ marginLeft: 0 }} >
                        Otwarte
                    </Button>
                </ButtonGroup>

                <div hidden={mode === QuestionType.OPEN} className={classes.closedAnswers}>
                    <Grid container className={classes.answerRow}>
                        <Grid item>
                            <FormLabel>Odpowiedzi:</FormLabel>
                        </Grid>
                        <Grid item>
                            <FormLabel>Poprawne:</FormLabel>
                        </Grid>
                    </Grid>

                    {answers.map((x, i) => {
                        return (
                            <Grid
                                item
                                key={'answer' + i}
                                container
                                className={classes.answerRow}
                            >
                                {answers.length !== 0 && (
                                    <IconButton
                                        aria-label="delete answer"
                                        className={classes.deleteBtn}
                                        onClick={() => handleRemoveAnswer(i)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                                <Grid item className={classes.textarea}>
                                    <TextField
                                        value={x}
                                        onChange={(e) => handleAnswerChange(e, i)}
                                        label="Odpowiedź"
                                        multiline={true}
                                        rows={1}
                                        required
                                        fullWidth
                                        error={
                                            errors.emptyAnswers.length > i &&
                                            errors.emptyAnswers[i] !== noError
                                        }
                                        helperText={errors.emptyAnswers[i]}
                                    ></TextField>
                                </Grid>
                                <Grid item className={classes.checkbox}>
                                    <Checkbox
                                        color="primary"
                                        checked={checked[i]}
                                        onChange={(e) => handleCheckboxChange(e, i)}
                                    />
                                </Grid>
                            </Grid>
                        );
                    })}
                    <span className={classes.errorColor}>{errors.noAnswers}</span>

                    <Fab
                        color="primary"
                        aria-label="add answer"
                        onClick={handleAddAnswer}
                    >
                        <AddIcon />
                    </Fab>
                </div>



                <div className={classes.right}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={buttonClassname}
                        disabled={loading}
                        type="submit"
                    >
                        {success ? `Zapisano Pytanie` : `Zapisz Pytanie`}
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={38}
                            className={classes.fabProgress}
                        />
                    )}
                </div>
            </form>
        </div>
    );
}
