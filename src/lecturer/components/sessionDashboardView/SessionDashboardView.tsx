import { makeStyles, useTheme } from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useBackEnd } from "../../services/BackEndService";
import { StoreContext } from "../../services/StoreService";
import { SendQuizView } from "../sendQuizView/SendQuizView";
import { useHistory } from "react-router-dom";
import {
    StudentListView,
    StudentListRow,
} from "../studentListView/StudentListView";
import { ShareSessionView } from "../shareSessionView/ShareSessionView";
import { useLocation } from "react-router-dom";
import StudentsQuestionListView from "../studentsQuestionView/StudentsQuestionListView";
import { ReactionReceiveView } from "../reactionReceiveView/ReactionReceiveView";
import { useSocket } from "../../services/SocketService";

export function SessionDashboardView() {
    const location = useLocation<{ isOpen: boolean }>();
    let isOpen = false;
    if (location.state !== undefined) isOpen = location.state.isOpen ?? false;
    const history = useHistory();
    const store = useContext(StoreContext);
    if (!store.sessionId || store.sessionId.length === 0) {
        history.goBack();
    }
    const backEnd = useBackEnd();
    const { socketEmiter } = useSocket();

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
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            position: "absolute",
            width: "100%",
            top: 0,
            zIndex: -1,
            padding: "0 10px",
            paddingTop: 60,
            paddingBottom: 100,
            gap: 30,
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: "#fff",
        },
        column: {
            height: "100%",
            width: "100%",
            marginBottom: "auto",
            display: "flex",
            flexDirection: "column",
        },
        columnWrapper: {
            flexGrow: 1,
            overflow: "auto",
            maxHeight: "calc(80vh)",
        },
        columnFooter: {
            maxHeight: "100px",
            flexShrink: 0,
        },
        button: {
            marginLeft: "auto",
            marginBottom: "auto",
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
        <>
            <div className={classes.root}>
                <div className={classes.column}>
                    <StudentListView
                        studentList={studentList}
                        students={[selectedStudents, toggleStudentSelection]}
                    />
                </div>
                <div className={classes.column}>
                    <div className={classes.columnWrapper}>
                        <StudentsQuestionListView />
                    </div>
                    <div className={classes.columnFooter}>
                        <ReactionReceiveView />
                    </div>
                </div>
                <div className={classes.column}>
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
