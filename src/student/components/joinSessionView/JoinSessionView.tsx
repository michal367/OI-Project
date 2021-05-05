import { Paper } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "fontsource-roboto";
import { StudentFormView } from "../joinSessionView/StudentFormView";
import { useRouteMatch } from "react-router";

export function JoinSessionView() {
    const match = useRouteMatch<MatchParams>("/:session");
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
                <StudentFormView session={match?.params.session} />
            </Paper>
        </div>
    );
}
