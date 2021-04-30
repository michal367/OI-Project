import { createContext, ReactNode, useEffect, useState } from "react";

export interface StoreProps {
    children: ReactNode
}

export interface IStore {
    invitation: string,
    studentNick: string,
    quizes: Quiz[],
}

enum StorageKey {
    invitation,
    studentNick,
    quizes
}

const stringKey = (key: StorageKey) => {
    return "lazare.student." + key;
}

const loadKey = (key: StorageKey) => {
    let obj = JSON.parse(localStorage.getItem(stringKey(key)) ?? "null");
    console.log("loadKey", obj);
    return obj;
}

const saveKey = (key: StorageKey, value: any) => {
    console.log("saveKey", value);
    return localStorage.setItem(stringKey(key), JSON.stringify(value));
}

const initialValue: IStore = {
    invitation: "",
    studentNick: "",
    quizes: [],
}

const loadFromStorage = () => {
    let obj: IStore = {
        invitation: loadKey(StorageKey.invitation) ?? initialValue.invitation,
        studentNick: loadKey(StorageKey.studentNick) ?? initialValue.studentNick,
        quizes: loadKey(StorageKey.quizes) ?? initialValue.quizes,
    }

    return obj;
}



const Store = (props: StoreProps) => {
    let loaded = loadFromStorage();

    const [invitation, setInvitation] = useState(loaded.invitation);
    const [studentNick, setStudentNick] = useState(loaded.studentNick);
    const [quizes, setQuizes] = useState<Quiz[]>(loaded.quizes);

    const value = {
        get invitation() {
            return invitation;
        },
        set invitation(newValue: string) {
            setInvitation(newValue);
            saveKey(StorageKey.invitation, newValue);
        },

        get studentNick() {
            return studentNick;
        },
        set studentNick(newValue: string) {
            setStudentNick(newValue);
            saveKey(StorageKey.studentNick, newValue);
        },

        get quizes() {
            return quizes;
        },
        set quizes(newValue: Quiz[]) {
            let array = [...newValue];
            setQuizes(array);
            saveKey(StorageKey.quizes, array);
        }
    };

    return (
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    )
};



export const StoreContext = createContext<IStore>(initialValue);

export default Store;