import { Paper, makeStyles, Button, useTheme } from "@material-ui/core";
import { timestampMock } from "../../util/mockData";
import {TimestampRow} from "./TimestampRow";
import { useState } from "react";
import Timeline from '@material-ui/lab/Timeline';
export function TimestampTable() {
    const [filterType, setFilterType] = useState("QuestionType");
    const theme = useTheme();
    const changeFilterType = (type: string) =>{
        setFilterType(type);
    }

    const classes = makeStyles({
        logsWraper: {
            width: "100%",
            borderRadius: "0",
            height: "600px",
            background: theme.palette.secondary.light,
            display: "flex",
            flexDirection: "column",
        },
        buttonBar: {
            width:"100%",
            flexShrink: 0,
            flexGrow: 0,
            height: "fit-content",
            display: "flex",
            flexWrap: "nowrap",
        },
        timelineWrapper:{
            width:"100%",
            boxSizin: "border-box",
            padding: 10,
            overflow:"auto",
            height: "100%",
            flexGrow: 1,
            flexShrink: 1,
        },
        button:{
            width: "100%",
            flexShrink: 1,
        },
        timeline:{
            display: "block",
            width: "100%",
            height: "100%",
            transform: "translateX(-40%)",
        },
    })();


    return (
        <Paper className={classes.logsWraper} variant="outlined" square>
            <div className={classes.buttonBar}>
                <Button variant={filterType === "LogType" ? "contained" : "outlined"} color="primary" className={classes.button} onClick={() => changeFilterType("LogType")}>Dołączanie i opuszczanie</Button>
                <Button variant={filterType === "QuestionType" ? "contained" : "outlined"} color="primary" className={classes.button} onClick={() => changeFilterType("QuestionType")}>Pytania</Button>
                <Button variant={filterType === "ReactionType" ? "contained" : "outlined"} color="primary" className={classes.button} onClick={() => changeFilterType("ReactionType")}>Reakcje</Button>
                <Button variant={filterType === "QuizType" ? "contained" : "outlined"} color="primary" className={classes.button} onClick={() => changeFilterType("QuizType")}>Odpowiedzi na quiz</Button>
                <Button variant={filterType === "" ? "contained" : "outlined"} color="primary" className={classes.button} onClick={() => changeFilterType("")}>Wszystkie</Button>
            </div>
            <div className={classes.timelineWrapper}>
                <Timeline  className={classes.timeline}>
                    {timestampMock.filter(timestamp => timestamp.type === filterType || filterType === "").map((timestamp) => {
                        return(
                                <TimestampRow owner={timestamp.owner} message={timestamp.message} hours={timestamp.hours} minutes={timestamp.minutes}/>
                        )
                    })}
                </Timeline>
            </div>
        </Paper>
    );
}

export default TimestampTable;