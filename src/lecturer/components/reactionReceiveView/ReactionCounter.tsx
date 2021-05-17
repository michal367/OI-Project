import { Chip, makeStyles, Slide } from "@material-ui/core";
import React, {
    JSXElementConstructor,
    ReactElement,
    useEffect,
    useState,
} from "react";

interface ReactionCounterProps {
    icon: ReactElement<any, string | JSXElementConstructor<any>>;
    value: number;
}

export function ReactionCounter(props: ReactionCounterProps) {
    const [value, setValue] = useState<number>(props.value);
    const [changed, setChanged] = useState<boolean>(true);
    const classes = makeStyles({
        reaction: {
            minWidth: 70,
            fontSize: 16,
        }
    })();

    useEffect(() => {
        setChanged(false);
        setValue(props.value);
        setTimeout(() => {
            setChanged(true);
        }, 150)
    }, [props.value]);

    return (
        <Slide direction="up" in={changed} mountOnEnter timeout={{ appear: 200, enter: 200, exit: 400 }}>
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
