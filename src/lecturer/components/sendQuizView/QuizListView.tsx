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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useEffect } from "react";
import { useState } from "react";
interface QuizListViewProps {
    selected?: Quiz,
    onChange?: (quiz: Quiz) => void,
}

export function QuizListView(props: QuizListViewProps) {
    const store = useContext(StoreContext);
    const theme = useTheme();
    const [selected, setSelected] = useState(props.selected);

    const handleQuiz = (value: Quiz) => () => {
        if (props.onChange)
            props.onChange(value);
        setSelected(value);
    };

    const classes = makeStyles({
        wrapper: {
            margin: "15px auto",
            background: theme.palette.secondary.light,
            overflow: "auto",
            maxHeight: "calc(50vh - 100px)"
        }
    })();

    const deleteQuiz = (quizToBeDeleted: Quiz) => () => {
        store.quizes = store.quizes.filter(storeQuiz => storeQuiz !== quizToBeDeleted);
    }

    useEffect(() => {
        setSelected(props.selected);
    }, [props.selected])

    return (
        <List component="nav" aria-label="main mailbox folders" className={classes.wrapper}>
            {store.quizes.map((value: Quiz) => {
                return (
                    <ListItem
                        key={value.title}
                        button
                        selected={selected === value}
                        onClick={handleQuiz(value)}
                    >
                        <ListItemText primary={value.title} />
                        <IconButton edge="end" aria-label="delete" onClick={deleteQuiz(value)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                );
            })}
            {store.quizes.length === 0 && (<Typography style={{ paddingLeft: "10px" }}>Nie ma ??adnego Quizu</Typography>)}
        </List>
    );
}
