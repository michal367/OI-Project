import { useContext } from 'react';
import { StoreContext } from '../../services/StoreService';
import { ListView, TitleType } from '../listView/ListView';


export function QuizzesListView() {
    const store = useContext(StoreContext);

    const getContainer: () => FrontQuiz[] = () => {
        return store.quizzes;
    }
    const setContainer = (value: TitleType[]) => {
        store.quizzes = value as FrontQuiz[];
    }

    return (
        <ListView
            getContainer={getContainer}
            setContainer={setContainer}
            exportFilename="quizzes"
            createEditPathname="/lecturer/quiz"
            listElements="quizów"
        />
    );
}