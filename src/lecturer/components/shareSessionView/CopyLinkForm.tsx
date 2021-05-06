import {
    makeStyles,
    Button,
    ButtonGroup,
    PopperPlacementType,
    Popper,
    Paper,
    Typography,
    useTheme,
} from "@material-ui/core";
import copy from "copy-to-clipboard";
import { StoreContext } from "../../services/StoreService";
import React, { useContext } from "react";
import { green } from "@material-ui/core/colors";
import { useSpring, animated } from "react-spring";
import FileCopyRoundedIcon from "@material-ui/icons/FileCopyRounded";
interface CopyLinkFromProps {
    prefix?: string;
}
interface FadeProps {
    children?: React.ReactElement;
    in?: boolean;
    onEnter?: () => {};
    onExited?: () => {};
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
    props,
    ref
) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

export function CopyLinkForm(props: CopyLinkFromProps) {
    const store = useContext(StoreContext);
    console.log(props.prefix);
    const prefix = props.prefix ?? "";
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const [placement, setPlacement] = React.useState<PopperPlacementType>();
    const classes = makeStyles({
        buttonDiv: {
            width: "100%",
            justifyContent: "center",
            display: "flex",
            "& + *": {
                marginTop: 15,
            },
        },
        formRow: {
            width: "100%",
            display: "flex",
            borderRadius: 5,
            "& + *": {
                marginTop: 15,
            },
        },
        input: {
            flexGrow: 1,
            border: "1px solid black",
            borderRadius: "4px",
            padding: "4px 10px",
            fontSize: 16,
            borderRight: "none",
            boxShadow: "none",
            "&:focus": {
                outline: "none",
            },
        },
        popper: {
            zIndex: 1300,
            position: "absolute",
        },
        popperTypo: {
            padding: theme.spacing(1),
        },
        popperPaper: {
            background: green[700],
            color: "white",
            borderRadius: 10,
            padding: 10,
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            marginLeft: 7.5,
            "&:before": {
                display: "block",
                content: '""',
                width: 0,
                height: 0,
                border: "15px solid transparent",
                borderRight: "15px solid " + green[700],
                position: "absolute",
                left: "-15px",
                top: "calc(50% - 15px)",
            },
        },
    })();

    const handleButtonClick = (newPlacement: PopperPlacementType) => (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setAnchorEl(event.currentTarget);
        setTimeout(() => {
            setAnchorEl(null);
        }, 1200);
        setPlacement(newPlacement);
        copy(prefix + store.link, {
            message: "Press #{key} to copy",
        });
    };

    const open = Boolean(anchorEl);
    const id = open ? "spring-popper" : undefined;
    const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { target } = event;
        target.focus();
        target.setSelectionRange(0, target.value.length);
    };
    return (
        <>
            <Popper
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                className={classes.popper}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps}>
                        <Paper className={classes.popperPaper}>
                            <FileCopyRoundedIcon style={{ fontSize: "28px" }} />
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <ButtonGroup
                className={classes.formRow}
                variant="contained"
                color="primary"
                aria-label="contained primary button group"
            >
                <input
                    className={classes.input}
                    value={prefix + store.link}
                    onFocus={handleFocus}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleButtonClick("right")}
                >
                    SKOPIUJ
                </Button>
            </ButtonGroup>
        </>
    );
}
