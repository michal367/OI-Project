import { useState, useRef, useEffect } from "react";
import { Fab, CircularProgress } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CheckIcon from "@material-ui/icons/Check";
import clsx from "clsx";
import "fontsource-roboto";

function CreateSession() {
  const theme = useTheme();

  const useStyles = makeStyles({
    root: {
      background: theme.palette.secondary.light,
      gap: "50px",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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

  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();
  const buttonClassname = clsx({
    [classes.sessionBtn]: 1,
    [classes.buttonSuccess]: success,
  });

  useEffect(() => {
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
    <div className={classes.root}>
      <h1 className={classes.header}>Stwórz sesję</h1>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={handleButtonClick}
        >
          {success ? (
            <CheckIcon fontSize="inherit" />
          ) : (
            <PlayArrowIcon fontSize="inherit" />
          )}
        </Fab>
        {loading && (
          <CircularProgress size={210} className={classes.fabProgress} />
        )}
      </div>
    </div>
  );
}

export default CreateSession;
