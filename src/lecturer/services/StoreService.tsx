import { createContext, ReactNode, useEffect, useState } from "react";
import { includeMockData } from "../../common/util/mockData";
export interface StoreProps {
    children: ReactNode
}

type StorageKey =
    "link" |
    "lectureID" |
    "questions" |
    "quizzes" |
    "sendQuizStep" |
    "timeToNextQuiz";

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
const loadKeyForArray = (key: StorageKey, initialValue: any[]) => {
    let obj : any[] = loadKey(key);
    if(obj && obj.length > 0)
        initialValue.forEach((el) => {
            // TODO add el to array if its ID is not present there. 
        });
    else
        obj = initialValue;
    return obj
}

const loadFromStorage = () => {
    let obj: IStore = {
        ...initialValue,
        link: loadKey("link") ?? initialValue.link,
        lectureID: loadKey("lectureID") ?? initialValue.lectureID,
        questions: loadKeyForArray("questions", initialValue.questions),
        quizzes: loadKeyForArray("quizzes", initialValue.quizzes),
        sendQuizStep: loadKey("sendQuizStep") ?? initialValue.sendQuizStep,
        timeToNextQuiz: loadKey("timeToNextQuiz") ?? initialValue.timeToNextQuiz,
    }

    return obj;
}

export interface IStore {
    link: string,
    lectureID: string|null,
    questions: Question[],
    quizzes: FrontQuiz[],
    sendQuizStep: number,
    sendQuiz: ScheduledQuiz,
    endedQuizzes: ScheduledQuiz[],
    isLoading: boolean,
    studentQuestions: StudentQuestion[],
    timeToNextQuiz: number
    reactionValues: number[],
    lastReactionTime: number,
    reactionModes: boolean[],
}


const Store = (props: StoreProps) => {
    const [sendQuiz, setSendQuiz] = useState<ScheduledQuiz>(initialValue.sendQuiz);
    const [endedQuizzes, setEndedQuizzes] = useState<ScheduledQuiz[]>(initialValue.endedQuizzes);
    const [link, setLink] = useState(initialValue.link);
    const [lectureID, setLectureID] = useState(initialValue.lectureID);
    const [questions, setQuestions] = useState<Question[]>(initialValue.questions);
    const [quizzes, setQuizzes] = useState<FrontQuiz[]>(initialValue.quizzes);
    const [selectedQuiz, setSelectedQuiz] = useState(-1);
    const [sendQuizStep, setSendQuizStep] = useState(0);
    const [isLoading, setIsLoading] = useState(initialValue.isLoading);
    const [studentQuestions, setStudentQuestions] = useState<StudentQuestion[]>(initialValue.studentQuestions);
    const [timeToNextQuiz, setTimeToNextQuiz] = useState(initialValue.timeToNextQuiz);
    const [reactionValues, setReactionValues] = useState<number[]>(initialValue.reactionValues);
    const [lastReactionTime, setLastReactionTime] = useState<number>(initialValue.lastReactionTime);
    const [reactionModes, setReactionModes] = useState<boolean[]>(initialValue.reactionModes)

    useEffect(() => {
        let initial = loadFromStorage();
        setLink(initial.link);
        setLectureID(initial.lectureID);
        setQuestions(initial.questions);
        setQuizzes(initial.quizzes);
        setSendQuizStep(initial.sendQuizStep)
        setTimeToNextQuiz(initial.timeToNextQuiz);
    }, []);


    const value = {
        get link() {
            return link;
        },
        set link(newValue: string) {
            setLink(newValue);
            saveKey("link", newValue);
        },

        get lectureID() {
            return lectureID;
        },
        set lectureID(newValue: string | null) {
            setLectureID(newValue);
            saveKey("lectureID", newValue);
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

        get endedQuizzes() {
            return endedQuizzes;
        },
        set endedQuizzes(newValue: ScheduledQuiz[]) {
            setEndedQuizzes([...newValue]);
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

        get timeToNextQuiz() {
            return timeToNextQuiz;
        },
        set timeToNextQuiz(newValue: number) {
            setTimeToNextQuiz(newValue);
            saveKey("timeToNextQuiz", newValue);
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
        get reactionModes() {
            return reactionModes;
        },

        set reactionModes(newValue: boolean[]) {
            setReactionModes([...newValue]);
        },
    };

    return (
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    )
};

const initialValue: IStore = includeMockData(true,{
    link: "",
    lectureID: "",
    quizzes: [],
    questions: [],
    sendQuizStep: 0,
    endedQuizzes: [],
    sendQuiz: {
        students: [],
        questionStats: [],
        alreadyShowedResults: true,
    },
    isLoading: true,
    studentQuestions: [],
    timeToNextQuiz: 0,
    reactionValues: [0, 0, 0, 0, 0],
    reactionModes: [false, false, false, false, false],
    lastReactionTime: 30,
});


export const StoreContext = createContext<IStore>(loadFromStorage());

export default Store;
