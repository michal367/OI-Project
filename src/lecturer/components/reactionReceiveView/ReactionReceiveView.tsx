import { makeStyles, Paper } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../services/StoreService";
import { ReactionCounter } from "./ReactionCounter";
import { reactionsIcons } from "../../../common/util/reactions/icons";
import { useSocket } from "../../services/SocketService";
import { ReactionName } from "../../../common/util/reactions/enum";

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
        store.lastReactionTime = Date.now() + 15000;
    };

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
        modes[index] = !modes[index];
        store.reactionModes = modes;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (store.lastReactionTime !== 0 && Date.now() - store.lastReactionTime >= 0) {
                store.reactionValues = resetReactions();
                store.lastReactionTime = 0;
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [store, store.lastReactionTime]);

    useEffect(() => {
        socketEmiter.on("send_student_reaction", refreshReactions);
        return () => {
            socketEmiter.off("send_student_reaction", refreshReactions);
        };
    }, [refreshReactions, socketEmiter]);

    const classes = makeStyles({
        root: {
            padding: 10,
            display: "flex",
            justifyContent: "center",
            gap: 30,
            overflow: "hidden",
        },
    })();

    return (
        <Paper className={classes.root} variant="outlined" square>
            {reactions.map((reaction, i) => {
                return (<ReactionCounter
                    icon={reactionsIcons[reaction]}
                    value={store.reactionValues[i]}
                    currentMode={store.reactionModes[i]}
                    onMode={() => updateModes(i)}
                />);
            })}
        </Paper>
    );
}
