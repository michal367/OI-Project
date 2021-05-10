import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    makeStyles,
} from "@material-ui/core";
import React, { useContext } from "react";
import { CopyLinkForm } from "./CopyLinkForm";
import ShareIcon from "@material-ui/icons/Share";
import { StoreContext } from "../../services/StoreService";
import QRCode from "qrcode.react";
import { red } from "@material-ui/core/colors";
import StopIcon from '@material-ui/icons/Stop';
import { useBackEndSocket } from "../../services/BackEndService";
import { useHistory } from "react-router-dom";

interface ShareSessionViewProps {
    isOpen?: boolean;
}

export function ShareSessionView(props: ShareSessionViewProps) {
    const store = useContext(StoreContext);
    const history = useHistory();
    const { sendJsonMessage } = useBackEndSocket();

    const classes = makeStyles({
        shareIcon: {
            marginRight: 10,
            fontSize: 28,
        },
        shareButton: {
            fontSize: 16,
            height: 55,
            marginRight: "20px"
        },
        endButton: {
            background: red[500],
        },
        action: {
            position: "absolute",
            bottom: 20,
            left: 20,
        },
        content: {
            display: "flex",
            gap: 50,
            flexDirection: "column",
            // background: "red",
            width: 400,
            padding: 0,
            margin: "0 auto",
        },
        qr: {
            width: "100%",
            margin: "0 auto",
            display: "block",
            border: "2px solid black",
        },
    })();
    const [open, setOpen] = React.useState(props.isOpen ?? false);

    const handleClickShare = () => {
        setOpen(true);
    };
    const handleClickClose = () => {
        setOpen(false);
    };

    const handleClickEnd = () => {
        store.link = "";
        store.sessionId = "";

        let event: Payload = {
            event: "delete_lecture"
        }
        sendJsonMessage(event);
        history.push({
            pathname: "/"
        });
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClickClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth="sm"
            >
                <DialogTitle id="alert-dialog-title">
                    Podziel się zaproszeniem do utworzonej sesji
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <div>
                        <CopyLinkForm prefix={"localhost:3001/"} />
                        <CopyLinkForm />
                    </div>

                    <QRCode style={{ alignSelf: "center" }} size={256} value={`localhost:3001/${store.link}`} />

                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClickClose}
                        color="primary"
                        autoFocus
                    >
                        Zamknij
                    </Button>
                </DialogActions>
            </Dialog>

            <div className={classes.action}>
                <Fab
                    className={classes.shareButton}
                    variant="extended"
                    onClick={handleClickShare}
                    color="secondary"
                >
                    <ShareIcon fontSize="large" className={classes.shareIcon} />
                    Udostępnij
                </Fab>

                <Fab
                    className={classes.shareButton + " " + classes.endButton}
                    variant="extended"
                    onClick={handleClickEnd}
                    color="inherit"
                >
                    <StopIcon fontSize="large" className={classes.shareIcon} />
                    Zakończ
                </Fab>
            </div>
        </>
    );
}
