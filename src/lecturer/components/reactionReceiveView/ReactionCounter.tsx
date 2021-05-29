import { Chip, makeStyles, Slide } from "@material-ui/core";
import React, {
    JSXElementConstructor,
    ReactElement,
    useEffect,
    useState
} from "react";
import { useThrottle } from 'use-lodash-debounce-throttle';

const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

interface ReactionCounterProps {
    icon: ReactElement<any, string | JSXElementConstructor<any>>;
    value: number;
    currentMode: boolean;
    onMode: () => void;
}

export function ReactionCounter(props: ReactionCounterProps) {
    const [value, setValue] = useState<number>(props.value);
    const [changed, setChanged] = useState<boolean>(true);
    const [mode, setMode] = useState<boolean>(props.currentMode);

    const animate = useThrottle((async () => {
        setChanged(false);

        await delay(150);

        setChanged(true);
    }), 2000, { leading: true })

    const classes = makeStyles({
        reaction: {
            minWidth: 70,
            fontSize: 16,
        },
        modeReaction: {
            color: "white",
        }
    })();

    useEffect(() => {
        animate()
        setValue(props.value);
    }, [props.value, animate]);

    useEffect(() => {
        setMode(props.currentMode);
    }, [props.currentMode]);

    return (
        <Slide direction="up" in={changed} mountOnEnter timeout={{ appear: 1000, enter: 600, exit: 800 }}>
            <Chip
                variant={mode ? "default" : "outlined"}
                color="primary"
                icon={props.icon}
                label={value}
                className={classes.reaction + " " + (mode ? classes.modeReaction : "")}
                clickable
                onClick={(event) => { setMode(prev => !prev); props.onMode(); }}
            />
        </Slide>
    );
}
