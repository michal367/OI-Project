import { Chip,  makeStyles, Slide } from "@material-ui/core";
import React, {
    JSXElementConstructor,
    ReactElement,
    useContext,
    useEffect,
    useState,
} from "react";
import { StoreContext } from "../../services/StoreService";

interface ReactionCounterProps {
    icon: ReactElement<any, string | JSXElementConstructor<any>>;
    index: number;
}

export function ReactionCounter(props: ReactionCounterProps) {
    const store = useContext(StoreContext);
    const [value, setValue] = useState<number>(store.reactionValues[props.index]);
    const [changed, setChanged] = React.useState<boolean>(true);
    const classes = makeStyles({
        reaction: {
            minWidth: 70,
            fontSize: 16,
        }
    })();

    useEffect(() => {
        setChanged(false);
        setValue(store.reactionValues[props.index]);
        setTimeout(() => {
            setChanged(true);
        },150)
    }, [store.reactionValues[props.index]]);
    
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
