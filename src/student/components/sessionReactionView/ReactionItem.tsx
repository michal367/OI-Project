import IconButton from '@material-ui/core/IconButton';
import { useCallback, useEffect, useState } from 'react';
import { ReactionName } from '../../../common/util/reactions/enum';
import { reactionsIcons } from '../../../common/util/reactions/icons';


export interface ReactionItemProps {
    classes?: {
        button?: string;
    }
    name: ReactionName;
    disabled?: boolean;
    touchDuration?: number;
    onClick?: (reaction: ReactionName) => void;
}

export function ReactionItem(props: ReactionItemProps) {
    const [touched, setTouched] = useState(false);
    const [, setTimeoutId] = useState<NodeJS.Timeout>();

    const onClick = useCallback(
        () => {
            if (props.onClick)
                props.onClick(props.name);

            setTouched(true);
            setTimeoutId((prev) => {
                if (prev) clearTimeout(prev);
                return setTimeout(() => {
                    setTouched(false);
                }, props.touchDuration ?? 1000);
            });
        },
        [props]
    );

    useEffect(() => {
        return () => {
            setTimeoutId((prev) => {
                if (prev) clearTimeout(prev);
                return undefined;
            });
        }
    }, []);

    return (
        <IconButton disabled={props.disabled} onClick={onClick} className={props.classes?.button + (touched ? " touched" : "")} >
            {reactionsIcons[props.name]}
        </IconButton >
    );

}