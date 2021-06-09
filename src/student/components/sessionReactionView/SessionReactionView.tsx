import { makeStyles, Paper } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { REACTION_TIMEOUT } from '../../../common/util/globalConfig';
import { ReactionName } from '../../../common/util/reactions/enum';
import { useSocket } from '../../services/SocketService';
import { ReactionItem } from './ReactionItem';
interface SessionReactionViewProps {
    onReaction?: (reaction: ReactionName) => void
}
export default function SessionReactionView(props: SessionReactionViewProps) {
    const [reactionSend, setReactionSend] = useState(false);
    const [, setTimeoutId] = useState<NodeJS.Timeout>();

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
            fontSize: "2.2rem",
            transition: "transform .1s",
            transform: "scale(1)",
            '&.touched': {
                transition: "transform .3s",
                color: "#80a3e4",
                transform: "scale(1.2)"
            }
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
            data: {
                reaction: reaction
            }
        };
        console.log(payload);
        sendJsonMessage(payload);
        setReactionSend(true);
        setTimeoutId((prev) => {
            if (prev) clearTimeout(prev);
            return setTimeout(() => {
                setReactionSend(false);
            }, REACTION_TIMEOUT);
        });
    }

    useEffect(() => {
        return () => {
            setTimeoutId((prev) => {
                if (prev) clearTimeout(prev);
                return undefined;
            });
        }
    }, []);


    return (
        <Paper className={classes.details} variant="outlined" square >
            {reactions.map((reaction) => <ReactionItem touchDuration={REACTION_TIMEOUT} disabled={reactionSend} classes={classes} key={reaction} name={reaction} onClick={onReaction} />)}
        </Paper>
    );
}

