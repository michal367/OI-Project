import { Snackbar, SnackbarOrigin } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { StoreContext } from '../../services/StoreService';
import { ListView, TitleType } from '../listView/ListView';

export interface SnackbarState extends SnackbarOrigin {
    open: boolean;
}

export function QuizzesListView() {
    const store = useContext(StoreContext);

    const [message, setMessage] = useState<string>("");
    const [snackbarState, setSnackbarState] = useState<SnackbarState>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = snackbarState;

    const getContainer: () => FrontQuiz[] = () => {
        return store.quizzes;
    }
    const setContainer = (value: TitleType[]) => {
        store.quizzes = value as FrontQuiz[];
    }

    const onImport = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result != null) {
            const jsonString = e.target.result as string
            let counter = 0;
            let parsed = [];
            let resultQuiz = [];
            try {
                parsed = JSON.parse(jsonString);
                if (!(parsed instanceof Array)) {
                    setMessage("Quizy muszą być zapisane jako lista");
                    setSnackbarState({ ...snackbarState, open: true });
                    return;
                }
            }
            catch (e) {
                setMessage("Nie da się zaimportować tego pliku");
                setSnackbarState({ ...snackbarState, open: true });
                return;
            }
            for (const quiz of parsed) {
                counter++;
                let result = [];
                let correctQuiz = true;

                if (typeof quiz.title != "string" || quiz.title === "" || !(quiz.questions instanceof Array)){
                    continue;
                } 
                
                if (quiz.questions.length == 0) continue;
                
                for (const item of store.quizzes)
                    if (item.title === quiz.title) {
                        correctQuiz = false;
                        break;
                    }
                
                for (const item of resultQuiz) {
                    if (item.title === quiz.title) {
                        correctQuiz = false;
                        break;
                    }
                }

                if (!correctQuiz) continue;
                
                for (const quest of quiz.questions) {
                    let correct = true;

                    if (typeof quest.title != "string"  || quest.title === "" || typeof quest.text != "string" || quest.text === "") {
                        correct = false;
                    }

                    if (quest.options != undefined && correct == true) {
                        for (const option of quest.options) {
                            if (typeof option.index != 'number' || typeof option.text != 'string' || option.text === "" || typeof option.isCorrect != 'boolean') {
                                correct = false;
                                break;
                            }
                        }
                    }

                    if (correct) {
                        for (const item of result)
                            if (item.title === quest.title) {
                                correct = false;
                                break;
                            }
                    }
                    if (correct) {
                        result.push(quest);
                    }
                    else {
                        correctQuiz = false;
                        break;
                    }
                }

                if (correctQuiz){
                    resultQuiz.push(quiz);
                }
            }
            store.quizzes = [...store.quizzes, ...resultQuiz];
            setMessage("Zaimportowano " + resultQuiz.length + " z " + counter + " quizów");
            setSnackbarState({ ...snackbarState, open: true });
        }
    }

    const closeSnackbar = () => {
        setSnackbarState({ ...snackbarState, open: false });
    };

    return (
        <div>
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
            createEditPathname="/lecturer/quiz"
            listElements="quizów"
            exportFilename="quizzes"
            onImport={onImport}
        />
        </div>
    );
}