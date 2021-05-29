import Tab from '@material-ui/core/Tab';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Badge } from "@material-ui/core";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";

interface NotifiableTabProps {
    observableList?: any[];
    label?: string;
    routes?: string;
    value?: string;
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
    const [notifiableNumber, setNotifiableNumber] = useState(0);
    const label = props.label ?? "none";
    const routes = props.routes ?? "";
    const resetFunction = props.resetFunction?? (() => {});
    useEffect(() => {
        if (props.observableList) {
            if (props.observableList.length !== 0) {
                setNotifiableNumber(prev => prev + 1);
            }
        }
    }, [props.observableList]);
    const resetNewQuestionsValue = () => {
        setNotifiableNumber(0);
        resetFunction();
    }

    return (
        <div>
            <StyledBadge badgeContent={notifiableNumber} overlap="circle" color="error">
                <Tab onClick={resetNewQuestionsValue} label={label} value={routes} component={RouterLink} to={routes} />
            </StyledBadge>
        </div>
    );
}
