import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles, useTheme } from "@material-ui/core";
import React, { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import { StoreContext } from "../../services/StoreService";
import { formatTime } from "../../../common/util/time";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BackspaceIcon from '@material-ui/icons/Backspace';
import useInterval from 'use-interval'

interface StatsListProps {
    isSelected: boolean;
    onSelect: () => void;
    onDelete: () => void;
    onEnded: () => void;
    inProgress: boolean;
    timeToEnd: number;
    title: string;
    index: number;
}

export function StatsListItem(props: StatsListProps) {
    const [clock, setClock] = useState(props.timeToEnd - Date.now());

    const theme = useTheme();
    const classes = makeStyles({
        quizStatRow: {
            paddingTop: 16,
            paddingBottom: 16,
        },
    })();

    useInterval(() => {
        if (props.timeToEnd - Date.now() > 0)
            setClock(props.timeToEnd - Date.now());
        else {
            setClock(0);
            props.onEnded();
        }
    }, props.inProgress ? 1000 : null);

    return (<ListItem
        button
        selected={props.isSelected}
        onClick={(event) => props.onSelect()}
        className={classes.quizStatRow}
        divider
        disabled={props.inProgress}
    >
        <ListItemIcon>
            {props.isSelected && (
                <AssignmentIcon />
            )}
        </ListItemIcon>
        <ListItemText primary={props.title} secondary={props.inProgress ? formatTime(clock) : ""} />
        {!props.inProgress && (<ListItemSecondaryAction>
            <IconButton edge="end" onClick={(event) => props.onDelete()}>
                <BackspaceIcon />
            </IconButton>
        </ListItemSecondaryAction>)}
    </ListItem>);

}