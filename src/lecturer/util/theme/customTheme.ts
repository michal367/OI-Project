const background = "#D3D0CB";

export const lazareTheme = {
    palette:{
        primary: "#4C3957",
        secondary: "#41658A",
        background: background,
    },
    root: {
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
    fullWidthWrapper:{
        width: "100%",
        margin: "0 auto",
        minHeight: "fit-content",
        display: "flex",
        flexDirection: "column" as "column",
    },
    columnWrapper: {
        maxWidth: 1100,
        width: "100%",
        margin: "0 auto",
        padding: 20,
        paddingTop: 60,
        paddingBottom: 25,
        minHeight: "fit-content",
        display: "flex",
        flexDirection: "column" as "column",
    },
    slimColumnWrapper: {
        maxWidth: 760,
        width: "100%",
        margin: "0 auto",
        padding: 20,
        paddingTop: 60,
        paddingBottom: 25,
        minHeight: "fit-content",
        display: "flex",
        flexDirection: "column" as "column",   
    },
    twoColumns: {
        wrapper:{
            width: "100%",
            margin: "0 auto",
            minHeight: "fit-content",
            display: "grid",
            position: "relative" as "relative",
            gridTemplateColumns: "1fr 1fr",
        },
        column:{

        },
        overlay:{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    },
    threeColumns: {
        wrapper:{
            width: "100%",
            margin: "0 auto",
            minHeight: "fit-content",
            display: "grid",
            position: "relative" as "relative",
            gridTemplateColumns: "1fr 1fr 1fr",
        },
    },
};
