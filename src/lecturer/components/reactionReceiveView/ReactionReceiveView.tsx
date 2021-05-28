import { makeStyles, Paper } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../services/StoreService";
import { ReactionCounter } from "./ReactionCounter";
import { reactionsIcons } from "../../../common/util/reactions/icons";
import { useSocket } from "../../services/SocketService";
import { ReactionName } from "../../../common/util/reactions/enum";
import { ReactionProgress } from "./ReactionProgress";

export function ReactionReceiveView() {
    const reactions = [
        ReactionName.HEART,
        ReactionName.HAPPY,
        ReactionName.SAD,
        ReactionName.UP,
        ReactionName.DOWN,
    ];
    // hotfix by me
    // TODO get reaction index with string sent with payload
    // TODO make it work nice and properly, because I do not know how 
    const reactionsString = [
        "HEART",
        "HAPPY",
        "SAD",
        "UP",
        "DOWN"
    ];
    const TIME_WAITING = 20000;
    const { socketEmiter } = useSocket();
    const store = useContext(StoreContext);
    const refreshReactions = (payload?: ReactionResponsePayload) => {
        let index: number;
        if (payload) {
            let indexString: string = payload.data.reaction;
            index = reactionsString.indexOf(indexString);
        } else {
            index = Math.round(Math.random() * reactionsString.length);
        }
        let tmpValues = store.reactionValues;
        tmpValues[index]++;
        store.reactionValues = tmpValues;
        if(!store.reactionModes[index] || store.lastReactionTime > 0)
            store.lastReactionTime = Date.now() + TIME_WAITING;
    };
    const [progressEnabled, setProgressEnabled] = useState<boolean>(!store.reactionModes.reduce((acc, mode) =>{
        return acc && mode;
    }))

    const resetReactions = () => {
        let newReactions: number[] = [];
        store.reactionModes.forEach((mode, i) => {
            if (mode)
                newReactions.push(store.reactionValues[i]);
            else
                newReactions.push(0);
        })
        return newReactions;
    }

    const updateModes = (index: number) => {
        let modes = store.reactionModes;
        let values = store.reactionValues;
        if(modes[index] && store.lastReactionTime === 0) values[index] = 0;
        modes[index] = !modes[index];
        store.reactionModes = modes;
        if(modes[index]) store.reactionValues = values;
        setProgressEnabled(!modes.reduce((acc, mode) =>{
            return acc && mode;
        }))
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (store.lastReactionTime !== 0 && Date.now() - store.lastReactionTime >= 0) {
                store.reactionValues = resetReactions();
                store.lastReactionTime = 0;
            }
        }, 500);
        return () => clearInterval(interval);
    }, [store, store.lastReactionTime]);

    useEffect(() => {
        socketEmiter.on("send_student_reaction", refreshReactions);
        return () => {
            socketEmiter.off("send_student_reaction", refreshReactions);
        };
    }, [refreshReactions, socketEmiter]);

    const classes = makeStyles({
        reactionWrapper: {
            padding: 10,
            display: "flex",
            justifyContent: "center",
            gap: 30,
            overflow: "hidden",
        },
    })();

    return (
        <Paper variant="outlined" square>
            {progressEnabled && <ReactionProgress time={TIME_WAITING}/>}
            <div className={classes.reactionWrapper}>
            {reactions.map((reaction, i) => {
                return (<ReactionCounter
                    icon={reactionsIcons[reaction]}
                    value={store.reactionValues[i]}
                    currentMode={store.reactionModes[i]}
                    onMode={() => updateModes(i)}
                />);
            })}
            </div>
        </Paper>
    );
}
