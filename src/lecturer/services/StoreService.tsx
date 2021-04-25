import { createContext, ReactNode, useState } from "react";

export interface StoreProps {
    children: ReactNode
}

export interface IStore {
    link?: string,
    sessionId?: string,
    questions: Question[],
    quizes: Quiz[],
    selectedQuiz: number,
    selectedStudents: string[],
    sendQuizStep: number,
}

const Store = (props: StoreProps) => {
    const [link, setLink] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [quizes, setQuizes] = useState<Quiz[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState(-1);
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    const [sendQuizStep, setSendQuizStep] = useState(0);

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
        }, 
        
        get selectedQuiz() {
            return selectedQuiz
        },
        set selectedQuiz(newValue: number) {
            setSelectedQuiz(newValue);
        },

        get sendQuizStep() {
            return sendQuizStep
        },
        set sendQuizStep(newValue: number) {
            setSendQuizStep(newValue);
        },

        get selectedStudents() {
            return selectedStudents
        },
        set selectedStudents(newValue: string[]) {
            setSelectedStudents([...newValue]);
        },
    };

    return (
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    )
};

const initialValue: IStore = {
    quizes: [],
    questions: [],
    selectedQuiz: -1,
    selectedStudents: [],
    sendQuizStep: 0,
}

export const StoreContext = createContext<IStore>(initialValue);

export default Store;