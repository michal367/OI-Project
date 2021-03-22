import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CreateSession from './create-session-view';
import "fontsource-roboto";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated,
      light: "#80A3E4",
      main: "#4870AC",
      // dark: "#404756",
      // contrastText: will be calculated,
    },
    secondary: {
      light: "#FFEECB",
      main: "#D9A21B",
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
      <CreateSession />
    </ThemeProvider>
  );
}

export default App;
