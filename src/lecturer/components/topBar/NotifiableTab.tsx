import Tab from '@material-ui/core/Tab';
import { Link as RouterLink } from 'react-router-dom';
import { useCallback, useContext, useState } from 'react';
import { useEffect } from 'react';
import { Badge, makeStyles, useTheme } from "@material-ui/core";
import { StoreContext } from '../../services/StoreService';
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";

interface NotifiableTabProps {
    observableList?: any[];
    label?: string;
    routes?: string;
    value?: number;
    resetFunction?: () => void;
}

const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            right: 23,
            top: 15
        }
    })
)(Badge);
export default function NotifiableTab(props: NotifiableTabProps) {
    const store = useContext(StoreContext);

    const [notifiableNumber, setNotifiableNumber] = useState(0);
    const label = props.label ?? "none";
    const routes = props.routes ?? "";
    const resetFunction = props.resetFunction ?? (() => { });
    useEffect(() => {
        if (props.observableList) {
            if (props.observableList.length !== 0) {
                setNotifiableNumber(prev => ++prev);
            }
        }
    }, [props.observableList]);
    const theme = useTheme();
    const classes = makeStyles({
        topBarTab: {
            "&:hover": {
                backgroundColor: theme.palette.primary.dark,
            },
        },
    })();

    const resetNewQuestionsValue = () => {
        setNotifiableNumber(0);
        resetFunction();
    }

    return (
        <div>
            <StyledBadge badgeContent={notifiableNumber} overlap="circle" color="error">
                <Tab className={classes.topBarTab} onClick={resetNewQuestionsValue} label={label} value={routes} component={RouterLink} to={routes} />
            </StyledBadge>
        </div>
    );
}
