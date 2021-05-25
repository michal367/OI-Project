import IconButton from '@material-ui/core/IconButton';
import { ReactionName } from '../../../common/util/reactions/enum';
import { reactionsIcons } from '../../../common/util/reactions/icons';


export interface ReactionItemProps {
    classes?: {
        button?: string
    }
    name: ReactionName;
    onClick?: (reaction: ReactionName) => void;
}

export function ReactionItem(props: ReactionItemProps) {

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