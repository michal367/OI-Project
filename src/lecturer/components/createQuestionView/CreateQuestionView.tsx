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
    if(data !== undefined){
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
    const [inputList, setInputList] = useState<string[]>(answersVal);
    const [checked, setChecked] = useState<boolean[]>(isCorrectVal);
    const [errors, setErrors] = useState({
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

    const handleTextAreaChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value } = e.target;
        setQuestion(value);
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const { value } = e.target;
        const list = [...inputList];
        list[index] = value;
        setInputList(list);
    };

    const handleCheckboxChange = (e: ChangeEvent<any>, index: number) => {
        const value = e.target.checked;
        const listcb = [...checked];
        listcb[index] = value;
        setChecked(listcb);
    };

    const handleAddButtonClick = () => {
        setInputList([...inputList, ""]);
        setChecked([...checked, false]);
    };

    const handleRemoveButtonClick = (index: number) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        const list2 = [...checked];
        list2.splice(index, 1);
        setChecked(list2);
    };

    const validate = () => {
        let temp: any = {};
        let required: string = "To pole jest wymagane";

        temp.title = title ? "" : required;
        temp.question = question ? "" : required;

        temp.noAnswers =
            inputList.length !== 0 || mode === QuestionType.OPEN ? "" : "Trzeba doda?? odpowiedzi";

        temp.emptyAnswers = [];
        for (let i = 0; i < inputList.length; i++)
            temp.emptyAnswers.push(inputList[i] || mode === QuestionType.OPEN ? "" : required);

        setErrors(temp);

        return (
            temp.title === "" &&
            temp.question === "" &&
            temp.noAnswers === "" &&
            temp.emptyAnswers.every((x: string) => x === "")
        );
    };

    const timer = useRef<number>();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!loading) {

            if (!validate()) {
                console.log("NOT ALL DATA ENTERED");
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
                for (let i = 0; i < inputList.length; i++) {
                    options.push({
                        index: i + 1,
                        text: inputList[i],
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
                    setInputList([]);
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
                    label="Tytu??"
                    value={title}
                    className={classes.titleInput}
                    required
                    error={errors.title !== ""}
                    helperText={errors.title}
                    onChange={handleTitleChange}
                />
                <TextField
                    multiline={true}
                    rows={5}
                    required
                    value={question}
                    error={errors.question !== ""}
                    helperText={errors.question}
                    variant="filled"
                    label="Pytanie"
                    className={classes.textarea}
                    fullWidth
                    onChange={handleTextAreaChange}
                ></TextField>

                <ButtonGroup
                    variant="outlined"
                    color="primary"
                    aria-label="contained primary button group"
                >
                    <Button
                        color={mode === QuestionType.CLOSED ? "primary" : "default"}
                        className={mode === QuestionType.CLOSED ? classes.buttonActive : classes.buttonNonactive}
                        onClick={() => setMode(QuestionType.CLOSED)} >
                        Zamkni??te
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

                    {inputList.map((x, i) => {
                        return (
                            <Grid
                                item
                                key={'answer' + i}
                                container
                                className={classes.answerRow}
                            >
                                {inputList.length !== 0 && (
                                    <IconButton
                                        aria-label="delete"
                                        className={classes.deleteBtn}
                                        onClick={() => handleRemoveButtonClick(i)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                                <Grid item className={classes.textarea}>
                                    <TextField
                                        value={x}
                                        onChange={(e) => handleInputChange(e, i)}
                                        label="Odpowied??"
                                        multiline={true}
                                        rows={1}
                                        required
                                        fullWidth
                                        error={
                                            errors.emptyAnswers.length > i &&
                                            errors.emptyAnswers[i] !== ""
                                        }
                                        helperText={errors.emptyAnswers[i]}
                                    ></TextField>
                                </Grid>
                                <Grid item className={classes.checkbox}>
                                    <Checkbox
                                        color="primary"
                                        checked={checked[i]}
                                        onChange={(e) => handleCheckboxChange(e, i)}
                                        inputProps={{
                                            "aria-label": "secondary checkbox",
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        );
                    })}
                    <span className={classes.errorColor}>{errors.noAnswers}</span>

                    <Fab
                        color="primary"
                        aria-label="add"
                        onClick={handleAddButtonClick}
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
