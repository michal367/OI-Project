import IconButton from '@material-ui/core/IconButton';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import SentimentDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

export enum ReactionName {
    SAD = "SAD",
    HAPPY = "HAPPY",
    UP = "UP",
    DOWN = "DOWN",
    HEART = "HEART",
}

const reactionsIcons = {
    [ReactionName.HAPPY]: <SentimentSatisfiedOutlinedIcon fontSize="inherit" />,
    [ReactionName.SAD]: <SentimentDissatisfiedOutlinedIcon fontSize="inherit" />,
    [ReactionName.UP]: <ThumbUpAltOutlinedIcon fontSize="inherit" />,
    [ReactionName.DOWN]: <ThumbDownOutlinedIcon fontSize="inherit" />,
    [ReactionName.HEART]: <FavoriteOutlinedIcon fontSize="inherit" />,
}

interface ReactionItemProps {
    classes?: {
        button?: string
    }
    name: ReactionName;
    onClick?: (reaction: ReactionName) => void;
}

export default function ReactionItem(props: ReactionItemProps) {

    const onClick = () => {
        if (props.onClick)
            props.onClick(props.name);
    }

    return (
        <IconButton onClick={onClick} className={props.classes?.button} >
            {reactionsIcons[props.name]}
        </IconButton >
    );

}