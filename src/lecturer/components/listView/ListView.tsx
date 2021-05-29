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
import { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ImportExport } from '../importExport/ImportExport';


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
            justifyContent: "space-between",
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

            <Card className={classes.cardWrapper}>
                <CardHeader
                    title={`Lista ${listElements}`}
                    subheader={`${filterByTitle(getContainer().map(addIndexes)).length} ${listElements}`}
                />
                <TextField
                    className={classes.searchInput}
                    onChange={handleSearchInput}
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
                    {filterByTitle(getContainer().map(addIndexes)).map((item) => ([
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
                        </ListItem>,
                        <Divider />
                    ]))}

                </List>
            </Card>

            <div className={classes.bottomMenu}>
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
    );
}
