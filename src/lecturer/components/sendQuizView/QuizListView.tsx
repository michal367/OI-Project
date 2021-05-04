import {
    makeStyles,
    useTheme,
    List,
    ListItem,
    Typography,
    ListItemText,
} from "@material-ui/core";
import {
    useContext,
} from "react";
import { StoreContext } from "../../services/StoreService";

interface QuizListViewProps {
    //TODO slit to 2 props 
    quiz?: [Quiz | undefined, any];
}

export function QuizListView(props: QuizListViewProps) {
    const store = useContext(StoreContext);
    const theme = useTheme();
    const handleQuiz = (value: Quiz) => () => {
        if (props.quiz)
            props.quiz[1](value);
    };

    const classes = makeStyles({
        wrapper: {
            margin: "15px auto",
            background: theme.palette.secondary.light,
            maxHeight: "50%",
            overflow: "auto",
        }
    })();

    return (
        <List component="nav" aria-label="main mailbox folders" className={classes.wrapper}>
            {store.quizes.map((value: Quiz) => {
                return (
                    <ListItem
                        button
                        selected={props.quiz && props.quiz[0] === value}
                        onClick={handleQuiz(value)}
                    >
                        <ListItemText primary={value.title} />
                    </ListItem>
                );
            })}
            {store.quizes.length === 0 && (<Typography>Nie ma żadnego Quizu</Typography>)}
        </List>
    );
}
