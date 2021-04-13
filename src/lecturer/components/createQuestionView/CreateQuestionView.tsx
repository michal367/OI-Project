import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from "@material-ui/core";


export function CreateQuestionView(){
    const theme = useTheme();

    const classes = makeStyles({
        root: {
            background: theme.palette.secondary.light,
            gap: "50px",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            
            
        },
        form: {
            width: "500px",
            '& > *': {
                display: "block-inline",
                marginBottom: "15px",
                margin: theme.spacing(1),
            },
        },
        textarea: {
            width: "100%",
            backgroundColor: "white"
        },
        right: {
            display: "flex",
            justifyContent: "flex-end"
        }
    })();

    const handleAddButtonClick = () => {
        console.log("Add");
    };

    return (
        <div className={classes.root}>
            <form className={classes.form} noValidate autoComplete="off">
                <InputLabel>Pytanie</InputLabel>
                <TextField
                label="Pytanie"
                multiline={true}
                rows={5}
                required
                variant={"outlined"}
                className={classes.textarea}
                fullWidth>
                    hello
                </TextField>
                <FormLabel>Odpowiedzi</FormLabel>
                <Fab color="primary" aria-label="add" onClick={handleAddButtonClick}>
                    <AddIcon />
                </Fab>
                <div className={classes.right}>
                    <Button variant="contained" size="large" color="primary">
                        Zakończ
                    </Button>
                </div>
            </form>
        </div>
    );
}