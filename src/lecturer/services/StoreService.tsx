import { createContext, ReactNode, useEffect, useState } from "react";
export interface StoreProps {
    children: ReactNode
}

type StorageKey =
    "link" |
    "sessionId" |
    "questions" |
    "quizes" |
    "sendQuizStep" |
    "selectedQuiz";

const stringKey = (key: StorageKey) => {
    return "lazare.lecturer." + key;
}

const loadKey = (key: StorageKey) => {
    let obj = JSON.parse(localStorage.getItem(stringKey(key)) ?? "null");
    console.log("loadKey", obj);
    return obj;
}

const saveKey = (key: StorageKey, value: any) => {
    if(value === undefined) return;
    console.log("saveKey", value);
    return localStorage.setItem(stringKey(key), JSON.stringify(value));
}

const loadFromStorage = () => {
    let obj: IStore = {
        ...initialValue,
        link: loadKey("link") ?? initialValue.link,
        sessionId: loadKey("sessionId") ?? initialValue.sessionId,
        questions: loadKey("questions") ?? initialValue.questions,
        quizes: loadKey("quizes") ?? initialValue.quizes,
        sendQuizStep: loadKey("sendQuizStep") ?? initialValue.sendQuizStep,
    }

    return obj;
}

export interface IStore {
    link: string,
    sessionId: string,
    questions: Question[],
    quizes: Quiz[],
    sendQuizStep: number,
    sendQuiz: ScheduledQuiz,
    quizesInProgress: ScheduledQuiz[],
    isLoading: boolean,
    studentQuestions: StudentQuestion[],
}

const Store = (props: StoreProps) => {
    const [sendQuiz, setSendQuiz] = useState<ScheduledQuiz>(initialValue.sendQuiz);
    const [quizesInProgress, setQuizesInProgress] = useState<ScheduledQuiz[]>(initialValue.quizesInProgress);
    const [link, setLink] = useState(initialValue.link);
    const [sessionId, setSessionId] = useState(initialValue.sessionId);
    const [questions, setQuestions] = useState<Question[]>(initialValue.questions);
    const [quizes, setQuizes] = useState<Quiz[]>(initialValue.quizes);
    const [selectedQuiz, setSelectedQuiz] = useState(-1);
    const [sendQuizStep, setSendQuizStep] = useState(0);
    const [isLoading, setIsLoading] = useState(initialValue.isLoading);
    const [studentQuestions, setStudentQuestions] = useState<StudentQuestion[]>(initialValue.studentQuestions);

    useEffect(() => {
        let initial = loadFromStorage();
        setLink(initial.link);
        setSessionId(initial.sessionId);
        setQuestions(initial.questions);
        setQuizes(initial.quizes);
    }, [])

    const value = {
        get link() {
            return link;
        },
        set link(newValue: string) {
            setLink(newValue);
            saveKey("link", newValue);
        },

        get sessionId() {
            return sessionId;
        },
        set sessionId(newValue: string) {
            setSessionId(newValue);
            saveKey("sessionId", newValue);
        },

        get questions() {
            return questions;
        },
        set questions(newValue: Question[]) {
            let array = [...newValue];
            setQuestions(array);
            saveKey("questions", array);
        },

        get quizes() {
            return quizes;
        },
        set quizes(newValue: Quiz[]) {
            let array = [...newValue];
            setQuizes(array);
            saveKey("quizes", array);
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

        get selectedQuiz() {
            return selectedQuiz
        },
        set selectedQuiz(newValue: number) {
            setSelectedQuiz(newValue);
            saveKey("selectedQuiz", newValue);
        },

        get sendQuizStep() {
            return sendQuizStep;
        },
        set sendQuizStep(newValue: number) {
            setSendQuizStep(newValue);
            saveKey("sendQuizStep", newValue);
        },

        get isLoading() {
            return isLoading;
        },
        set isLoading(newValue: boolean) {
            setIsLoading(newValue);
        },
        get studentQuestions(){
            return studentQuestions;
        },
        set setStudentQuestions(newValue: StudentQuestion[]){
            setStudentQuestions([...newValue]);
        }
    };

    return (
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    )
};

const initialValue: IStore = {
    link: "",
    sessionId: "",
    quizes: [],
    questions: [],
    sendQuizStep: 0,
    quizesInProgress: [],
    sendQuiz: {
        students: [],
        canShowResults: true,
    },
    isLoading: true,
    studentQuestions: [],
}

export const StoreContext = createContext<IStore>(initialValue);

export default Store;
