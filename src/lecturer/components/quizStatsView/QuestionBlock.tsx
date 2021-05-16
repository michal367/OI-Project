import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, useTheme } from "@material-ui/core";
import React, { useContext } from "react";
import { StoreContext } from "../../services/StoreService";
import { AnswerBar } from "./AnswerBar";

interface QuestionBlockProps {
    question: Question,
    questionStat: QuestionStat
    totalSelected: number
}

export function QuestionBlock(props: QuestionBlockProps) {
    const store = useContext(StoreContext);
    const theme = useTheme();
    const classes = makeStyles({
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
    })();
    return (<Paper
        variant="outlined"
        square
        className={classes.question}
    >
        <Accordion>
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
            {(props.questionStat.options ?? []).sort((a, b) => a.index - b.index)
                .map((answerStat, k) => {
                    let option = (props.question?.options) ? (props.question.options[k]) : (undefined);
                    return option && (<AnswerBar
                        answer={option}
                        selected={answerStat.numberOfTimesSelected}
                        totalSelected={props.totalSelected}
                    />)
                })
            }
        </div>
    </Paper>)
}