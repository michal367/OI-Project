import React, { ChangeEvent } from "react";
import {
    Card,
    CardHeader,
    Checkbox,
    Divider,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
interface QuizListViewProps {
    title: React.ReactNode,
    data: {
        items: number[],
        checked: number[],
        questions: Question[],
    }

    isQuiz: () => boolean;
    numberOfChecked: (items: number[]) => number,

    handleToggleAll: (items: number[]) => () => void,
    handleToggle:    (value: number)   => () => void,

    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void,
}

export function PickQuizList(props: QuizListViewProps) {
    const theme = useTheme();
    const title = props.title;

    const items = props.data.items;
    const checked = props.data.checked;
    const questions = props.data.questions;

    const isQuiz = props.isQuiz;
    const numberOfChecked = props.numberOfChecked;

    const handleToggleAll = props.handleToggleAll;
    const handleChange = props.handleChange;
    const handleToggle = props.handleToggle;
    const handleSearch = props.handleSearch;

    const classes = makeStyles({
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
            width: "180px",
        },
        searchInput: {
            position: "absolute",
            top: "21px",
            right: "25px",
            width: "180px",
        },
    })();

    return (
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
                subheader={`${numberOfChecked(items)}/${
                    items.length
                } zaznaczonych`}
            />
            {isQuiz() ? (
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
                        ),
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
}
