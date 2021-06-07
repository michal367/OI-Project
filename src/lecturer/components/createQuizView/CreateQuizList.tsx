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
    error: string;

    titleQuiz?: string;

    cardClass?: string;

    isQuiz: () => boolean;
    numberOfChecked: (items: number[]) => number,

    handleToggleAll: (items: number[]) => () => void,
    handleToggle: (value: number) => () => void,

    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void,
}

export function CreateQuizList(props: QuizListViewProps) {
    const theme = useTheme();
    const title = props.title;
    
    const error = props.error;

    const items = props.data.items;
    const checked = props.data.checked;
    const questions = props.data.questions;

    const titleQuiz = props.titleQuiz;

    const isQuiz = props.isQuiz;
    const numberOfChecked = props.numberOfChecked;

    const handleToggleAll = props.handleToggleAll;
    const handleChange = props.handleChange;
    const handleToggle = props.handleToggle;
    const handleSearch = props.handleSearch;

    const classes = makeStyles({
        cardHeader: {
            padding: theme.spacing(2, 2),
        },
        list: {
            width: "100%",
            height: 580,
            overflow: "auto",
        },
        quizInput: {
            position: "absolute",
            top: 5,
            right: 30,
            width: 180,
        },
        searchInput: {
            position: "absolute",
            top: 21,
            right: 30,
            width: 180,
        },
        checkbox:{
            width: 42,
        },
    })();

    return (
        <Card className={props.cardClass ?? ""}>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={
                            numberOfChecked(items) === items.length &&
                            items.length !== 0
                        }
                        className={classes.checkbox}
                        indeterminate={
                            numberOfChecked(items) !== items.length &&
                            numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length
                    } zaznaczonych`}
            />
            {isQuiz() ? (
                <TextField
                    className={classes.quizInput}
                    value={titleQuiz}
                    label="Nazwa Quizu"
                    error={error !== ""}
                    helperText={error}
                    onChange={handleChange}
                    inputProps={{ maxLength: 40 }}
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
                                    className={classes.checkbox}
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
