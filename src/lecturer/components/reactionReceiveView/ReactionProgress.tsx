import { LinearProgress, makeStyles, useTheme } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../services/StoreService";

interface ReactionProgressProps {
    time: number;
}

export function ReactionProgress(props: ReactionProgressProps) {
    const theme = useTheme();
    const classes = makeStyles({
        progress:{
            maxWidth: 470,
            margin: "0 auto",
            borderRadius: "0 0 20px 20px",
            height: 5,
        }
    })();
    const store = useContext(StoreContext);
    const getProgress = () => {
        return Math.min(
            100,
            Math.max(
                0,
                (store.lastReactionTime - Date.now())
            ) * 112 / props.time
        );
    }
    const [progress, setProgress] = useState(getProgress());
    useEffect(() => {
        const interval = setInterval(() => {
            if (store.lastReactionTime - Date.now() >= 0 || progress > 0)
                setProgress(getProgress())
        }, 200);
        return () => clearInterval(interval);
    }, [store, store.lastReactionTime]);
    return <LinearProgress
        color="primary"
        variant="determinate"
        value={progress}
        className={ classes.progress }
    />;
}