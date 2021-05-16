import { makeStyles, Paper } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../services/StoreService";
import { ReactionCounter } from "./ReactionCounter";
import { ReactionName, reactionsIcons } from "../../util/reactionsEnum";
import { useBackEndSocket } from '../../services/BackEndService';

export function ReactionReceiveView() {
    const reactions = [
        ReactionName.HEART,
        ReactionName.HAPPY,
        ReactionName.SAD,
        ReactionName.UP,
        ReactionName.DOWN,
    ];
    const { socketEmiter } = useBackEndSocket();
    const store = useContext(StoreContext);
    const refreshReactions = (payload: ReactionResponsePayload) => {
        // let index = Math.floor(Math.random()* 5);
        let indexString: ReactionName = payload.data.reaction;
        let index = reactions.indexOf(indexString);
        let tmpValues = store.reactionValues;
        tmpValues[index]++;
        store.reactionValues = tmpValues;
        store.lastReactionTime = Date.now()+15000;
    };    
    useEffect(() => {
        const interval = setInterval(() => {
            if(store.lastReactionTime !== 0 && Date.now() - store.lastReactionTime >= 0){
                store.reactionValues = [0,0,0,0,0];
                store.lastReactionTime = 0;
                console.log(store.lastReactionTime - store.lastReactionTime)
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
            justifyContent: "flex-start",
            gap: 30,
            overflow: "hidden",
        },
    })();

    return (
        <Paper className={classes.root} variant="outlined" square>
            {reactions.map((reaction, i) => {
                return (<ReactionCounter
                    icon={reactionsIcons[reaction]}
                    index={i}
                />);
            })}
        </Paper>
    );
}
