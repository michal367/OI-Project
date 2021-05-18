import { Chip, makeStyles, Slide } from "@material-ui/core";
import React, {
    JSXElementConstructor,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from "react";
import { useThrottle } from 'use-lodash-debounce-throttle';
import { delay } from "../../util/delay";

interface ReactionCounterProps {
    icon: ReactElement<any, string | JSXElementConstructor<any>>;
    value: number;
}

export function ReactionCounter(props: ReactionCounterProps) {
    const [value, setValue] = useState<number>(props.value);
    const [changed, setChanged] = useState<boolean>(true);
    
    

    const animate = useThrottle((async () => { 
        setChanged(false);

        await delay(150);

        setChanged(true);
    }), 2000, { leading: true })

    const classes = makeStyles({
        reaction: {
            minWidth: 70,
            fontSize: 16,
        }
    })();

    useEffect(() => {
        animate()
        setValue(props.value);
    }, [props.value]);

    return (
        <Slide direction="up" in={changed} mountOnEnter timeout={{ appear: 1000, enter: 600, exit: 800 }}>
            <Chip
                variant="outlined"
                color="primary"
                icon={props.icon}
                label={value}
                className={classes.reaction}
            />
        </Slide>
    );
}
