const background = "#D3D0CB";

export const lazareTheme = {
    palette:{
        primary: "#4C3957",
        secondary: "#41658A",
        background: background,
    },
    root: {
        gap: "50px",
        minHeight: "calc(100vh - 48px)",
        width: "100%",
        overflowX: "hidden" as "hidden",
        overflowY: "auto" as "auto",
        zIndex: -1,
        flexGrow: 1,
        flexShrink: 0,
        display: "flex",
        justifyContent: "center",
        background: background,
    },
    singleColumn: {
        maxWidth: 1100,
        width: "100%",
        margin: "0 auto",
        padding: 20,
        minHeight: "fit-content",
        display: "flex",
        flexDirection: "column" as "column",
    },
    singleSlimColumn: {
        maxWidth: 760,
        width: "100%",
        margin: "0 auto",
        padding: 20,
        minHeight: "fit-content",
        display: "flex",
        flexDirection: "column" as "column",   
    }
};
