import {
    Button,
    CircularProgress,
    Grid
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import "fontsource-roboto";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../../services/StoreService";
import { intersection, not, union } from "../../util/boolAlgebra";
import { PickQuizList } from "./PickQuizList";


function createIndexArray(s: number) {
    let array = [];
    for (let i = 0; i < s; i++) {
        array.push(i);
    }
    return array;
}

export function PickQuizView() {
    const theme = useTheme();
    const store = useContext(StoreContext);

    const classes = makeStyles({
        root: {
            background: theme.palette.secondary.light,
            gap: "10px",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            position: "absolute",
            width: "100%",
            top: 0,
            zIndex: -1,
            paddingTop: 75,
            paddingBottom: "10px",
        },
        wrapper: {
            width: 1000,
            display: "flex",
            justifyContent: "flex-end",
            position: "relative",
        },
        button: {
            margin: theme.spacing(0.5, 0),
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
        gridContent: {
            maxWidth: "100%",
        },
    })();
    const [indexArray, setIndexArray] = useState<number[]>([]);
    const [checked, setChecked] = useState<number[]>([]);
    const [left, setLeft] = useState<number[]>(indexArray);
    const [right, setRight] = useState<number[]>([]);
    const [title, setTitle] = useState("");
    const [filter, setFilter] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        setLeft(indexArray);
    }, [indexArray]);

    useEffect(() => {
        setQuestions(store.questions);
        setIndexArray(createIndexArray(store.questions.length));
    }, [store.questions]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items: number[]) =>
        intersection(checked, items).length;

    const handleToggleAll = (items: number[]) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const buttonClassName = clsx({
        [classes.sessionBtn]: 1,
        [classes.buttonSuccess]: success,
    });

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
        setSuccess(false);
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
        setSuccess(false);
    };

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };
    const filterByTitle = (items: number[]) => {
        let result: number[] = [];
        for (let i = 0; i < items.length; i++) {
            if (questions[items[i]].title.toLowerCase().includes(filter))
                result.push(items[i]);
        }
        return result;
    }

    const timer = useRef<number>();
    const handleSaveQuiz = () => {
        if (!loading) {
            let selectedQuestions: Question[] = [];
            right.forEach((i) => {
                selectedQuestions.push(questions[i]);
            });
            console.log(selectedQuestions);
            setSuccess(false);
            setLoading(true);

            store.quizzes = [
                ...store.quizzes,
                { title, questions: selectedQuestions },
            ];

            timer.current = window.setTimeout(() => {
                console.log(store.quizzes);
                setLeft(indexArray);
                setRight([]);
                setChecked(not(checked, rightChecked));
                setTitle("");
                setSuccess(true);
                setLoading(false);
            }, 500);
        }
    };

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                justify="center"
                alignItems="center"
                className={classes.gridContent}
            >
                <Grid item>
                    <PickQuizList
                        title="Lista pytań"
                        data={{
                            items: filterByTitle(left),
                            checked: checked,
                            questions: questions
                        }}
                        isQuiz={() => false}
                        numberOfChecked={numberOfChecked}
                        handleToggleAll={handleToggleAll}
                        handleChange={handleChange}
                        handleToggle={handleToggle}
                        handleSearch={handleSearchInput}
                    />
                </Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right"
                        >
                            &gt;
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left"
                        >
                            &lt;
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <PickQuizList
                        title="Quiz"
                        data={{
                            items: right,
                            checked: checked,
                            questions: questions
                        }}
                        titleQuiz={title}
                        isQuiz={() => true}
                        numberOfChecked={numberOfChecked}
                        handleToggleAll={handleToggleAll}
                        handleChange={handleChange}
                        handleToggle={handleToggle}
                        handleSearch={handleSearchInput}
                    />
                </Grid>
            </Grid>
            <div className={classes.wrapper}>
                <Button
                    variant="contained"
                    color="secondary"
                    className={buttonClassName}
                    disabled={loading || right.length == 0 || title.length === 0 || title.length > 40}
                    onClick={handleSaveQuiz}
                >
                    {success ? `Zapisano Quiz` : `Zapisz Quiz`}
                </Button>
                {loading && (
                    <CircularProgress
                        size={38}
                        className={classes.fabProgress}
                    />
                )}
            </div>
        </div>
    );
}
