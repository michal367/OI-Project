import {
    Card,
    CardContent,
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
import { ImportExport } from '../importExport/ImportExport';
import { lazareTheme } from "../../util/theme/customTheme";
import { Autocomplete } from '@material-ui/lab';


export type TitleType = Pick<Question | FrontQuiz, "title">;

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

    interface IndexedElement {
        index: number;
        element: TitleType;
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
            ...lazareTheme.singleSlimColumn,
            gap: 20,
            paddingTop: 60,
            maxHeight: "calc(100vh - 48px)",
            boxSizing: "border-box",
        },
        // listWrapper: {

        // },
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
            overflow: "auto",
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
            color: red[700],
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
    })();

    const handleRemoveElement = (index: number) => {
        const list = getContainer();
        list.splice(index, 1);
        setContainer(list);

    }
    const selectElement = (index: number) => {
        history.push({
            pathname: createEditPathname,
            state: { index: index }
        });
    }

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }
    const filterByTitle = (items: IndexedElement[]) => {
        return items.filter(item => item.element.title.toLowerCase().includes(filter));
    }
    const addIndexes = (item: TitleType, i: number) => {
        let q: IndexedElement = { index: i, element: item };
        return q;
    }

    return (
        <div className={classes.root}>

            <div className={classes.content} >
                <div className={classes.listHeader}>
                    <CardHeader
                        title={`Lista ${listElements}`}
                        subheader={`${filterByTitle(getContainer().map(addIndexes)).length} ${listElements}`}
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
                    {filterByTitle(getContainer().map(addIndexes)).map((item) => ([
                        <Card>
                            <List>
                                <ListItem
                                    key={item.element.title}
                                    button
                                    onClick={() => selectElement(item.index)}
                                >
                                    {isQuestion(item.element) && (
                                        <ListItemIcon>{item.element.options ? <DoneAllIcon /> : <DescriptionIcon />}</ListItemIcon>
                                    )}
                                    <ListItemText primary={item.element.title} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            aria-label="delete"
                                            className={classes.deleteBtn}
                                            onClick={() => handleRemoveElement(item.index)}
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