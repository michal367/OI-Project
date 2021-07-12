import { createContext, ReactNode, useEffect, useState } from "react";
import { lazareLocalStorage } from "../../common/util/LazareLocalStorage";
import { includeMockData } from "../util/mock/includeMockData";
import { v4 } from "uuid";
export interface StoreProps {
    children: ReactNode
}
export interface IStore {
    [key: string]: any;
    link: string,
    lectureID: string|null,
    timestamps: Timestamp[],
    questions: Question[],
    quizzes: FrontQuiz[],
    sendQuizStep: number,
    sendQuiz: ScheduledQuiz,
    scheduledQuizzes: ScheduledQuiz[],
    isLoading: boolean,
    studentQuestions: StudentQuestion[],
    timeToNextQuiz: number
    reactionValues: number[],
    lastReactionTime: number,
    reactionModes: boolean[],
    lectureName: string,
    tutorFirstName: string,
    tutorLastName: string,
    operation?: {
        clearOnSessionEnd: () => void
    }
}

type StorageKey =
    "link" |
    "lectureID" |
    "timestamps" |
    "questions" |
    "quizzes" |
    "sendQuizStep" |
    "studentQuestions" |
    "scheduledQuizzes" |
    "timeToNextQuiz" |
    "reactionModes" |
    "reactionValues" |
    "lectureName" |
    "tutorFirstName" |
    "tutorLastName" |
    "lastReactionTime";

const independentStorageKeys = ["questions", "quizzes", "tutorFirstName", "tutorLastName"];


// REMEMBER TO BUMP UP VERSION(STORAGE_VERSION) WHEN THE DATA TYPE THAT IS SAVED TO LOCAL STORAGE CHANGES
const STORAGE_VERSION = "0.5";
const KEY_PREFIX = "lecturer.";

const { loadKey, loadKeyForArray, saveKey, upgradeStorage } = lazareLocalStorage<StorageKey>(KEY_PREFIX, STORAGE_VERSION);

const initialValue: IStore = includeMockData(true, {
    link: "",
    lectureID: null,
    timestamps: [],
    quizzes: [],
    lectureName: "",
    tutorFirstName: "",
    tutorLastName: "",
    questions: [],
    sendQuizStep: 0,
    scheduledQuizzes: [],
    sendQuiz: {
        id: v4(),
        studentIDs: [],
        questionStats: [],
        alreadyShowedResults: false,
        timeSeconds: 0,
        inProgress: true,
        timeToEnd: 0,
    },
    isLoading: true,
    studentQuestions: [],
    timeToNextQuiz: 0,
    reactionValues: [0, 0, 0, 0, 0],
    reactionModes: [false, false, false, false, false],
    lastReactionTime: 0,
});

const loadFromStorage = () => {
    let obj: IStore = {
        ...initialValue,
        link: loadKey("link") ?? initialValue.link,
        lectureID: loadKey("lectureID") ?? initialValue.lectureID,
        timestamps: loadKey("timestamps") ?? initialValue.timestamps,
        questions: loadKeyForArray("questions", initialValue.questions),
        quizzes: loadKeyForArray("quizzes", initialValue.quizzes),
        sendQuizStep: loadKey("sendQuizStep") ?? initialValue.sendQuizStep,
        timeToNextQuiz: loadKey("timeToNextQuiz") ?? initialValue.timeToNextQuiz,
        reactionModes: loadKey("reactionModes") ?? initialValue.reactionModes,
        reactionValues: loadKey("reactionValues") ?? initialValue.reaction,
        lastReactionTime: loadKey("lastReactionTime") ?? initialValue.lastReaction,
        scheduledQuizzes: loadKey("scheduledQuizzes") ?? initialValue.scheduledQuizzes,
        studentQuestions: loadKey("studentQuestions") ?? initialValue.studentQuestions,
        lectureName: loadKey("lectureName") ?? initialValue.lectureName,
        tutorFirstName: loadKey("tutorFirstName") ?? initialValue.tutorFirstName,
        tutorLastName: loadKey("tutorLastName") ?? initialValue.tutorLastName
    }

    return obj;
}

const Store = (props: StoreProps) => {
    const [sendQuiz, setSendQuiz] = useState(initialValue.sendQuiz);
    const [scheduledQuizzes, setScheduledQuizzes] = useState(initialValue.scheduledQuizzes);
    const [link, setLink] = useState(initialValue.link);
    const [lectureID, setLectureID] = useState(initialValue.lectureID);
    const [timestamps, setTimestamps] = useState(initialValue.timestamps);
    const [questions, setQuestions] = useState(initialValue.questions);
    const [quizzes, setQuizzes] = useState(initialValue.quizzes);
    const [sendQuizStep, setSendQuizStep] = useState(initialValue.sendQuizStep);
    const [isLoading, setIsLoading] = useState(initialValue.isLoading);
    const [studentQuestions, setStudentQuestions] = useState(initialValue.studentQuestions);
    const [timeToNextQuiz, setTimeToNextQuiz] = useState(initialValue.timeToNextQuiz);
    const [reactionValues, setReactionValues] = useState(initialValue.reactionValues);
    const [lastReactionTime, setLastReactionTime] = useState(initialValue.lastReactionTime);
    const [reactionModes, setReactionModes] = useState(initialValue.reactionModes)
    const [lectureName, setLectureName] = useState(initialValue.lectureName)
    const [tutorFirstName, setTutorFirstName] = useState(initialValue.tutorFirstName)
    const [tutorLastName, setTutorLastName] = useState(initialValue.tutorLastName)

    useEffect(() => {
        if (upgradeStorage()) return;

        let initial = loadFromStorage();
        setLink(initial.link);
        setLectureID(initial.lectureID);
        setQuestions(initial.questions);
        setQuizzes(initial.quizzes);
        setSendQuizStep(initial.sendQuizStep)
        setTimeToNextQuiz(initial.timeToNextQuiz);
    }, []);


    const value: IStore = {
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

        get lectureName() {
            return lectureName;
        },
        set lectureName(newValue: string) {
            setLectureName(newValue);
            saveKey("lectureName", newValue);
        },

        get tutorFirstName() {
            return tutorFirstName;
        },
        set tutorFirstName(newValue: string) {
            setTutorFirstName(newValue);
            saveKey("tutorFirstName", newValue);
        },

        get tutorLastName() {
            return tutorLastName;
        },
        set tutorLastName(newValue: string) {
            setTutorLastName(newValue);
            saveKey("tutorLastName", newValue);
        },

        get timestamps() {
            return timestamps;
        },
        set timestamps(newValue: Timestamp[]) {
            let array = [...newValue];
            setTimestamps(array);
            saveKey("timestamps", array);
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
            saveKey("scheduledQuizzes", newValue);
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
            saveKey("studentQuestions", newValue);
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
            saveKey("reactionValues", newValue);
        },

        get lastReactionTime() {
            return lastReactionTime;
        },
        set lastReactionTime(newValue: number) {
            setLastReactionTime(newValue);
            saveKey("lastReactionTime", newValue);
        },

        get reactionModes() {
            return reactionModes;
        },
        set reactionModes(newValue: boolean[]) {
            setReactionModes([...newValue]);
            saveKey("reactionModes", newValue);
        },

        operation: {
            clearOnSessionEnd: () => {
                for (const property in initialValue) {
                    if (independentStorageKeys.indexOf(property) === -1) {
                        value[property] = initialValue[property as keyof typeof initialValue];
                    }
                }
            }
        }
    };

    return (
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    )
};

export const StoreContext = createContext<IStore>(loadFromStorage());

export default Store;
