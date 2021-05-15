import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BackspaceIcon from '@material-ui/icons/Backspace';
import PublishIcon from "@material-ui/icons/Assignment";
import { makeStyles, useTheme } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import React, { ReactNode, useContext, useEffect } from "react";
import GetAppIcon from '@material-ui/icons/GetApp';
import { StoreContext } from "../../services/StoreService";
import { AnswerBar } from "./AnswerBar";
import { green } from "@material-ui/core/colors";
import DoneIcon from '@material-ui/icons/Done';
import Async from 'react-promise';
import usePromise from "react-promise";

interface QuestionBlockProps{
    question: Question,
    questionStat: QuestionStat
    totalSelected: number
}

export function QuestionBlock(props: QuestionBlockProps) {
    const store = useContext(StoreContext);
    const getContent = () => {
        return new Promise<ReactNode>((resolve) => {resolve(<><Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h5" component="h1">
                    {props.question.title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{props.question?.text}</Typography>
            </AccordionDetails>
        </Accordion>
        <div className={classes.answersGrid}>
            {(props.questionStat.options ?? []).sort((a, b) => a.index - b.index).map((answerStat, k) => {
                let option = (props.question?.options) ? (props.question.options[k]) : (undefined);
                return option ? (<AnswerBar
                    answer={option}
                    selected={answerStat.numberOfTimesSelected}
                    totalSelected={props.totalSelected}
                />) : (<></>)
            }
            )}
        </div></>)});
    }
    const {value, loading} = usePromise<ReactNode>(getContent)
    const theme = useTheme();
    const classes = makeStyles({
        root: {
            background: theme.palette.primary.light,
            maxHeight: "100vh",
            height: "100vh",
            display: "grid",
            gridTemplateColumns: "400px 1fr",
            position: "absolute",
            width: "100%",
            top: 0,
            zIndex: -1,
            padding: "0 10px",
            paddingTop: 60,
            paddingBottom: 100,
            gap: 15,
        },
        quizColumn: {
            height: "80vh",
            overflow: "auto",
            width: "100%",
            marginBottom: "auto",
            display: "flex",
            flexDirection: "column",
            "& Mui-expanded": { marginBottom: 0 },
            "& li .MuiListItemSecondaryAction-root":{
                display: "none",
            },
            "& li:hover .MuiListItemSecondaryAction-root":{
                display: "block",
            },
        },
        statsColumn: {
            height: "80vh",
            overflow: "auto",
            width: "100%",
            marginBottom: "auto",
            display: "grid",
            gap: 20,
            padding: 20,
            gridTemplateColumns: "1fr 1fr",
            gridAutoRows: "calc(50% - 10px)",
            "&:after": {
                gridColumn: "span 2",
                height: "10px",
                marginTop: "-10px",
                content: '""',
            },
        },
        quizStatRow:{
            paddingTop: 16,
            paddingBottom: 16,
        },
        question: {
            height: "100%",
            width: "100%",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            "& .MuiCollapse-wrapperInner": {
                maxHeight: 118,
                overflow: "auto",
            },
        },
        answersGrid: {
            width: "100%",
            height: "100%",
            overflow: "auto",
            padding: 10,
            gap: 10,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridAutoRows: "max(calc((100% - 20px) / 3), fit-content, 50px)",
            "&:after": {
                gridColumn: "span 2",
                height: "10px",
                marginTop: "-10px",
                content: '""',
            },
        },
        answer: {
            width: "100%",
            height: "100%",
            position: "relative",
        },
        answerChild: {
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
        action: {
            position: "absolute",
            bottom: 20,
            left: 20,
            display: "flex",
            gap: 20,
        },
        importExport: {
            overflow: "hidden",
            padding: 0,
            "& .MuiFab-label": {
                height: "100%",
            },
            height: 55,
        },
        importExportGroup: {
            width: "100%",
            height: "100%",
        },
        importExportButton: {
            padding: "0 10",
            fontSize: "16px",
            width: 144,
            "& span": {
                display: "flex",
                gap: 10,
            },
        },
        shareFab: {
            height: 55,
            fontSize: 16,
            marginRight: "20px"
        }
    })();
    return (<Paper
    variant="outlined"
    square
    className={classes.question}
>
    {loading ? <></> : value}
</Paper>)
}