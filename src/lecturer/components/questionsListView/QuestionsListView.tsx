import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    Divider,
    Fab,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    TextField,
    useTheme,
    Snackbar,
} from '@material-ui/core';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { red } from '@material-ui/core/colors';
import { styled } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { exportQuestions } from '../../services/FileService';
import { StoreContext } from '../../services/StoreService';

interface IndexedQuestion {
    index: number;
    question: Question;
}

export interface State extends SnackbarOrigin {
    open: boolean;
}

export function QuestionsListView() {
    const theme = useTheme();
    const store = useContext(StoreContext);
    const history = useHistory();

    const [message, setMessage] = useState<string>("");
    const [state, setState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    const [filterFn, setFilterFn] = useState({ fn: (items: IndexedQuestion[]) => { return items } });

    const classes = makeStyles({
        root: {
            background: theme.palette.secondary.light,
            gap: "50px",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            width: "100%",
            top: 0,
            zIndex: -1,
            paddingTop: 75,
            paddingBottom: "10px"
        },
        cardWrapper: {
            position: "relative",
        },
        list: {
            backgroundColor: theme.palette.background.paper,
            width: "500px",
            height: "500px",
            overflow: "auto",
        },
        bottomMenu: {
            width: "500px",
            display: "flex",
            alignItems: "center",
            "& > div": {
                marginLeft: "auto"
            }
        },
        deleteBtn: {
            color: red[700],
            flexShrink: 0,
            width: 55.4,
        },
        searchInput: {
            position: "absolute",
            top: "42px",
            right: "25px",
        },
    })();

    const handleRemoveButtonClick = (index: number) => {
        const list = store.questions;
        list.splice(index, 1);
        store.questions = list;
    }
    const selectQuestion = (index: number) => {
        history.push({
            pathname: "/lecturer/question",
            state: { questionIndex: index }
        });
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target;
        setFilterFn({
            fn: (items: IndexedQuestion[]) => {
                if (value === "")
                    return items
                else
                    return items.filter(x => x.question.title.toLowerCase().includes(value));
            }
        })
    }
    const addIndexes = (item: Question, i: number) => {
        let q: IndexedQuestion = { index: i, question: item };
        return q;
    }

    const onChangeImport = (event: ChangeEvent<HTMLInputElement>) => {
        //const target = event.target as Element;
        var files = event.target.files;
        if (files !== null && files.length !== 0) {
            var f = files[0];
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e: ProgressEvent<FileReader>) {
                    if (e.target?.result != null) {
                        let jsonString = e.target.result as string
                        let result = [];
                        let counter = 0;
                        try{
                            const tmp = JSON.parse(jsonString);
                            if (!(tmp instanceof Array)) {
                                setMessage("Pytania muszą być zapisane jako lista");
                                setState({ ...state, open: true });
                                return;    
                            }
                        }
                        catch (e) {
                            console.log(e);
                            setMessage("Nie da się zaimportować tego pliku");
                            setState({ ...state, open: true });
                            return;
                        }
                        for (const quest of JSON.parse(jsonString)) {
                            counter++;
                            let correct = true;

                            if  (typeof quest.title != "string" || typeof quest.text != "string"){
                               correct = false;
                            }
                            
                            if (quest.options != undefined && correct == true) {
                            
                                for (const option of quest.options){
                                    if (typeof option.index != 'number' || typeof option.text != 'string' || typeof option.isCorrect != 'boolean'){
                                        correct = false;
                                        break;
                                    }
                                }
                                
                            }
                            if (correct) {
                                for (const  item of store.questions) 
                                    if (item.title === quest.title) {
                                        correct = false;
                                        break;
                                }
                            }
                            if (correct) result.push(quest);
                        } 

                        store.questions = [...store.questions, ...result];
                        setMessage("Zaimportowano " + result.length + " z " + counter + " pytań");
                        setState({ ...state, open: true });
                    }
                }
            })(f);
            reader.readAsText(f);
        }
    }
    const Input = styled('input')({
        display: 'none',
    });

    const handleExportButtonClick = () => {
        exportQuestions(store.questions);
        // for future use
        //store.quizzes.forEach(quiz => {
        //    exportQuestions(quiz.questions, quiz.title+".json")
        //})
    }

    const handleClose = () => {
        setState({ ...state, open: false });
    };
    

    return (
        <>
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message={message}
            key={vertical + horizontal}
            autoHideDuration={1000}
        />
        <div className={classes.root}>
            <Card className={classes.cardWrapper}>
                <CardHeader
                    title="Lista pytań"
                    subheader={`${filterFn.fn(store.questions.map(addIndexes)).length} pytań`}
                />
                <TextField
                    className={classes.searchInput}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        )
                    }}
                />
                <List className={classes.list}>
                    <Divider />
                    {filterFn.fn(store.questions.map(addIndexes)).map((item) => ([
                        <ListItem
                            key={item.question.title}
                            button
                            onClick={() => selectQuestion(item.index)}
                        >
                            <ListItemIcon>{item.question.options ? <DoneAllIcon /> : <DescriptionIcon />}</ListItemIcon>
                            <ListItemText primary={item.question.title} />
                            <ListItemSecondaryAction>
                                <IconButton
                                    aria-label="delete"
                                    className={classes.deleteBtn}
                                    onClick={() => handleRemoveButtonClick(item.index)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>,
                        <Divider />
                    ]))}

                </List>
            </Card>

            <div className={classes.bottomMenu}>
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => { history.push("/lecturer/question"); }}
                >
                    <AddIcon />
                </Fab>

                <ButtonGroup color="primary" size="large" aria-label="contained primary button group">
                    <label>
                        <Input accept=".json" id="contained-button-file" type="file" onChange={(e) => onChangeImport(e)} />
                        <Button color="primary" variant="contained" component="span">
                            Import
                    </Button>
                    </label>
                    <label>
                        <Button color="primary" onClick={handleExportButtonClick} variant="contained">
                            Export
                    </Button>
                    </label>
                </ButtonGroup>
            </div>
        </div>
        </>
    );
}