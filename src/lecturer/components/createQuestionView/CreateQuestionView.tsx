import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from "@material-ui/core";
import { useState } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export function CreateQuestionView(){
    const theme = useTheme();
    const [inputList, setInputList] = useState([{ answer: ""}]);

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
        setInputList([...inputList, { answer: ""}]);
    };
    
    const handleRemoveButtonClick = () => {
        const list = [...inputList];
        list.splice(list.length - 1, 1);
        setInputList(list);
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
                <Grid container spacing={1}>
                    <Grid item xs={6} sm={9}>
                    <FormLabel>Odpowiedzi:</FormLabel>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                    <FormLabel>Poprawne:</FormLabel>
                    </Grid>
                </Grid>
                {inputList.map((x, i) => {
                    return (
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    label="Odpowiedź"
                                    multiline={true}
                                    rows={1}
                                    required
                                    variant={"outlined"}
                                    className={classes.textarea}
                                    fullWidth>
                                        hello
                                </TextField>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Checkbox
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </Grid>
                        </Grid>
                    );                 
                })}
                <Fab color="primary" aria-label="add" onClick={handleAddButtonClick}>
                    <AddIcon />
                </Fab>
                {inputList.length !== 1 && <Button variant="contained" color="primary" href="#contained-buttons" onClick={handleRemoveButtonClick}>
                    Usuń
                </Button>}  
                <div className={classes.right}>
                    <Button variant="contained" size="large" color="primary">
                        Zakończ
                    </Button>
                </div>
            </form>
        </div>
    );
}