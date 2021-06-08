import { IStore } from "../../services/StoreService";
import {  timestampMock } from "./data";

const includeMockData = (enabled: boolean, store: IStore) => {
    let storeWithMock = JSON.parse(JSON.stringify(store));

    if(enabled){
        storeWithMock.timestamps = timestampMock;
    }

    return storeWithMock;
}

export { includeMockData };

