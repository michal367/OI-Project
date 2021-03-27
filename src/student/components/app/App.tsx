import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ChooseNicknameView } from "../chooseNicknameView/ChooseNicknameView";
import "fontsource-roboto";

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
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ChooseNicknameView />
        </ThemeProvider>
    );
}

export default App;
