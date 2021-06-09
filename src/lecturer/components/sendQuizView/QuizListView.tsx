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
            margin: "15px 0",
            overflow: "auto",
            maxHeight: "calc(50vh - 100px)",
            padding: 0,
            width: "70%",
            border: "1px solid #D3D0CB",
        },
        listItem:{
            "&:nth-of-type(odd)": {
                background: "rgba(65, 101, 138, 0.2)",
            },
            "&:hover":{
                background: theme.palette.secondary.light,
            },
            "&.MuiListItem-root.Mui-selected":{
                background: theme.palette.primary.light,
                color: "white",
            }
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
                            selected={selected?.id === value.id}
                            onClick={handleQuiz(value)}
                            className={classes.listItem}
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
                <Typography style={{ padding: "10px" }}>
                    Nie ma żadnego Quizu
                </Typography>
            )}
        </List>
    );
}
