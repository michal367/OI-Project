import {
    makeStyles,
    useTheme,
} from "@material-ui/core";
import { useCallback, useContext, useEffect, useState } from "react";
import { useBackEnd, useBackEndSocket } from "../../services/BackEndService";
import { StoreContext } from "../../services/StoreService";
import { SendQuizView } from "../sendQuizView/SendQuizView";
import { StudentListView, StudentListRow } from "../studentListView/StudentListView";
import { CopyLinkButton } from "../studentListView/CopyLinkButton";

export function SessionDashboardView() {
    const backEnd = useBackEnd();
    const store = useContext(StoreContext);
    const { socketEmiter } = useBackEndSocket();

    const [studentList, setStudentList] = useState<StudentListRow[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<string[]>(store.sendQuiz.students);

    const toggleAllSelectedStudents = (checked: boolean) => {
        let tmpQuiz: ScheduledQuiz = store.sendQuiz;
        let mapById = (student: Student) => student.id;
        if (checked) {
            tmpQuiz.students = [];
        } else {
            tmpQuiz.students = [...studentList.map(mapById)];
        }

        store.sendQuiz = tmpQuiz;
        setSelectedStudents(tmpQuiz.students);
    }
    const toggleRandomSelectedStudents = (randomNumbers: Array<number>) => {
        let tmpQuiz: ScheduledQuiz = store.sendQuiz;
        let selectedStudents = randomNumbers.map(i => studentList[i])
        let mapById = (student: Student) => student.id;
        tmpQuiz.students = [...selectedStudents.map(mapById)];
        store.sendQuiz = tmpQuiz;
        setSelectedStudents(tmpQuiz.students);
    }
    const toggleStudentSelection = (id: string) => {
        let tmpQuiz: ScheduledQuiz = store.sendQuiz;
        let currentIndex = store.sendQuiz.students.indexOf(id);
        let newSelected = [...store.sendQuiz.students];

        if (currentIndex === -1) {
            newSelected.push(id);
        } else {
            newSelected.splice(currentIndex, 1);
        }

        tmpQuiz.students = newSelected;
        store.sendQuiz = tmpQuiz;
        setSelectedStudents(tmpQuiz.students);
    }
    const theme = useTheme();

    const classes = makeStyles({
        root: {
            background: theme.palette.primary.light,
            maxHeight: "100vh",
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            width: "100%",
            top: 0,
            zIndex: -1,
            paddingTop: "55px",
            paddingBottom: "10px",
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: "#fff",
        },
        main: {
            width: "100%",
            flexShrink: 2,
            flexGrow: 1,
            height: "100%",
            display: "flex",
            gap: 10,
            minHeight: 100,
            padding: "0 10px",
            flexDirection: "column",
        },
        aside: {
            width: "100%",
            flexShrink: 4,
            flexGrow: 1,
            height: "100%",
            minHeight: 100,
            padding: "10px 10px",
        },
        overlay: {
            minWidth: "80%",
            minHeight: "90%",
            width: 300,
            height: 400,
        }
    })();

    const refreshList = useCallback(() => {
        console.log("refreshList");
        backEnd
            .getStudentsForLecture(store.sessionId ?? "")
            .then((list) =>
                list.map((item, index) => {
                    return { orderIndex: index + 1, ...item };
                })
            )
            .then(setStudentList)
            .catch((error) => console.log);
    }, [backEnd, store.sessionId]);

    useEffect(() => {
        socketEmiter.addListener("studentAdded", refreshList);
        return () => {
            socketEmiter.removeListener("studentAdded", refreshList);
        };
    }, [refreshList, socketEmiter]);

    useEffect(() => {
        refreshList();
    }, [refreshList]);

    return (
        <div className={classes.root}>
            <div className={classes.main}>
                <StudentListView studentList={studentList} students={[selectedStudents, toggleStudentSelection]} />
                <CopyLinkButton />
            </div>

            <div className={classes.aside}>
                <SendQuizView studentList={studentList} students={[selectedStudents, toggleAllSelectedStudents, toggleRandomSelectedStudents]} />
            </div>
        </div>
    );
}
