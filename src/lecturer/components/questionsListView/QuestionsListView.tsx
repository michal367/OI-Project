import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    Divider,
    Fab,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    useTheme,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { styled } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { ChangeEvent, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { exportQuestions } from '../../services/FileService';
import { StoreContext } from '../../services/StoreService';


export function QuestionsListView() {
    const theme = useTheme();
    const store = useContext(StoreContext);
    const history = useHistory();

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
            paddingTop: "55px",
            paddingBottom: "10px"
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
    })();


    const handleRemoveButtonClick = (index: number) => {
        const list = store.questions;
        list.splice(index, 1);
        store.questions = list;
    }
    const selectQuestion = (index: number) => {
        history.push({
            pathname: "/question",
            state: {questionIndex: index}
        });
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
                        store.questions = [...store.questions, ...JSON.parse(jsonString)];
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
        //store.quizes.forEach(quiz => {
        //    exportQuestions(quiz.questions, quiz.title+".json")
        //})
    }

    return (
        <div className={classes.root}>

            <Card>
                <CardHeader
                    title="Lista pytań"
                    subheader={`${store.questions.length} pytań`}
                />
                <List className={classes.list}>
                    <Divider />
                    {store.questions.map((item, i) => ([
                        <ListItem
                            key={item.title}
                            button
                            onClick={() => selectQuestion(i)}
                        >
                            <ListItemIcon>{item.options ? <DoneAllIcon /> : <DescriptionIcon />}</ListItemIcon>
                            <ListItemText primary={item.title} />
                            <ListItemSecondaryAction>
                                <IconButton
                                    aria-label="delete"
                                    className={classes.deleteBtn}
                                    onClick={() => handleRemoveButtonClick(i)}
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
                    onClick={() => { history.push("/question"); }}
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
    );
}