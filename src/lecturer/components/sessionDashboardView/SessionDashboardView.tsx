import { makeStyles, useTheme } from "@material-ui/core";
import { useCallback, useContext, useEffect, useState } from "react";
import { useBackEnd, useBackEndSocket } from "../../services/BackEndService";
import { StoreContext } from "../../services/StoreService";
import { SendQuizView } from "../sendQuizView/SendQuizView";
import { useHistory } from "react-router-dom";
import {
    StudentListView,
    StudentListRow,
} from "../studentListView/StudentListView";
import { ShareSessionView } from "../shareSessionView/ShareSessionView";
import { useLocation } from "react-router-dom";


export function SessionDashboardView() {
    const location = useLocation<{ isOpen: boolean }>();
    let isOpen = false;
    if(location.state != undefined)
        isOpen = location.state.isOpen??false;
    const history = useHistory();
    const store = useContext(StoreContext);
    if (!store.sessionId || store.sessionId.length === 0) {
        history.goBack();
    }
    const backEnd = useBackEnd();
    const { socketEmiter } = useBackEndSocket();

    const [studentList, setStudentList] = useState<StudentListRow[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<string[]>(
        store.sendQuiz.students
    );

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
    };
    const toggleRandomSelectedStudents = (randomNumbers: Array<number>) => {
        let tmpQuiz: ScheduledQuiz = store.sendQuiz;
        let selectedStudents = randomNumbers.map((i) => studentList[i]);
        let mapById = (student: Student) => student.id;
        tmpQuiz.students = [...selectedStudents.map(mapById)];
        store.sendQuiz = tmpQuiz;
        setSelectedStudents(tmpQuiz.students);
    };
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
    };
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
            flexGrow: 0,
            display: "flex",
            gap: 10,
            marginBottom: "auto",
            padding: "0 10px",
        },
        aside: {
            width: "100%",
            flexShrink: 4,
            flexGrow: 1,
            height: "100%",
            minHeight: 100,
            padding: "10px 10px",
        },
        button: {
            marginLeft: "auto",
            marginBottom: "auto",
        },
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
        <>
            <div className={classes.root}>
                <div className={classes.main}>
                    <StudentListView
                        studentList={studentList}
                        students={[selectedStudents, toggleStudentSelection]}
                    />
                </div>
                <div className={classes.aside}>
                    <SendQuizView
                        studentList={studentList}
                        students={[
                            selectedStudents,
                            toggleAllSelectedStudents,
                            toggleRandomSelectedStudents,
                        ]}
                    />
                </div>
            </div>
            <ShareSessionView isOpen={isOpen} />
        </>
    );
}
