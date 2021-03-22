import React from "react";
import { Fab, CircularProgress, CssBaseline } from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CheckIcon from '@material-ui/icons/Check';
import clsx from "clsx";
import 'fontsource-roboto';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated,
      light: "#80A3E4",
      main: "#4870AC",
      // dark: "#404756",
      // contrastText: will be calculated,
    },
    secondary: {
      light: "#FFEECB",
      main: "#D9A21B",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

const useStyles = makeStyles({
  root: {
    background: theme.palette.secondary.light,
    color: "#fff",
    gap: "50px",
    minHeight: "100vh",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  wrapper: {
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  sessionBtn: {
    width: "200px",
    height: "200px",
    fontSize: "150px",
  },
  header: {
    fontSize: "90px",
    color: theme.palette.primary.dark,
  },
});

function App() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();
  const buttonClassname = clsx({
    [classes.sessionBtn]:1,
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <h1
         className={classes.header}
        >
          Stwórz sesję
        </h1>
        <div className={classes.wrapper}>
          <Fab
            aria-label="save"
            color="primary"
            className={buttonClassname}
            onClick={handleButtonClick}
          >
            {success ? <CheckIcon 
              fontSize="inherit"
            /> : <PlayArrowIcon 
              fontSize="inherit"
            />}
          </Fab>
          {loading && (
            <CircularProgress 
             size={210} 
             className={classes.fabProgress} 
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
