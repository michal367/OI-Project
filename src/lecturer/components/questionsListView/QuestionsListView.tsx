import { Snackbar } from '@material-ui/core';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { useContext, useState } from 'react';
import { StoreContext } from '../../services/StoreService';
import { ListView, TitleType } from '../listView/ListView';


export interface SnackbarState extends SnackbarOrigin {
    open: boolean;
}

export function QuestionsListView() {
    const store = useContext(StoreContext);

    const [message, setMessage] = useState<string>("");
    const [snackbarState, setSnackbarState] = useState<SnackbarState>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = snackbarState;

    const onImport = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result != null) {
            const jsonString = e.target.result as string
            let result = [];
            let counter = 0;
            let parsed = [];
            try {
                parsed = JSON.parse(jsonString);
                if (!(parsed instanceof Array)) {
                    setMessage("Pytania muszą być zapisane jako lista");
                    setSnackbarState({ ...snackbarState, open: true });
                    return;
                }
            }
            catch (e) {
                setMessage("Nie da się zaimportować tego pliku");
                setSnackbarState({ ...snackbarState, open: true });
                return;
            }
            for (const quest of parsed) {
                counter++;
                let correct = true;

                if (typeof quest.title != "string" || typeof quest.text != "string") {
                    correct = false;
                }

                if (quest.options != undefined && correct == true) {
                    for (const option of quest.options) {
                        if (typeof option.index != 'number' || typeof option.text != 'string' || typeof option.isCorrect != 'boolean') {
                            correct = false;
                            break;
                        }
                    }
                }

                if (correct) {
                    for (const item of store.questions)
                        if (item.title === quest.title) {
                            correct = false;
                            break;
                        }
                }
                if (correct) {
                    for (const item of result)
                        if (item.title === quest.title) {
                            correct = false;
                            break;
                        }
                }
                if (correct)
                    result.push(quest);
            }

            store.questions = [...store.questions, ...result];
            setMessage("Zaimportowano " + result.length + " z " + counter + " pytań");
            setSnackbarState({ ...snackbarState, open: true });
        }
    }

    const getContainer: () => Question[] = () => {
        return store.questions;
    }
    const setContainer = (value: TitleType[]) => {
        store.questions = value as Question[];
    }

    const closeSnackbar = () => {
        setSnackbarState({ ...snackbarState, open: false });
    };


    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={closeSnackbar}
                message={message}
                key={vertical + horizontal}
                autoHideDuration={1000}
                style={{ top: "60px" }}
            />
            <ListView
                getContainer={getContainer}
                setContainer={setContainer}
                createEditPathname="/lecturer/question"
                listElements="pytań"
                exportFilename="questions"
                onImport={onImport}
            />
        </>
    );
}
