import { makeStyles, Paper } from '@material-ui/core';
import ReactionItem, { ReactionName } from './ReactionItem';
interface SessionReactionViewProps {
    onReaction?: (reaction: ReactionName) => void
}

export default function SessionReactionView(props: SessionReactionViewProps) {
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
    }

    return (
        <Paper className={classes.details} variant="outlined" square >
            {reactions.map((reaction) => <ReactionItem classes={classes} key={reaction} name={reaction} onClick={onReaction} />)}
        </Paper>
    );
}

