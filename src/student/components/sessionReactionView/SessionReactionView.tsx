import { makeStyles, Paper } from '@material-ui/core';
import { useSocket } from '../../services/SocketService';
import { ReactionName } from '../../util/reactionsEnum';
import { ReactionItem } from './ReactionItem';
interface SessionReactionViewProps {
    onReaction?: (reaction: ReactionName) => void
}
export default function SessionReactionView(props: SessionReactionViewProps) {
    const { sendJsonMessage } = useSocket();
    const classes = makeStyles({
        details: {
            padding: 20,
            height: "100%",
            maxHeight: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap"
        },
        button: {
            fontSize: "2.2rem"
        }
    })();

    const reactions = [
        ReactionName.HEART,
        ReactionName.HAPPY,
        ReactionName.SAD,
        ReactionName.UP,
        ReactionName.DOWN,
    ]

    const onReaction = (reaction: ReactionName) => {
        if (props.onReaction) props.onReaction(reaction);
        console.log(reaction);
        const payload: ReactionRequestPayload = {
            event: "send_reaction",
            data:{
                reaction: reaction
            }
        };
        console.log(payload);
        sendJsonMessage(payload);
    }

    return (
        <Paper className={classes.details} variant="outlined" square >
            {reactions.map((reaction) => <ReactionItem classes={classes} key={reaction} name={reaction} onClick={onReaction} />)}
        </Paper>
    );
}

