import {
    Button,
    ButtonGroup, 
    CircularProgress
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from "clsx";
import "fontsource-roboto";
import { Location } from 'history';
import React, { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { v4 } from 'uuid';
import { intersection, not, union } from "../../../common/util/boolAlgebra";
import { StoreContext } from "../../services/StoreService";
import { lazareTheme } from "../../util/theme/customTheme";
import { CreateQuizList } from "./CreateQuizList";


function createIndexArray(s: number) {
    let array = [];
    for (let i = 0; i < s; i++) {
        array.push(i);
    }
    return array;
}

export function CreateQuizView() {
    const theme = useTheme();
    const history = useHistory();
    const store = useContext(StoreContext);
    const location: Location<Object> = useLocation();

    let titleVal = "";
    let leftVal: number[] = createIndexArray(store.questions.length);
    let rightVal: number[] = [];
    let questionsVal: Question[] = JSON.parse(JSON.stringify(store.questions));

    let data: any = location.state;
    if (data !== undefined) {
        let id = data.id;
        let quiz: FrontQuiz | undefined = undefined;
        for (const item of store.quizzes) {
            if (item.id === id) {
                quiz = item;
                break;
            }
        }

        if (quiz) {
            titleVal = quiz.title;
            for (const question of quiz.questions) {
                let found: boolean = false;
                for (let i = 0; i < store.questions.length; i++) {
                    if (store.questions[i].id === question.id) {
                        rightVal.push(i);
                        leftVal = leftVal.filter((item) => item != i);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    questionsVal.push(question);
                    rightVal.push(questionsVal.length - 1);
                }
            }
            console.log(quiz.questions)
            console.log(rightVal)
        }
    }

    const [checked, setChecked] = useState<number[]>([]);
    const [left, setLeft] = useState<number[]>(leftVal);
    const [right, setRight] = useState<number[]>(rightVal);
    const [title, setTitle] = useState(titleVal);
    const [questions, setQuestions] = useState<Question[]>(questionsVal);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState<string>("");


    const classes = makeStyles({
        root: {
            ...lazareTheme.root,
        },
        content: {
            ...lazareTheme.columnWrapper,
            gap: 20,
            height: "calc(100vh - 48px)",
            minHeight: "500px",
            boxSizing: "border-box",
            justifyContent: "space-between",
        },
        contentColumns: {
            ...lazareTheme.twoColumns.wrapper,
            position: "relative",
        },
        column: {
            ...lazareTheme.twoColumns.column,
        },
        cardLeft: {
            position: "relative",
            borderRadius: "5px 0 0 5px",
        },
        cardRight: {
            position: "relative",
            borderRadius: "0 5px 5px 0",
        },
        transferButtons: {
            ...lazareTheme.twoColumns.overlay,
        },

        right: {
            display: "flex",
            justifyContent: "flex-end",
            position: "relative",
        },
        transferButtonGroup: {
            width: 32,
            height: 100,
            "& .MuiButtonGroup-grouped": {
                minWidth: "unset",
                padding: "4px 0",
            },
            "& svg.MuiSvgIcon-root": {
                width: 16,
            },
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
        gridContent: {
            maxWidth: "100%",
        },
    })();


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        setError("");
    };


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
        if (questions.length > 0) {
            for (let i = 0; i < items.length; i++) {
                if (questions[items[i]].title.toLowerCase().includes(filter))
                    result.push(items[i]);
            }
        }
        return result;
    }

    const timer = useRef<number>();
    const handleSaveQuiz = useCallback(() => {
        if (!loading) {
            let selectedQuestions: Question[] = [];
            right.forEach((i) => {
                selectedQuestions.push(questions[i]);
            });

            console.log(selectedQuestions);
            setSuccess(false);
            setLoading(true);

            if (data != undefined) {
                for (const quiz of store.quizzes) {
                    if (quiz.title === title && quiz.title != titleVal) {
                        setError("Istnieje już quiz o takiej nazwie");
                        return;
                    }
                }
                for(let i=0; i < store.quizzes.length; i++){
                    if(store.quizzes[i].id === data.id){
                        store.quizzes[i].title = title;
                        store.quizzes[i].questions = selectedQuestions;
                        break;
                    }
                }

                timer.current = window.setTimeout(() => {
                    console.log(store.quizzes);
                    setSuccess(true);
                    setLoading(false);
                }, 500);
            }
            else {
                for (const quiz of store.quizzes) {
                    if (quiz.title === title) {
                        setError("Istnieje już quiz o takiej nazwie");
                        return;
                    }
                }

                store.quizzes = [
                    ...store.quizzes,
                    { "id": v4(), title, questions: selectedQuestions }
                ];

                timer.current = window.setTimeout(() => {
                    console.log(store.quizzes);
                    setLeft(createIndexArray(questions.length));
                    setRight([]);
                    setChecked(not(checked, rightChecked));
                    setTitle("");
                    setSuccess(true);
                    setLoading(false);
                }, 500);
            }
        }
    }, [checked, loading, questions, right, rightChecked, store, title]);

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault();
            if (!(loading || right.length === 0 || title.length === 0 || title.length > 40)){
                handleSaveQuiz();
            } 
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [loading, right, title, handleSaveQuiz]);

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <div className={classes.contentColumns}>
                    <div className={classes.column}>
                        <CreateQuizList
                            title="Lista pytań"
                            data={{
                                items: filterByTitle(left),
                                checked: checked,
                                questions: questions
                            }}
                            error={""}
                            isQuiz={() => false}
                            numberOfChecked={numberOfChecked}
                            handleToggleAll={handleToggleAll}
                            handleChange={handleChange}
                            handleToggle={handleToggle}
                            handleSearch={handleSearchInput}
                            cardClass={classes.cardLeft}
                        />
                    </div>
                    <div className={classes.column}>
                        <CreateQuizList
                            title="Quiz"
                            data={{
                                items: right,
                                checked: checked,
                                questions: questions
                            }}
                            error={error}
                            titleQuiz={title}
                            isQuiz={() => true}
                            numberOfChecked={numberOfChecked}
                            handleToggleAll={handleToggleAll}
                            handleChange={handleChange}
                            handleToggle={handleToggle}
                            handleSearch={handleSearchInput}
                            cardClass={classes.cardRight}
                        />
                    </div>
                    <div className={classes.transferButtons}>
                        <ButtonGroup
                            variant="contained"
                            size="small"
                            color="primary"
                            className={classes.transferButtonGroup}
                        >
                            <Button
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                            >
                                <ChevronLeftIcon />
                            </Button>
                            <Button
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                            >
                                <ChevronRightIcon />
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
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
                        className={buttonClassName}
                        disabled={loading || right.length === 0 || title.length === 0 || title.length > 40}
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
        </div>
    );
}
