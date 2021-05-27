import { LinearProgress, useTheme } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../services/StoreService";

interface ReactionProgressProps {
    time: number;
}

export function ReactionProgress(props: ReactionProgressProps) {
    const theme = useTheme();
    const store = useContext(StoreContext);
    const getProgress = () => {
        return Math.min(
            100,
            Math.max(
                0,
                (store.lastReactionTime - Date.now()) * 100 / (props.time-1000)
            )
        );
    }
    const [progress, setProgress] = useState(getProgress());
    useEffect(() => {
        const interval = setInterval(() => {
            if (store.lastReactionTime - Date.now() >= 0 || progress > 0)
                setProgress(getProgress())
        }, 800);
        return () => clearInterval(interval);
    }, [store, store.lastReactionTime]);
    return <LinearProgress color="secondary" variant="determinate" value={progress} />;
}