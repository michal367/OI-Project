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
import { Location } from 'history';
import { useLocation } from 'react-router-dom';

interface ShareSessionViewProps {
    isOpen?: boolean;
}

export function ShareSessionView(props: ShareSessionViewProps) {
    const store = useContext(StoreContext);
    const location = window.location;

    let port: string = location.port;
    if(location.port === "3000")
        port = "3001";
    const link = location.protocol + '//' + location.hostname + (port ? ':'+port: '');

    const classes = makeStyles({
        shareIcon: {
            marginRight: 10,
            fontSize: 28,
        },
        shareButton: {
            fontSize: 16,
            height: 55,
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

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickClose = () => {
        setOpen(false);
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
                        <CopyLinkForm prefix={`${link}/student/code/`} />
                        <CopyLinkForm />
                    </div>

                    <QRCode style={{ alignSelf: "center" }} size={256} value={`${link}/student/code/${store.link}`} />

                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClickClose}
                        color="primary"
                        autoFocus
                    >
                        Zakończ
                    </Button>
                </DialogActions>
            </Dialog>
            <div className={classes.action}>
                <Fab
                    className={classes.shareButton}
                    variant="extended"
                    onClick={handleClickOpen}
                    color="secondary"
                >
                    <ShareIcon fontSize="large" className={classes.shareIcon} />
                    Udostępnij
                </Fab>
            </div>
        </>
    );
}
