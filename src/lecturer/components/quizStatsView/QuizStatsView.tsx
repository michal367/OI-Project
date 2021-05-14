import {
    Box,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    LinearProgress,
    TextField,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    InputBase,
} from "@material-ui/core";
import CircularProgress, {
    CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, useTheme } from "@material-ui/core";
import React, { useCallback } from "react";
import { testData } from "./testData";
import { AnswerBar } from "./AnswerBar";

export function QuizStatsView() {
    const [quizes, setQuizes] = React.useState<Statistic>(testData());
    const [currentQuiz, setCurrentQuiz] = React.useState<QuizStat>(
        quizes.quizes[0]
    );

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
            gap: 30,
        },
        quizColumn: {
            height: "85vh",
            overflow: "auto",
            width: "100%",
            marginBottom: "auto",
            display: "flex",
            flexDirection: "column",
        },
        statsColumn: {
            height: "85vh",
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
        question: {
            height: "100%",
            width: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
        },
        answersGrid: {
            width: "100%",
            height: "100%",
            overflow: "auto",
            padding: 10,
            gap: 10,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridAutoRows: "calc((100% - 20px) / 3)",
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
    })();

    const handleQuiz = (quizNumber: number) => {
        console.log(quizNumber);
        console.log(quizes);
        setCurrentQuiz(quizes.quizes[quizNumber]);
    };

    return (
        <div className={classes.root}>
            <Paper variant="outlined" square className={classes.quizColumn}>
                <List component="nav">
                    {quizes.quizes.map((quiz, i) => (
                        <ListItem
                            button
                            selected={quiz === currentQuiz}
                            onClick={(event) => handleQuiz(i)}
                        >
                            <ListItemText primary={quiz.title} />
                            {quiz === currentQuiz && (
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Paper variant="outlined" square className={classes.statsColumn}>
                {currentQuiz.questions.map((question, i) => (
                    <Paper
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
                                    {question.title}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{question.text}</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <div className={classes.answersGrid}>
                            {(question.options ?? []).map((answer, i) => (
                                <AnswerBar
                                    answer={answer}
                                    totalSelected={100}
                                />
                            ))}
                        </div>
                    </Paper>
                ))}
            </Paper>
            {/* <div className={classes.column}>
        <Grid container spacing={1}>
          {quizes.quizes.map((quiz, i) => (
            <>
              <Grid item xs={10}>
                <Button
                  fullWidth={true}
                  variant="contained"
                  color="secondary"
                  onClick={() => handleQuiz(i)}
                >
                  {quiz.title}
                </Button>
              </Grid>
              <Grid item xs={2}>
                <CircularProgressWithLabel value={progress[i]} />
              </Grid>
            </>
          ))}
        </Grid>
      </div>
      <div className={classes.column}>
        <FormControl className={classes.margin}>
          <InputLabel id="demo-customized-select-label">Question</InputLabel>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={currentQuiz.questions.indexOf(currentQuestion)}
            onChange={handleQuestion}
          >
            {currentQuiz.questions.map((question, i) => (
              <MenuItem value={i}>{question.text}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container spacing={1}>
          {currentQuestion.options.map((answer, i) => (
            <>
              <Grid item xs={10}>
                <TextField
                  fullWidth={true}
                  id={"outlined-basic-" + i}
                  variant="outlined"
                  defaultValue={answer.text}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
              <InputBase
                defaultValue={answer.selected + "%"}
                inputProps={{ 'aria-label': 'naked' }}
                />
              </Grid>
            </>
          ))}
        </Grid>
      </div> */}
        </div>
    );
}
