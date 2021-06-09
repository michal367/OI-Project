import { createContext, ReactNode, useEffect, useState } from "react";
import { lazareLocalStorage } from "../../common/util/LazareLocalStorage";

export interface StoreProps {
    children: ReactNode
}

export interface IStore {
    [key: string]: any;
    invitation: string,
    studentNick: string,
    studentId: string | null,
    quizzes: FrontQuiz[],
    isLoading: boolean,
    studentQuestion: StudentQuestion,
    operation?: {
        clear: () => void
    },
    quizTime: number,
    quizId: string,
}

type StorageKey =
    "invitation" |
    "studentNick" |
    "studentId" |
    "quizzes";

// REMEMBER TO BUMP UP VERSION(STORAGE_VERSION) WHEN THE DATA TYPE THAT IS SAVED TO LOCAL STORAGE CHANGES
const STORAGE_VERSION = "0.2";
const KEY_PREFIX = "student.";

const { loadKey, saveKey, upgradeStorage } = lazareLocalStorage<StorageKey>(KEY_PREFIX, STORAGE_VERSION);

const initialValue: IStore = {
    invitation: "",
    studentNick: "",
    studentId: null,
    quizzes: [],
    isLoading: true,
    studentQuestion: {
        studentNick: "",
        time: new Date(),
        text: "",
        processed: false,
    },
    sessionName: "",
    tutorName: "",
    quizTime: 0,
    quizStartTime: 0,
    quizId: ""
}

const loadFromStorage = () => {
    let obj: IStore = {
        ...initialValue,
        invitation: loadKey("invitation") ?? initialValue.invitation,
        studentNick: loadKey("studentNick") ?? initialValue.studentNick,
        quizzes: loadKey("quizzes") ?? initialValue.quizzes,
        studentId: loadKey("studentId") ?? initialValue.studentId,
    }

    return obj;
}

const Store = (props: StoreProps) => {
    const [invitation, setInvitation] = useState(initialValue.invitation);
    const [studentNick, setStudentNick] = useState(initialValue.studentNick);
    const [studentId, setStudentId] = useState(initialValue.studentId);
    const [quizzes, setQuizzes] = useState(initialValue.quizzes);
    const [isLoading, setIsLoading] = useState(initialValue.isLoading);
    const [studentQuestion, setStudentQuestion] = useState<StudentQuestion>(initialValue.studentQuestion);
    const [sessionName, setSessionName] = useState(initialValue.sessionName);
    const [tutorName, setTutorName] = useState(initialValue.tutorName);
    const [quizTime, setQuizTime] = useState(initialValue.quizTime);
    const [quizStartTime, setQuizStartTime] = useState(initialValue.quizStartTime);
    const [quizId, setQuizId] = useState(initialValue.quizId);

    useEffect(() => {
        if (upgradeStorage()) return;

        let initial = loadFromStorage();
        setInvitation(initial.invitation);
        setStudentNick(initial.studentNick);
        setQuizzes(initial.quizzes);
        setStudentId(initial.studentId);
    }, [])

    const value: IStore = {
        get invitation() {
            return invitation;
        },
        set invitation(newValue: string) {
            setInvitation(newValue);
            saveKey("invitation", newValue);
        },

        get studentNick() {
            return studentNick;
        },
        set studentNick(newValue: string) {
            setStudentNick(newValue);
            saveKey("studentNick", newValue);
        },

        get studentId() {
            return studentId;
        },
        set studentId(newValue: string | null) {
            setStudentId(newValue);
            saveKey("studentId", newValue);
        },

        get quizzes() {
            return quizzes;
        },
        set quizzes(newValue: FrontQuiz[]) {
            let array = [...newValue];
            setQuizzes(array);
            saveKey("quizzes", array);
        },

        get isLoading() {
            return isLoading;
        },
        set isLoading(newValue: boolean) {
            setIsLoading(newValue);
        },

        get studentQuestion() {
            return studentQuestion
        },
        set studentQuestion(newQuestion: StudentQuestion) {
            setStudentQuestion(newQuestion);
        },
        
        get sessionName() {
            return sessionName
        },
        set sessionName(newValue: string) {
            setSessionName(newValue);
        },

        get tutorName() {
            return tutorName
        },
        set tutorName(newValue: string) {
            setTutorName(newValue);
        },
        
        get quizTime() {
            return quizTime;
        },
        set quizTime(newValue: number) {
            setQuizTime(newValue);
        },
        
        get quizStartTime() {
            return quizStartTime;
        },
        set quizStartTime(newValue: number) {
            setQuizStartTime(newValue);
        },

        get quizId() {
            return quizId;
        },
        set quizId(newValue: string) {
            setQuizId(newValue);
        },

        operation: {
            clear: () => {
                for (const property in initialValue) {
                    value[property] = initialValue[property as keyof typeof initialValue];
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

export const StoreContext = createContext<IStore>(initialValue);

export default Store;
