import {
    Card,
    CardHeader,
    Divider,
    Fab,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon, ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    TextField,
    useTheme
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { lazareTheme } from "../../util/theme/customTheme";
import { ImportExport } from '../importExport/ImportExport';


export type TitleType = Pick<Question | FrontQuiz, "id" | "title">;

interface ListViewProps {
    getContainer: (() => TitleType[]);
    setContainer: ((container: TitleType[]) => void);
    createEditPathname: string;
    listElements: string;
    onImport?: (e: ProgressEvent<FileReader>) => void;
    exportFilename: string;
}

export function ListView(props: ListViewProps) {
    function isQuestion(object: any): object is Question {
        return ('title' in object && 'text' in object);
    }

    const onImportBasic = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result != null) {
            let jsonString = e.target.result as string;
            setContainer([...getContainer(), ...JSON.parse(jsonString)]);
        }
    }

    let getContainer = props.getContainer;
    let setContainer = props.setContainer;
    const exportFilename = props.exportFilename;
    const createEditPathname = props.createEditPathname;
    const listElements = props.listElements;
    const onImport = props.onImport ?? onImportBasic;

    const theme = useTheme();
    const history = useHistory();

    const [filter, setFilter] = useState<string>("");

    const classes = makeStyles({
        root: {
            ...lazareTheme.root,
        },
        content: {
            ...lazareTheme.slimColumnWrapper,
            gap: 20,
            height: "calc(100vh - 48px)",
            minHeight: "500px",
            boxSizing: "border-box",
        },
        listHeader: {
            position: "relative",
            width: "100%",
            height: "fit-content",
            flexGrow: 0,
            flexShrink: 0,
        },
        listBody: {
            gap: 5,
            flexShrink: 1,
            height: "100%",
            display: "grid",
            gridAutoRows: 60,
            overflowY: "auto"
        },
        listFooter: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "fit-content",
            flexGrow: 0,
            flexShrink: 0,
        },
        list: {
            backgroundColor: theme.palette.background.paper,
            width: "500px",
            height: "500px",
            overflow: "auto",
            
        },
        deleteBtn: {
            "&:hover":{
                color: red[700],
            },
            flexShrink: 0,
            height: 48,
            width: 48,
        },
        searchInput: {
            position: "absolute",
            top: 16,
            right: 0,
            borderRadius: 5,
            background: "white",
        },
        listCardWrapper: {
            padding: 0,
            "& li":{
                height: "60px",
                display: "flex",
            },
        },
    })();

    const handleRemoveElement = (id: string) => {
        let list = getContainer();
        list = list.filter((item) => { 
            return item.id != id;
        });
        setContainer(list);
    }
    const selectElement = (id: string) => {
        history.push({
            pathname: createEditPathname,
            state: { id: id }
        });
    }

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }
    const filterByTitle = (items: TitleType[]) => {
        return items.filter(item => item.title.toLowerCase().includes(filter));
    }

    return (
        <div className={classes.root}>

            <div className={classes.content} >
                <div className={classes.listHeader}>
                    <CardHeader
                        title={`Lista ${listElements}`}
                        subheader={`${filterByTitle(getContainer()).length} ${listElements}`}
                    />
                    <TextField
                        className={classes.searchInput}
                        variant="outlined"
                        onChange={handleSearchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            )
                        }}
                    />
                    <Divider />
                </div>
                <div className={classes.listBody}>
                    {filterByTitle(getContainer()).map((item) => ([
                        <Card>
                            <List className={classes.listCardWrapper}>
                                <ListItem
                                    key={item.title}
                                    button
                                    onClick={() => selectElement(item.id)}
                                >
                                    {isQuestion(item) && (
                                        <ListItemIcon>{item.options ? <DoneAllIcon /> : <DescriptionIcon />}</ListItemIcon>
                                    )}
                                    <ListItemText primary={item.title} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            aria-label="delete"
                                            className={classes.deleteBtn}
                                            onClick={() => handleRemoveElement(item.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </Card>
                    ]))}
                </div>
                <div className={classes.listFooter}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        onClick={() => { history.push(createEditPathname); }}
                    >
                        <AddIcon />
                    </Fab>

                    <ImportExport onImport={onImport} objectToExport={getContainer()} fileName={exportFilename} />
                </div>
            </div>
        </div>
    );
}
