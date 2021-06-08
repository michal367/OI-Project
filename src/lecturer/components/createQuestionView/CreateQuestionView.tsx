import {
    Button,
    ButtonGroup,
    Card,
    Checkbox,
    CircularProgress,
    FormControl,
    Grid,
    IconButton,
    makeStyles,
    TextField,
    Typography,
    Tooltip,
    useTheme
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import { Location } from 'history';
import React, { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { StoreContext } from '../../services/StoreService';
import { numToSSColumn } from '../../util/numToOptionLetter';
import { lazareTheme } from "../../util/theme/customTheme";
import { UploadImageField } from '../uploadImageField/uploadImageField';
import ReactScrollableFeed from 'react-scrollable-feed';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import { v4 } from 'uuid';

export function CreateQuestionView() {
    const theme = useTheme();
    const history = useHistory();
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
    let imageUrlVal = "";
    let modeVal = QuestionType.CLOSED;
    let answersVal: string[] = [];
    let isCorrectVal: boolean[] = [];

    let data: any = location.state;
    if (data !== undefined) {
        let index = data.index;
        if (store.questions[index]) {
            titleVal = store.questions[index].title;
            questionVal = store.questions[index].text;
            imageUrlVal = store.questions[index].imageSrc ?? "";

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
    }

    const [title, setTitle] = useState<string>(titleVal);
    const [imageUrl, setImageUrl] = useState<string | undefined>(imageUrlVal);
    const [question, setQuestion] = useState<string>(questionVal);
    const [mode, setMode] = useState<number>(modeVal);
    const [answers, setAnswers] = useState<string[]>(answersVal);
    const [checked, setChecked] = useState<boolean[]>(isCorrectVal);
    const [errors, setErrors] = useState<ValidationErrors>({
        title: "",
        question: "",
        noAnswers: "",
        emptyAnswers: []
    });

    const classes = makeStyles({
        root: {
            ...lazareTheme.root,
        },
        content: {
            ...lazareTheme.columnWrapper,
            gap: 20,
            minHeight: "max(700px, 100vh - 48px)",
            maxHeight: "1320px",
            boxSizing: "border-box",
        },
        form: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            height: "100%",
        },
        formRow: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            "& > *": {
                flexGrow: 1,
            },
        },
        formControl: {
            display: "flex",
            flexDirection: "row",
            gap: 15,
            alignItems: "center",
        },
        answerList: {
            display: "flex",
            flexDirection: "column",
            gap: 10,
        },
        answerRow: {
            display: "flex",
            gap: 10,
            paddingRight: 20,
            justifyContent: "space-between",
            flexWrap: "nowrap",
            alignItems: "center",
        },
        answerField: {
            height: "auto",
        },
        titleLabel: {
            fontSize: 26,
            fontWeight: "bold",
            paddingLeft: 15,
        },
        titleInput: {
            flexGrow: 1,
            "& .MuiInput-input": {
                fontSize: 18,
                padding: 10,
            },
        },
        textarea: {
            width: "calc(100% - 40px)",
            margin: "10px 20px",
            boxSizing: "border-box",
            "& .MuiInput-underline:before": {
                display: "none",
            },
            "& .MuiInput-underline:after": {
                display: "none",
            },
        },
        optionLetter: {
            flexGrow: 0,
            padding: 10,
            color: "rgba(0,0,0,0.67)",
            minWidth: 55,
            textAlign: "center",
        },
        checkbox: {
            height: 48,
            width: 48,
            flexShrink: 0,
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
        addAnswerBtn:{
            fontSize: 16,
        },
        deleteBtn: {
            "&:hover": {
                color: red[700],
            },
            flexShrink: 0,
            height: 48,
            width: 48,
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
            marginLeft: "30px",
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
            backgroundColor: theme.palette.primary.light,
            height: "50px",
            textTransform: "none",
            width: "100px",
            "& span": {
                color: "white",
                opacity: 0.7,
            },
            "&:hover": {
                backgroundColor: theme.palette.primary.main,
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
    const buttonClassName = clsx({
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
        const checkedList = [...checked];
        checkedList[index] = value;
        setChecked(checkedList);
    };

    const handleAddAnswer = () => {
        setAnswers([...answers, ""]);
        setChecked([...checked, false]);
        window.scrollTo(0, document.body.scrollHeight);
    };

    const handleRemoveAnswer = (index: number) => {
        const list = [...answers];
        list.splice(index, 1);
        const list2 = [...checked];
        list2.splice(index, 1);
        setAnswers(prev => list.length > 0 ? list : [""]);
        setChecked(prev => list2.length > 0 ? list2 : [false]);
    };

    let noError: string = "";
    const validate = () => {
        let required: string = "To pole jest wymagane";
        let tooLongTitle: string = "Tytuł może mieć maksymalnie 40 znaków";
        let noAnswers: string = "Trzeba dodać odpowiedzi";
        let duplicateTitle: string = "Istnieje już pytanie z takim tytułem";

        let errorTemp: ValidationErrors = {
            title: title ? noError : required,
            question: question ? noError : required,
            noAnswers: answers.length !== 0 || mode === QuestionType.OPEN ? noError : noAnswers,
            emptyAnswers: []
        };

        if (title.length > 40)
            errorTemp.title = tooLongTitle;
            
        if (data === undefined || titleVal !== title) {
            for (const quest of store.questions)
                if (quest.title === title) {
                    errorTemp.title = duplicateTitle;
                    break;
                }
        }

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
                id: v4(),
                title: title,
                text: question,
                imageSrc: imageUrl
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
                store.questions[data.index] = obj;

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
                    setImageUrl("");
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
            <div className={classes.content}>
                <form
                    onSubmit={handleSubmit}
                    className={classes.form}
                    noValidate
                    autoComplete="off"
                >
                    <div className={classes.formRow}>
                        <FormControl className={classes.formControl}>
                            <Typography className={classes.titleLabel}>
                                Tytuł
                            </Typography>
                            <TextField
                                id="question-title"
                                value={title}
                                className={classes.titleInput}
                                required
                                error={errors.title !== noError}
                                helperText={errors.title}
                                onChange={handleTitleChange}
                                inputProps={{ maxLength: 40 }}
                            />
                        </FormControl>
                    </div>
                    <div className={classes.formRow}>
                        <UploadImageField imageSrc={imageUrl} onChange={(image) => setImageUrl(image)} />
                    </div>
                    <div className={classes.formRow}>
                        <Card>
                            <TextField
                                multiline={true}
                                rows={5}
                                required
                                value={question}
                                error={errors.question !== noError}
                                helperText={errors.question}
                                label="Pytanie"
                                className={classes.textarea}
                                fullWidth
                                onChange={handleQuestionChange}
                            />
                        </Card>
                    </div>
                    <div className={classes.formRow}>
                        <ButtonGroup
                            variant="outlined"
                            color="primary"
                            aria-label="question type"
                        >
                            <Button
                                color={mode === QuestionType.CLOSED ? "primary" : "default"}
                                className={mode === QuestionType.CLOSED ? classes.buttonActive : classes.buttonNonactive}
                                onClick={() => {
                                    setMode(QuestionType.CLOSED);
                                    if (answers.length === 0)
                                        handleAddAnswer();
                                }} >
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
                    </div>
                    <ReactScrollableFeed className={classes.answerList}>
                        {mode !== QuestionType.OPEN && (<>
                            {answers.map((x, i) => {
                                return (
                                    <div className={classes.formRow}>
                                        <Typography variant="h3" className={classes.optionLetter}>
                                            {numToSSColumn(i + 1)}
                                        </Typography>
                                        <Card>
                                            <Grid
                                                key={'answer' + i}
                                                container
                                                className={classes.answerRow}
                                            >
                                                <div className={classes.textarea}>
                                                    <TextField
                                                        value={x}
                                                        onChange={(e) => handleAnswerChange(e, i)}
                                                        label={checked[i] ? "Poprawna odpowiedź" : "Odpowiedź"}
                                                        multiline={true}
                                                        rows={2}
                                                        required
                                                        fullWidth
                                                        className={classes.answerField}
                                                        error={
                                                            errors.emptyAnswers.length > i &&
                                                            errors.emptyAnswers[i] !== noError
                                                        }
                                                        helperText={errors.emptyAnswers[i]}
                                                    ></TextField>
                                                </div>
                                                <Tooltip
                                                    title={<Typography style={{fontSize: 14}} color="inherit">Oznacz jako poprawną</Typography>}
                                                    placement="left"
                                                    arrow
                                                >
                                                    <Checkbox
                                                        color="primary"
                                                        icon={<RadioButtonUncheckedIcon />}
                                                        checkedIcon={<CheckCircleOutlineRoundedIcon />}
                                                        checked={checked[i]}
                                                        className={classes.checkbox}
                                                        onChange={(e) => handleCheckboxChange(e, i)}
                                                    />
                                                </Tooltip>
                                                <IconButton
                                                    aria-label="delete answer"
                                                    className={classes.deleteBtn}
                                                    onClick={() => handleRemoveAnswer(i)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Card>

                                    </div>);
                            })}
                            <span className={classes.errorColor}>{errors.noAnswers}</span>

                            <Button
                                color="primary"
                                aria-label="add answer"
                                onClick={handleAddAnswer}
                                className={classes.addAnswerBtn}
                            >
                                Dodaj odpowiedź
                            </Button>
                        </>
                        )}
                    </ReactScrollableFeed>
                    <div className={classes.right}>
                        <Button
                            color="inherit"
                            size="large"
                            onClick={() => history.goBack()}
                            className={classes.sessionBtn}
                            style={{ color: "rgba(0, 0, 0, 0.87)" }}
                        >
                            Anuluj
                    </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            className={buttonClassName}
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
        </div >
    );
}
