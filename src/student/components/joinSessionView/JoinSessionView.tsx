import { Paper } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "fontsource-roboto";
import { StudentFormView } from "../joinSessionView/StudentFormView";
import { Location } from 'history';
import { useRouteMatch } from "react-router";
import { useLocation } from 'react-router-dom';

export function JoinSessionView() {
    const match = useRouteMatch<MatchParams>("/student/code/:session");
    const location: Location<Object> = useLocation();
    
    let sessionId;
    if(match)
        sessionId = match.params.session;
    else
        sessionId = location.search.substring(1);

    const theme = useTheme();
    const classes = makeStyles({
        root: {
            background: theme.palette.primary.light,
            gap: "50px",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        card: {
            maxWidth: 600,
            width: "100%",
        }
    })();

    return (
        <div className={classes.root}>
            <Paper variant="outlined" square className={classes.card}>
                <StudentFormView session={sessionId} />
            </Paper>
        </div>
    );
}
