import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    InputLabel,
    makeStyles,
    Divider
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import StopIcon from '@material-ui/icons/Stop';
import QRCode from "qrcode.react";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useSocket } from "../../services/SocketService";
import { StoreContext } from "../../services/StoreService";
import { CopyLinkForm } from "./CopyLinkForm";
import CloseIcon from '@material-ui/icons/Close';



interface ShareSessionViewProps {
    isOpen?: boolean;
    update: () => void;
}

export function ShareSessionView(props: ShareSessionViewProps) {
    const store = useContext(StoreContext);
    const history = useHistory();
    const { sendJsonMessage } = useSocket();
    const location = window.location;

    let port: string = location.port;
    if (port === "3000")
        port = "3001";
    const link = location.protocol + '//' + location.hostname + (port ? ':' + port : '');

    const classes = makeStyles({
        shareIcon: {
            marginRight: 3,
            fontSize: 16,
        },
        shareButton: {
            fontSize: 16,
            height: 36,
        },
        endButton: {
            "& .MuiTouchRipple-root span":{
                backgroundColor: red[700]+'!important',
                opacity: .3,
            },
        },
        content: {
            display: "flex",
            gap: 50,
            flexDirection: "column",
            width: 400,
            padding: 0,
            margin: "0 auto",
        },
        qrWrapper: {
            display: "flex",
            flexDirection: "column"
        }
    })();
    const [open, setOpen] = React.useState(props.isOpen ?? false);

    const handleClickShare = () => {
        setOpen(true);
    };
    const handleClickClose = () => {
        setOpen(false);
    };

    const handleClickEnd = () => {
        console.log("end lecture");
        store.operation?.clearOnSessionEnd();

        let event: Payload = {
            event: "delete_lecture"
        }

        sendJsonMessage(event);
        props.update();
        history.push({
            pathname: "/lecturer"
        });
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClickClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="alert-dialog-title">
                    Podziel się zaproszeniem do utworzonej sesji
                </DialogTitle>
                <DialogContent className={classes.content}>

                    <div>
                        <CopyLinkForm label="Link" prefix={`${link}/student/code/`} />
                        <CopyLinkForm label="Kod" />
                    </div>
                    <div className={classes.qrWrapper}>
                        <InputLabel style={{ marginBottom: "5px" }}>Kod QR</InputLabel>
                        <Divider style={{ marginBottom: "15px" }} />
                        <QRCode
                            style={{ alignSelf: "center" }}
                            size={256}
                            value={`${link}/student/code/${store.link}`}
                        />
                    </div>

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

            <Button
                className={classes.shareButton + " " + classes.endButton}
                onClick={handleClickEnd}
            >
                <CloseIcon className={classes.shareIcon} />
                {"Zakończ"}
            </Button>
            <Button
                className={classes.shareButton}
                variant="outlined"
                onClick={handleClickShare}
                color="primary"
            >
                <ShareIcon className={classes.shareIcon} />
                {"Udostępnij"}
            </Button>
        </>
    );
}
