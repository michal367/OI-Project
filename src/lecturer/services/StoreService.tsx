import { createContext, ReactNode, useState } from "react";

export interface StoreProps {
    children: ReactNode
}

export interface IStore {
    link?: string,
    sessionId?: string,
    questions: Question[],
    quizes: Quiz[],
}

const Store = (props: StoreProps) => {
    const [link, setLink] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [quizes, setQuizes] = useState<Quiz[]>([]);

    const value = {
        get link() {
            return link
        },
        set link(newValue: string) {
            setLink(newValue);
        },

        get sessionId() {
            return sessionId
        },
        set sessionId(newValue: string) {
            setSessionId(newValue);
        },

        get questions() {
            return questions
        },
        set questions(newValue: Question[]) {
            setQuestions([...newValue]);
        },

        get quizes() {
            return quizes
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
    questions: []
}

export const StoreContext = createContext<IStore>(initialValue);

export default Store;