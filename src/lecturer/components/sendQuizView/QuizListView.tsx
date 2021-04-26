import {
    makeStyles,
    useTheme,
    Paper,
    List,
    ListItem,
    Typography,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";
import {
    MouseEvent as Mouse,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { useBackEnd, useBackEndSocket } from "../../services/BackEndService";
import { StoreContext } from "../../services/StoreService";
import { getComparator, Order, stableSort } from "../../util/comparators";

interface StudentListViewProps {
    lecture?: Lecture;
}

export interface StudentListRow extends Student {
    orderIndex: number;
}

export function QuizListView(props: StudentListViewProps) {
    const backEnd = useBackEnd();
    const store = useContext(StoreContext);
    const theme = useTheme();

    const classes = makeStyles({
        wrapper: {
            margin: "15px auto",
            background: theme.palette.secondary.light,
            maxHeight: "50%",
            overflow: "auto",
        }
    })();
    const handleListItemClick = (
        event: Mouse<HTMLDivElement, MouseEvent>,
        index: number
    ) => {
        store.selectedQuiz = index;
    };
    return (
        <List component="nav" aria-label="main mailbox folders" className={classes.wrapper}>
            {store.quizes.map((value: Quiz) => {
                return (
                    <ListItem
                        button
                        selected={store.selectedQuiz === store.quizes.indexOf(value)}
                        onClick={(event) => handleListItemClick(event, store.quizes.indexOf(value))}
                    >
                        <ListItemText primary={value.title} />
                    </ListItem>
                );
            })}
            {store.quizes.length === 0 && (<Typography>Nie ma żadnego Quizu</Typography>)}
        </List>
    );
}
