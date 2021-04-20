import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CreateSessionView } from "../createSessionView/CreateSessionView";
import { PickQuizView } from "../pickQuizView/PickQuizView";
import "fontsource-roboto";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import TopBar from "../topBar/topBar";
import { CreateQuestionView } from "../createQuestionView/CreateQuestionView";
import { QuestionsListView } from "../questionsListView/QuestionsListView";
import { useBackEndSocket } from "../../services/BackEndService";
import Store from "../../services/StoreService";
import { SessionDashboardView } from "../sessionDashboardView/SessionDashboardView";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#E1F1FF",
            main: "#80A3E4",
            dark: "#4870AC",
            // contrastText: will be calculated,
        },
        secondary: {
            light: "#FFEECB",
            main: "#D9A21B",
            dark: "#877455",
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
});

function App() {
    useBackEndSocket(); //for keeping socket open
    return (
        <Store>
            <Router>
                <ThemeProvider theme={theme}>
                    <CssBaseline />

                    <TopBar />

                    <Switch>
                        <Route exact path="/">
                            <CreateSessionView />
                        </Route>

                        <Route path="/session">
                            <SessionDashboardView />
                        </Route>

                        <Route path="/quiz">
                            <PickQuizView />
                        </Route>

                        <Route path="/question">
                            <CreateQuestionView />
                        </Route>
                      <Route path="/import-export">
                          <QuestionsListView/>
                      </Route>
                        <Route path="/">
                            <CreateSessionView />
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </ThemeProvider>
            </Router>
        </Store>
    );
}

export default App;
