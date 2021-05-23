import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import SentimentDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

export enum ReactionName {
    HAPPY = "HAPPY",
    SAD = "SAD",
    UP = "UP",
    DOWN = "DOWN",
    HEART = "HEART"
}

export const reactionsIcons = {
    [ReactionName.HAPPY]: <SentimentSatisfiedOutlinedIcon fontSize="inherit" />,
    [ReactionName.SAD]: <SentimentDissatisfiedOutlinedIcon fontSize="inherit" />,
    [ReactionName.UP]: <ThumbUpAltOutlinedIcon fontSize="inherit" />,
    [ReactionName.DOWN]: <ThumbDownOutlinedIcon fontSize="inherit" />,
    [ReactionName.HEART]: <FavoriteOutlinedIcon fontSize="inherit" />,
}