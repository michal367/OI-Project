import { makeStyles, Paper } from "@material-ui/core";
import React, { useContext, useCallback, useEffect, useState } from "react";
import { StoreContext } from "../../services/StoreService";
import { ReactionCounter } from "./ReactionCounter";
import { reactionsIcons } from "../../../common/util/reactions/icons";
import { ReactionName } from "../../../common/util/reactions/enum";
import { ReactionProgress } from "./ReactionProgress";
import { useSocket } from "../../services/SocketService";

export function ReactionReceiveView() {
    const store = useContext(StoreContext);
    const { socketEmiter } = useSocket();

    const reactions = [
        ReactionName.HEART,
        ReactionName.HAPPY,
        ReactionName.SAD,
        ReactionName.UP,
        ReactionName.DOWN,
    ];
    
    const [progressEnabled, setProgressEnabled] = useState<boolean>(!store.reactionModes.reduce((acc, mode) => {
        return acc && mode;
    }))

    const [reactionModes, setReactionModes] = useState<boolean[]>(store.reactionModes);
    const [reactionValues, setReactionValues] = useState<number[]>(store.reactionValues);
    useEffect(() => {
        setReactionModes(store.reactionModes);
        setProgressEnabled(!store.reactionModes.reduce((acc, mode) => {
            return acc && mode;
        }));
    }, [store.reactionModes, store]);
    useEffect(() => setReactionValues(store.reactionValues), [store.reactionValues, store]);

    const resetReactions = () => {
        let newReactions: number[] = [];
        reactionModes.forEach((mode, i) => {
            if (mode)
                newReactions.push(reactionValues[i]);
            else
                newReactions.push(0);
        })
        return newReactions;
    }

    const updateModes = (index: number) => {
        let modes = store.reactionModes;
        let values = store.reactionValues;
        if (modes[index] && store.lastReactionTime === 0) {
            values[index] = 0;
            store.reactionValues = values;
        };
        modes[index] = !modes[index];
        store.reactionModes = modes;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (store.lastReactionTime !== 0 && Date.now() - store.lastReactionTime >= 0) {
                store.reactionValues = resetReactions();
                store.lastReactionTime = 0;
            }
        }, 500);
        return () => clearInterval(interval);
    }, [store, store.lastReactionTime, resetReactions]);

    const classes = makeStyles({
        reactionWrapper: {
            padding: 10,
            display: "flex",
            justifyContent: "center",
            gap: 30,
            overflow: "hidden",
        },
    })();
    const TIME_WAITING = 20000;
    return (
        <Paper variant="outlined" square>
            {progressEnabled && <ReactionProgress time={TIME_WAITING} />}
            <div className={classes.reactionWrapper}>
                {reactions.map((reaction, i) => {
                    return (<ReactionCounter
                        icon={reactionsIcons[reaction]}
                        value={reactionValues[i]}
                        currentMode={reactionModes[i]}
                        onMode={() => updateModes(i)}
                    />);
                })}
            </div>
        </Paper>
    );
}
