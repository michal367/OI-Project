import {
    makeStyles,
    Button,
} from "@material-ui/core";
import copy from "copy-to-clipboard";
import { StoreContext } from "../../services/StoreService";
import {useContext} from "react";

export function CopyLinkButton() {
    const store = useContext(StoreContext);

    const classes = makeStyles({
        buttonDiv: {
            maxWidth: "500px",
            margin: "15px auto",
            borderRadius: "0",
            display: "flex"
        },
        btn: {
            marginLeft: "auto",
        },
    })();

    const handleButtonClick = () => {
        copy("http://localhost:3001/" + store.link, {
            message: 'Press #{key} to copy',});
    }

    return (
        <div className={classes.buttonDiv}>
            <Button className={classes.btn} variant="contained" color="primary"  onClick={handleButtonClick}>
                    COPY LINK
            </Button>
        </div>
    );
}