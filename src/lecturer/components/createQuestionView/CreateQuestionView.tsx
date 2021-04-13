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
import {FormEvent} from 'react';


export function CreateQuestionView(){
    const theme = useTheme();
    
    const [title, setTitle] = useState<string>("");
    const [question, setQuestion] = useState<string>("");
    const [inputList, setInputList] = useState<string[]>([]);
    const [checked, setChecked] = useState<boolean[]>([]);
    const [errors, setErrors] = useState({title: "", question: "", noAnswers: "", emptyAnswers: []});

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
        titleInput:{
            width: "100%",
            backgroundColor: "white"
        },
        textarea: {
            width: "100%",
            backgroundColor: "white"
        },
        right: {
            display: "flex",
            justifyContent: "flex-end"
        },
        errorColor: {
            color: "red"
        }
    })();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { value } = e.target;
        const list = [...inputList];
        list[index] = value;
        setInputList(list);
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setTitle(value);
    }

    const handleTextAreaChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setQuestion(value);
    }

    const handleCheckboxChange = (e: ChangeEvent<any>, index: number) => {
        const value = e.target.checked;
        const listcb = [...checked];
        listcb[index] = value;
        setChecked(listcb);
    }

    const handleAddButtonClick = () => {
        setInputList([...inputList, ""]);
        setChecked([...checked, false]);
    };
    
    const handleRemoveButtonClick = (index: number) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const validate = () => {
        let temp: any = {};
        let required: string = "To pole jest wymagane";

        temp.title = title ? "" : required;
        temp.question = question ? "" : required;

        temp.noAnswers = inputList.length !== 0 ? "" : "Trzeba dodać odpowiedzi";
        
        temp.emptyAnswers = [];
        for(let i=0; i < inputList.length; i++)
            temp.emptyAnswers.push(inputList[i] ? "" : required);

        setErrors(temp);

        return (temp.title === "" && temp.question === "" && temp.noAnswers === "" &&
                temp.emptyAnswers.every((x:string) => x === ""))
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!validate()){
            console.log("NOT ALL DATA ENTERED");
            return;
        }
        
        let options : Answer[] = [];
        for(let i=0; i<inputList.length; i++){
            options.push({
                index: i+1,
                text: inputList[i],
                isCorrect: checked[i]
            });
        }
        
        let obj : Question = {
            title: title,
            text: question,
            options: options
        };
        console.log(obj);


        setTitle("");
        setQuestion("");
        setInputList([]);
    }

    

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit} className={classes.form} noValidate autoComplete="off">
                <InputLabel>Tytuł</InputLabel>
                <TextField
                    id="standard-basic"
                    variant={"outlined"}
                    value={title}
                    className={classes.titleInput}
                    required
                    error={errors.title !== ""}
                    helperText={errors.title}
                    onChange={handleTitleChange}
                    />
                <InputLabel>Pytanie</InputLabel>
                <TextField
                    multiline={true}
                    rows={5}
                    required
                    value={question}
                    error={errors.question !== ""}
                    helperText={errors.question}
                    variant={"outlined"}
                    className={classes.textarea}
                    fullWidth
                    onChange={handleTextAreaChange}>
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
                                    value={x}
                                    onChange={e => handleInputChange(e, i)}
                                    label="Odpowiedź"
                                    multiline={true}
                                    rows={1}
                                    required
                                    variant={"outlined"}
                                    className={classes.textarea}
                                    fullWidth
                                    error={errors.emptyAnswers.length > i && errors.emptyAnswers[i] !== ""}
                                    helperText={errors.emptyAnswers[i]}>
                                </TextField>
                            </Grid>
                            <Grid item xs={6} sm={1}>
                                <Checkbox
                                    color="primary"
                                    name="prrrr"
                                    checked={checked[i]}
                                    onChange={e => handleCheckboxChange(e, i)}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </Grid>
                        </Grid>
                    );                 
                })}
                <Fab color="primary" aria-label="add" onClick={handleAddButtonClick}>
                     <AddIcon />
                </Fab>
                <span className={classes.errorColor}>{errors.noAnswers}</span>
                <div className={classes.right}>
                    <Button variant="contained" size="large" color="primary" type="submit">
                        DODAJ PYTANIE
                    </Button>
                </div>
            </form>
        </div>
    );
}