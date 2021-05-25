import { createContext, ReactNode, useEffect, useState } from "react";
import { scheduledQuizzes } from "../util/mockData";
export interface StoreProps {
    children: ReactNode
}

type StorageKey =
    "link" |
    "sessionId" |
    "questions" |
    "quizzes" |
    "sendQuizStep" |
    "selectedQuiz" |
    "timeToNextQuiz" |
    "scheduledQuizzes";

const stringKey = (key: StorageKey) => {
    return "lazare.lecturer." + key;
}

const loadKey = (key: StorageKey) => {
    let obj = JSON.parse(localStorage.getItem(stringKey(key)) ?? "null");
    console.log("loadKey", key, obj);
    return obj;
}

const saveKey = (key: StorageKey, value: any) => {
    if (value === undefined) return;
    console.log("saveKey", key, value);
    return localStorage.setItem(stringKey(key), JSON.stringify(value));
}

const loadFromStorage = () => {
    let obj: IStore = {
        ...initialValue,
        link: loadKey("link") ?? initialValue.link,
        sessionId: loadKey("sessionId") ?? initialValue.sessionId,
        questions: loadKey("questions") ?? initialValue.questions,
        quizzes: loadKey("quizzes") ?? initialValue.quizzes,
        sendQuizStep: loadKey("sendQuizStep") ?? initialValue.sendQuizStep,
        scheduledQuizzes: loadKey("scheduledQuizzes") ?? initialValue.scheduledQuizzes,
    }

    return obj;
}

export interface IStore {
    link: string,
    sessionId: string,
    questions: Question[],
    quizzes: FrontQuiz[],
    sendQuizStep: number,
    sendQuiz: ScheduledQuiz,
    scheduledQuizzes: ScheduledQuiz[],
    isLoading: boolean,
    studentQuestions: StudentQuestion[],
    reactionValues: number[],
    lastReactionTime: number,
}


const Store = (props: StoreProps) => {
    const [sendQuiz, setSendQuiz] = useState<ScheduledQuiz>(initialValue.sendQuiz);
    const [scheduledQuizzes, setScheduledQuizzes] = useState<ScheduledQuiz[]>(initialValue.scheduledQuizzes);
    const [link, setLink] = useState(initialValue.link);
    const [sessionId, setSessionId] = useState(initialValue.sessionId);
    const [questions, setQuestions] = useState<Question[]>(initialValue.questions);
    const [quizzes, setQuizzes] = useState<FrontQuiz[]>(initialValue.quizzes);
    const [selectedQuiz, setSelectedQuiz] = useState(-1);
    const [sendQuizStep, setSendQuizStep] = useState(0);
    const [isLoading, setIsLoading] = useState(initialValue.isLoading);
    const [studentQuestions, setStudentQuestions] = useState<StudentQuestion[]>(initialValue.studentQuestions);
    const [reactionValues, setReactionValues] = useState<number[]>(initialValue.reactionValues);
    const [lastReactionTime, setLastReactionTime] = useState<number>(initialValue.lastReactionTime);
    useEffect(() => {
        let initial = loadFromStorage();
        setLink(initial.link);
        setSessionId(initial.sessionId);
        setQuestions(initial.questions);
        setQuizzes(initial.quizzes);
    }, []);


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

        get quizzes() {
            return quizzes;
        },
        set quizzes(newValue: FrontQuiz[]) {
            let array = [...newValue];
            setQuizzes(array);
            saveKey("quizzes", array);
        },

        get scheduledQuizzes() {
            return scheduledQuizzes;
        },
        set scheduledQuizzes(newValue: ScheduledQuiz[]) {
            setScheduledQuizzes([...newValue]);
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

        get studentQuestions() {
            return studentQuestions;
        },
        set studentQuestions(newValue: StudentQuestion[]) {
            setStudentQuestions([...newValue]);
        },
        get reactionValues() {
            return reactionValues;
        },
        set reactionValues(newValue: number[]) {
            setReactionValues([...newValue]);
        },
        get lastReactionTime() {
            return lastReactionTime;
        },
        set lastReactionTime(newValue: number) {
            setLastReactionTime(newValue);
        },
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
    quizzes: [],
    questions: [],
    sendQuizStep: 0,
    scheduledQuizzes: scheduledQuizzes,
    sendQuiz: {
        students: [],
        questionStats: [],
        alreadyShowedResults: false,
        timeInSec: 0,
        inProgress: true,
        timeToEnd: 0,
    },
    isLoading: true,
    studentQuestions: [],
    reactionValues: [0, 0, 0, 0, 0],
    lastReactionTime: 30,
}


export const StoreContext = createContext<IStore>(initialValue);

export default Store;
