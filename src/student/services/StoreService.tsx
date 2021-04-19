import { createContext, ReactNode, useState } from "react";

export interface StoreProps {
    children: ReactNode
}

export interface IStore {
    invitation?: string,
    studentNick?: string,
    quizes: Quiz[],
}

const Store = (props: StoreProps) => {
    const [invitation, setInvitation] = useState("");
    const [studentNick, setStudentNick] = useState("");
    const [quizes, setQuizes] = useState<Quiz[]>([]);

    const value = {
        get invitation() {
            return invitation;
        },
        set invitation(newValue: string) {
            setInvitation(newValue);
        },

        get studentNick() {
            return studentNick;
        },
        set studentNick(newValue: string) {
            setStudentNick(newValue);
        },

        get quizes() {
            return quizes;
        },
        set quizes(newValue: Quiz[]) {
            setQuizes([...newValue]);
        }
    };

    return (
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    )
};

const initialValue: IStore = {
    quizes: [],
}

export const StoreContext = createContext<IStore>(initialValue);

export default Store;