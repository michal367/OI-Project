import {
    makeStyles,
    useTheme,
    List,
    ListItem,
    Typography,
    ListItemText,
} from "@material-ui/core";
import {
    MouseEvent as Mouse,
    useContext,
    useEffect,
    useState,
} from "react";
import { useBackEnd, useBackEndSocket } from "../../services/BackEndService";
import { StoreContext } from "../../services/StoreService";

interface QuizListViewProps {
    quiz?: [Quiz | undefined, any];
}

export function QuizListView(props: QuizListViewProps) {
    const backEnd = useBackEnd();
    let [selectedQuiz, setSelectedQuiz]= props.quiz ?? [undefined,()=>{}];
    const [quiz, setQuiz] = useState<Quiz|undefined>(selectedQuiz);
    const store = useContext(StoreContext);
    const theme = useTheme();
    const handleQuiz = (value:Quiz) => () => {
        setSelectedQuiz(value);
    };

    const classes = makeStyles({
        wrapper: {
            margin: "15px auto",
            background: theme.palette.secondary.light,
            maxHeight: "50%",
            overflow: "auto",
        }
    })();

    useEffect(() => {
        [selectedQuiz, setSelectedQuiz]= props.quiz ?? [undefined,()=>{}];
        setQuiz(selectedQuiz);
    }, [props.quiz]);

    return (
        <List component="nav" aria-label="main mailbox folders" className={classes.wrapper}>
            {store.quizes.map((value: Quiz) => {
                return (
                    <ListItem
                        button
                        selected={quiz === value}
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
