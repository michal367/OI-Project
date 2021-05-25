import { createContext, ReactNode, useEffect, useState } from "react";

export interface StoreProps {
    children: ReactNode
}

export interface IStore {
    [key: string]: any;
    invitation: string,
    studentNick: string,
    studentId: string,
    quizzes: FrontQuiz[],
    isLoading: boolean,
    studentQuestion: StudentQuestion,
    operation?: {
        clear: () => void
    }
}

type StorageKey =
    "invitation" |
    "studentNick" |
    "studentId" |
    "quizzes";

const stringKey = (key: StorageKey) => {
    return "lazare.student." + key;
}

const loadKey = (key: StorageKey) => {
    let obj = JSON.parse(localStorage.getItem(stringKey(key)) ?? "null");
    console.log("loadKey", obj);
    return obj;
}

const saveKey = (key: StorageKey, value: any) => {
    if (value === undefined) return;
    console.log("saveKey", value);
    return localStorage.setItem(stringKey(key), JSON.stringify(value));
}

const initialValue: IStore = {
    invitation: "",
    studentNick: "",
    studentId: "",
    quizzes: [],
    isLoading: true,
    studentQuestion: {
        studentNick: "",
        time: new Date(),
        text: "",
        processed: false,
    },
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
    useEffect(() => {
        let initial = loadFromStorage();
        setInvitation(initial.invitation);
        setStudentNick(initial.studentNick);
        setQuizzes(initial.quizzes);
    }, [])

    const value : IStore = {
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
        set studentId(newValue: string) {
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