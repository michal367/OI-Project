import { Button, Card, makeStyles, Paper, useTheme, withStyles } from "@material-ui/core";
import { Timeline, ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../services/StoreService";
import { TimestampRow } from "./TimestampRow";
import HelpIcon from '@material-ui/icons/Help';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import StarsIcon from '@material-ui/icons/Stars';
import ReactScrollableFeed from 'react-scrollable-feed';

export function TimestampTable() {

    const store = useContext(StoreContext);
    const [filterTypes, setFilterTypes] = useState<TimestampType[]>(() => ["LogType"]);
    const [timestamps, setTimestamps] = useState(store.timestamps);
    useEffect(() => setTimestamps(store.timestamps), [store.timestamps]);

    const theme = useTheme();
    const changeFilterType = (event: React.MouseEvent<HTMLElement>, newFilters: TimestampType[]) => {
        if (newFilters.length)
            setFilterTypes(newFilters);
    }
    const getIcon = (type: TimestampType) => {
        switch(type){
            case"QuestionType":
                return(<HelpIcon fontSize="small" />);
            case"LogType":
                return(<AccountCircleIcon fontSize="small" />);
            case"QuizType":
                return(<CheckCircleIcon fontSize="small" />);
            case"ReactionType":
                return(<StarsIcon fontSize="small" />);
            default:
                return(<></>);
        }
    }

    const classes = makeStyles({
        logsCard: {
            width: "100%",
            minHeight: 400,
            maxHeight: 700,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
        },
        toggleButtonBar: {
            width: "100%",
            flexShrink: 0,
            borderRadius: "5px 5px 0 0",
            background: theme.palette.secondary.light,
            display: "flex",
        },
        timelineWrapper: {
            width: "100%",
            boxSizing: "border-box",
            padding: 10,
            overflow: "auto",
            flexGrow: 1,
            "&:after":{
                width: "90%",
                position: "absolute",
                content: '""',
                display: "block",
                top: 54,
                left: 0,
                borderTop: "15px solid white",
                borderBottom: "15px solid white",
                height: "calc(100% - 54px)",
            },
        },
        timeline: {
            width: "min(700px, 100vw)",
            display: "block",
            transform: "translateX(-30%)",
            position: "relative",
        },
    })();

    const FilterToggleGroup = withStyles((theme) => ({
        grouped: {
          margin: theme.spacing(0.5),
          border: 'none',
          flexShrink: 1,
          flexGrow: 1,
          '&:not(:first-child)': {
            borderRadius: theme.shape.borderRadius,
          },
          '&:first-child': {
            borderRadius: theme.shape.borderRadius,
          },
          "&.Mui-selected":{
            background: theme.palette.secondary.main,
            color: "white",
          }
        },
      }))(ToggleButtonGroup);

    return (
        <Card className={classes.logsCard}>
                <FilterToggleGroup
                    value={filterTypes}
                    onChange={changeFilterType}
                    className={classes.toggleButtonBar}
                >
                    <ToggleButton value="LogType">Dołączanie i opuszczanie</ToggleButton>
                    <ToggleButton value="QuestionType">Zadane Pytania</ToggleButton>
                    <ToggleButton value="ReactionType">Wysłane Reakcje</ToggleButton>
                    <ToggleButton value="QuizType">Odpowiedzi na quiz</ToggleButton>
                </FilterToggleGroup>
            <div className={classes.timelineWrapper}>
                <Timeline className={classes.timeline}>
                    <ReactScrollableFeed>
                    {timestamps.filter(timestamp => filterTypes.some(type => type === timestamp.type)).map((timestamp) => {
                        return (
                            <TimestampRow 
                                owner={timestamp.owner} 
                                message={timestamp.message} 
                                hours={timestamp.hours} 
                                minutes={timestamp.minutes} 
                                icon={getIcon(timestamp.type)}
                            />
                        )
                    })}
                    </ReactScrollableFeed>
                </Timeline>
            </div>
        </Card>
    );
}

export default TimestampTable;