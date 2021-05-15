import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputBase,
} from "@material-ui/core";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import { makeStyles, useTheme } from "@material-ui/core";
import { useState } from "react";
import { testData } from "./testData";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {`${
            Math.round(
              props.value,
            )
          }%`}
        </Typography>
      </Box>
    </Box>
  );
}

export function QuizStatsView() {

  const [quizes, ] = useState<Statistic>(testData());
  const [progress, ] = useState<number[]>([50, 70]);
  const [currentQuiz, setCurrentQuiz] = useState<QuizStat>(
    quizes.quizes[0],
  );
  const [currentQuestion, setCurrentQuestion] = useState<QuestionStat>(
    quizes.quizes[0].questions[0],
  );

  const theme = useTheme();

  const classes = makeStyles({
    root: {
      background: theme.palette.primary.light,
      maxHeight: "100vh",
      height: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      position: "absolute",
      width: "100%",
      top: 0,
      zIndex: -1,
      padding: "0 10px",
      paddingTop: 60,
      paddingBottom: 100,
      gap: 30,
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#1a90ff",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    column: {
      height: "100%",
      width: "100%",
      marginBottom: "auto",
      display: "flex",
      flexDirection: "column",
    },
    columnWrapper: {
      flexGrow: 1,
      overflow: "auto",
      maxHeight: "calc(100% - 100px)",
    },
    columnFooter: {
      maxHeight: "100px",
      flexShrink: 0,
    },
    button: {
      marginLeft: "auto",
      marginBottom: "auto",
    },
    margin: {
      margin: theme.spacing(1),
    },
  })();

  const handleQuiz = (quizNumber: number) => {
    console.log(quizNumber);
    console.log(quizes);
    setCurrentQuiz(quizes.quizes[quizNumber]);
    setCurrentQuestion(currentQuiz.questions[0]);
  };

  const handleQuestion = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (typeof (event.target.value) == "number") {
      setCurrentQuestion(currentQuiz.questions[event.target.value]);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.column}>
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
      </div>
    </div>
  );
}
