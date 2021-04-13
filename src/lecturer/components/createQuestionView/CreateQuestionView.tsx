import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';


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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { value } = e.target;
        const list = [...inputList];
        list[index].answer = value;
        setInputList(list); 
        console.log(list);
    };

    const handleAddButtonClick = () => {
        setInputList([...inputList, { answer: ""}]);
    };
    
    const handleRemoveButtonClick = (index: number) => {
        const list = [...inputList];
        console.log(list);
        list.splice(index, 1);
        console.log(list);
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
                        <Grid item key={i} container spacing={1}>
                            {inputList.length !== 0 && <Fab color="primary" aria-label="add" onClick={() => handleRemoveButtonClick(i)}>
                                 <DeleteIcon />
                            </Fab>}
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    value={x.answer}
                                    onChange={e => handleInputChange(e, i)}
                                    label="Odpowiedź"
                                    multiline={true}
                                    rows={1}
                                    required
                                    variant={"outlined"}
                                    className={classes.textarea}
                                    fullWidth>
                                </TextField>
                            </Grid>
                            <Grid item xs={6} sm={1}>
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
                <div className={classes.right}>
                    <Button variant="contained" size="large" color="primary">
                        Zakończ
                    </Button>
                </div>
            </form>
        </div>
    );
}