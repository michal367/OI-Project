import { createContext, ReactNode, useState } from "react";

export interface StoreProps {
    children: ReactNode
}

export interface IStore {
    link?: string,
    sessionId?: string,
    questions: Question[],
    quizes: Quiz[],
    sendQuizStep: number,
    sendQuiz: ScheduledQuiz;
    quizesInProgress: ScheduledQuiz[];
}

const Store = (props: StoreProps) => {
    const [link, setLink] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [quizes, setQuizes] = useState<Quiz[]>([]);
    const [sendQuizStep, setSendQuizStep] = useState(0); 
    const [sendQuiz, setSendQuiz] = useState<ScheduledQuiz>({
        students: [],
        canShowResults: true,
    });
    const [quizesInProgress, setQuizesInProgress] = useState<ScheduledQuiz[]>([]);

    const value = {
        get link() {
            return link;
        },
        set link(newValue: string) {
            setLink(newValue);
        },

        get sessionId() {
            return sessionId;
        },
        set sessionId(newValue: string) {
            setSessionId(newValue);
        },

        get questions() {
            return questions;
        },
        set questions(newValue: Question[]) {
            setQuestions([...newValue]);
        },

        get quizes() {
            return quizes;
        },
        set quizes(newValue: Quiz[]) {
            setQuizes([...newValue]);
        }, 

        get quizesInProgress() {
            return quizesInProgress;
        },
        set quizesInProgress(newValue: ScheduledQuiz[]) {
            setQuizesInProgress([...newValue]);
        },

        get sendQuiz() {
            return sendQuiz;
        },
        set sendQuiz(newValue: ScheduledQuiz) {
            setSendQuiz(newValue);
        },

        get sendQuizStep() {
            return sendQuizStep;
        },
        set sendQuizStep(newValue: number) {
            setSendQuizStep(newValue);
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
    sendQuizStep: 0,
    quizesInProgress: [],
    sendQuiz: {
        students: [],
        canShowResults: true,
    }
}

export const StoreContext = createContext<IStore>(initialValue);

export default Store;
