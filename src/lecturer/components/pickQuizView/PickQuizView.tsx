import 'fontsource-roboto';

import {
    Button,
    Card,
    CardHeader,
    Checkbox,
    CircularProgress,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import clsx from 'clsx';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';

import { StoreContext } from '../../services/StoreService';
import { questionListMock } from '../../util/mockData';


//TODO move this functions to some kind of util file 
function not(a: number[], b: number[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: number[], b: number[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: number[], b: number[]) {
    return [...a, ...not(b, a)];
}

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
            paddingTop: "55px",
            paddingBottom: "10px",
        },
        wrapper: {
            width: 1000,
            display: "flex",
            justifyContent: "flexend",
            position: "relative",
        },
        cardWrapper: {
            position: "relative",
        },
        cardHeader: {
            padding: theme.spacing(1, 2),
        },
        list: {
            width: 450,
            height: 580,
            backgroundColor: theme.palette.background.paper,
            overflow: "auto",
        },
        quizInput: {
            position: "absolute",
            top: "5px",
            right: "25px",
            width: "180px"
        },
        searchInput: {
            position: "absolute",
            top: "21px",
            right: "25px",
            width: "180px"
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
        gidcontent: {
            maxWidth: "100%",
        },
    })();
    const [indexArray, setIndexArray] = useState<number[]>([]);
    const [checked, setChecked] = useState<number[]>([]);
    const [left, setLeft] = useState<number[]>(indexArray);
    const [right, setRight] = useState<number[]>([]);
    const [title, setTitle] = useState("");
    const [filterFn, setFilterFn] = useState({ fn: (items: number[]) => { return Array.from(Array(items.length).keys()) } });

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
    const buttonClassname = clsx({
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

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target;
        setFilterFn({
            fn: (items: number[]) => {
                let result: number[] = [];
                for(let i=0; i < items.length; i++){
                    if(questions[items[i]].title.toLowerCase().includes(value))
                        result.push(items[i]);
                }
                return result;
            }
        })
    }

    //TODO move this to other file 
    const customList = (
        title: React.ReactNode,
        items: number[],
        isQuiz: boolean
    ) => (
        <Card className={classes.cardWrapper}>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={
                            numberOfChecked(items) === items.length &&
                            items.length !== 0
                        }
                        indeterminate={
                            numberOfChecked(items) !== items.length &&
                            numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{ "aria-label": "all items selected" }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length
                    } zaznaczonych`}
            />
            {isQuiz ? (
                <TextField
                    id="standard-basic"
                    className={classes.quizInput}
                    label="Nazwa Quizu"
                    onChange={handleChange}
                />
            ) : (
                <TextField
                    className={classes.searchInput}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        )
                    }}
                />
            )}
            <Divider />
            <List className={classes.list} dense component="div" role="list">
                {items.map((value: number) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ "aria-labelledby": labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={questions[value].title}
                            />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );
    const timer = useRef<number>();
    const handleButtonClick = () => {
        if (!loading) {
            let selectedQuestions: Question[] = [];
            right.forEach((i) => {
                selectedQuestions.push(questions[i]);
            });
            setSuccess(false);
            setLoading(true);

            store.quizes = [...store.quizes, { title, questions: selectedQuestions }]

            timer.current = window.setTimeout(() => {
                console.log(store.quizes);
                setLeft(indexArray);
                setRight([]);
                setChecked(not(checked, rightChecked));
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
                className={classes.gidcontent}
            >
                <Grid item>{customList("Lista pytań", filterFn.fn(left), false)}</Grid>
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
                <Grid item>{customList("Quiz", right, true)}</Grid>
            </Grid>
            <div className={classes.wrapper}>
                <Button
                    variant="contained"
                    color="secondary"
                    className={buttonClassname}
                    disabled={loading}
                    onClick={handleButtonClick}
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
