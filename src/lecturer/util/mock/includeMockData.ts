import { IStore } from "../../services/StoreService";
import { scheduledQuizzesMock, questionListMock, studentListMock, timestampMock } from "./data";

const includeMockData = (enabled: boolean, store: IStore) => {
    let storeWithMock = JSON.parse(JSON.stringify(store));

    if(enabled){
        storeWithMock.questions = questionListMock;
        storeWithMock.scheduledQuizzes = scheduledQuizzesMock;
    }

    return storeWithMock;
}

export { includeMockData };

