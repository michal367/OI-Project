import {
    Divider,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Typography,
    useTheme
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../services/StoreService";


interface QuizListViewProps {
    selected?: FrontQuiz,
    onChange?: (quiz: FrontQuiz) => void,
}

export function QuizListView(props: QuizListViewProps) {
    const store = useContext(StoreContext);
    const theme = useTheme();
    const [selected, setSelected] = useState(props.selected);

    const handleQuiz = (value: FrontQuiz) => () => {
        if (props.onChange)
            props.onChange(value);
        setSelected(value);
    };

    const classes = makeStyles({
        wrapper: {
            margin: "15px auto",
            background: theme.palette.secondary.light,
            overflow: "auto",
            maxHeight: "calc(50vh - 100px)",
            padding: 0
        }
    })();

    useEffect(() => {
        setSelected(props.selected);
    }, [props.selected])

    return (
        <List component="nav" aria-label="main mailbox folders" className={classes.wrapper}>
            {store.quizzes.map((value: FrontQuiz, i: number) => {
                return (
                    <>
                        <ListItem
                            key={value.title}
                            button
                            selected={selected === value}
                            onClick={handleQuiz(value)}
                        >
                            <ListItemText primary={value.title} />
                        </ListItem>
                        {i !== store.quizzes.length - 1 && (
                            <Divider />
                        )}
                    </>
                );
            })}
            {store.quizzes.length === 0 && (
                <Typography style={{ paddingLeft: "10px" }}>
                    Nie ma żadnego Quizu
                </Typography>
            )}
        </List>
    );
}
