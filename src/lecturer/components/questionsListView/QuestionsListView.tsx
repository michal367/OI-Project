import { useContext } from 'react';
import { StoreContext } from '../../services/StoreService';
import { ListView, TitleType } from '../listView/ListView';


export function QuestionsListView() {
    const store = useContext(StoreContext);

    const getContainer: () => Question[] = () => {
        return store.questions;
    }
    const setContainer = (value: TitleType[]) => {
        store.questions = value as Question[];
    }

    return (
        <ListView
            getContainer={getContainer}
            setContainer={setContainer}
            exportFilename="questions"
            createEditPathname="/lecturer/question"
            listElements="pytań"
        />
    );
}