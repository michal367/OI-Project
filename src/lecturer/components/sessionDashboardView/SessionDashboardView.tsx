import { Card, Fab, IconButton, makeStyles, Typography, useTheme } from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useBackEnd } from "../../services/BackEndService";
import { useSocket } from "../../services/SocketService";
import { StoreContext } from "../../services/StoreService";
import { ReactionReceiveView } from "../reactionReceiveView/ReactionReceiveView";
import { SendQuizView } from "../sendQuizView/SendQuizView";
import { ShareSessionView } from "../shareSessionView/ShareSessionView";
import {
    StudentListRow, StudentListView
} from "../studentListView/StudentListView";
import StudentsQuestionListView from "../studentsQuestionView/StudentsQuestionListView";
import { lazareTheme } from "../../util/theme/customTheme";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export function SessionDashboardView(props: { update: () => void }) {
    const location = useLocation<{ isOpen: boolean }>();
    let isOpen = false;

    if (location.state !== undefined) isOpen = location.state.isOpen ?? false;

    const store = useContext(StoreContext);
    const backEnd = useBackEnd();
    const { socketEmiter, sendJsonMessage } = useSocket();

    const [studentList, setStudentList] = useState<StudentListRow[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<string[]>(
        store.sendQuiz.studentIDs
    );
    const [minimizeColumns, setMinimizeColumns] = useState<boolean>(true);

    const toggleAllSelectedStudents = (checked: boolean) => {
        let tmpQuiz: ScheduledQuiz = store.sendQuiz;
        let mapById = (student: Student) => student.id;
        if (checked) {
            tmpQuiz.studentIDs = [];
        } else {
            tmpQuiz.studentIDs = [...studentList.map(mapById)];
        }

        store.sendQuiz = tmpQuiz;
        setSelectedStudents(tmpQuiz.studentIDs);
    };

    const toggleRandomSelectedStudents = (randomNumbers: Array<number>) => {
        let tmpQuiz: ScheduledQuiz = store.sendQuiz;
        let selectedStudents = randomNumbers.map((i) => studentList[i]);
        let mapById = (student: Student) => student.id;
        tmpQuiz.studentIDs = [...selectedStudents.map(mapById)];
        store.sendQuiz = tmpQuiz;
        setSelectedStudents(tmpQuiz.studentIDs);
    };

    const toggleStudentSelection = (id: string) => {
        let tmpQuiz: ScheduledQuiz = store.sendQuiz;
        let currentIndex = store.sendQuiz.studentIDs.indexOf(id);
        let newSelected = [...store.sendQuiz.studentIDs];

        if (currentIndex === -1) {
            newSelected.push(id);
        } else {
            newSelected.splice(currentIndex, 1);
        }

        tmpQuiz.studentIDs = newSelected;
        store.sendQuiz = tmpQuiz;
        setSelectedStudents(tmpQuiz.studentIDs);
    };
    const theme = useTheme();

    const classes = makeStyles({
        root: {
            ...lazareTheme.root,
            flexDirection: "column",
            maxHeight: "calc(100vh - 48px)",
        },
        aside:{
            flexShrink: 0,
            width: 400,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            minHeight: "calc(32vh - 18px)",
            ...(() => {
                if(minimizeColumns) return {
                    maxHeight: "calc(100vh - 648px)" 
                }
                return { maxHeight : "calc(100vh - 248px)", 
                minHeight: "calc(100vh - 298px)",}
            })(),
            alignSelf: "flex-end",
        },
        sessionDetails: {
            padding: 20,
            flexGrow: 1,
            display: "grid",
            gridTemplateColumns: "auto auto", 
            gridAutoRows: "minmax(60px, min-content)",
            gap: 10,
            borderRadius: 0,
        },
        sessionName:{
            gridColumn: "span 2",
        },
        content: {
            ...lazareTheme.fullWidthWrapper,
            flexDirection: "row",
            justifyContent: "space-between",
            flexShrink: 1,
            flexGrow: 1,
            paddingRight: 15,
            gap: 15,
        },
        contentBottom:{
            ...lazareTheme.fullWidthWrapper,
        },
        columns: {
            ...lazareTheme.twoColumns.wrapper,
            gap: 15,
        },
        bottomSection: {
            width: "100%",
            transition: "max-height .5s",
            height: 600,
            ...(() => {
                if(minimizeColumns) return {
                    maxHeight: "68vh"
                }
                return {maxHeight : 250}
            })(),
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: "#fff",
        },
        column: {
            height: "100%",
            width: "100%",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        },
        columnWrapper: {
            flexGrow: 1,
            transition: "max-height .5s",
            maxHeight: "calc(100% - 58px)",
        },
        columnFooter: {
            maxHeight: "100px",
            flexShrink: 0,
        },
        button: {
            marginLeft: "auto",
            marginBottom: "auto",
        },
        minimalButton: {
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            textAlign: "center",
        }
    })();

    const refreshList = useCallback((parsed: StudentAddedPayload) => {
        const newStudentList: StudentListRow[] = studentList;
        const studentRow: StudentListRow = {
            orderIndex: newStudentList.length + 1,
            id: parsed.data.id,
            name: parsed.data.name,
            surname: parsed.data.surname,
            nick: parsed.data.nick
        }
        newStudentList.push(studentRow);
        setStudentList(newStudentList);
        console.log("list refreshed with one student")
        
        if (store.nicks === undefined) store.nicks = new Map();

        store.nicks.set(parsed.data.id, parsed.data.nick)

        let timeStamp: Timestamp = {
            type: "LogType",
            message: "Dołączył",
            minutes: new Date().getMinutes().toString(),
            hours: new Date().getHours().toString(),
            owner: parsed.data.nick,
        }
    
        store.timestamps.push(timeStamp);
    }, [studentList]);

    useEffect(() => {
        socketEmiter.addListener("student_added", refreshList);
        return () => {
            socketEmiter.removeListener("student_added", refreshList);
        };
    }, [refreshList, socketEmiter]);

    // TODO
    // I do not know what is happening here
    // I use similar format to refresh whole list for ws ap as for rest api
    // useEffect() makes it go into infinite loop of refreshing
    // I guess something in depts array is being changed during callback invocation
    // I do not know how to fix it, so I leave it be as for now and I let rest manage list refreshing
    //
    // const handleGetStudentList = useCallback((parsed: GetStudentListResponsePayload) =>{
    //     const mapped: StudentListRow[] = parsed.data.studentList.map((item, index) => {return { orderIndex: index + 1, ...item };});
    //     setStudentList(mapped);
    //     // socketEmiter.off("student_list", handleGetStudentList);
    // }, []); 
    //
    // const refreshListWithWholeList = useCallback(() => {
    //     socketEmiter.on("student_list", handleGetStudentList);
    //     const payload: Payload = {
    //         event: "get_student_list"
    //     };
    //     sendJsonMessage(payload); 

    // }, [handleGetStudentList, sendJsonMessage, socketEmiter]);

    // useEffect(() => {
    //     socketEmiter.once("student_list", handleGetStudentList);
    //     const payload: Payload = {
    //         event: "get_student_list"
    //     };
    //     sendJsonMessage(payload); 
    //     return () => {
    //         socketEmiter.removeListener("student_list", handleGetStudentList);
    //     };
    // }, [handleGetStudentList, sendJsonMessage, socketEmiter]);

    const refreshListWithWholeListWithRest = useCallback(() => {
        console.log("refreshList");
        backEnd
            .getStudentsForLecture(store.lectureID ?? "")
            .then((list) =>
                list.map((item, index) => {
                    return { orderIndex: index + 1, ...item };
                })
            )
            .then(setStudentList)
            .catch((error) => console.log);
    }, [backEnd, store.lectureID]);

    useEffect(() => {
        refreshListWithWholeListWithRest();
    }, [refreshListWithWholeListWithRest]);

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <div className={classes.aside} style={{transition: "max-height .5s, min-height .5s",}}>
                    <Card className={classes.sessionDetails}>
                        <Typography className={classes.sessionName}>{"Zajęcia: " + store.lectureName}</Typography>
                        <ShareSessionView isOpen={isOpen} update={props.update} />
                    </Card>
                    <div className={classes.minimalButton}>
                        <IconButton  onClick={()=>setMinimizeColumns(prev=>!prev)}> {minimizeColumns ? (<ExpandMoreIcon />) : (<ExpandLessIcon />)}</IconButton>
                    </div>
                </div>
                <div className={classes.columns}>
                    <div className={classes.column}>
                        <StudentListView
                            studentList={studentList}
                            students={[selectedStudents, toggleStudentSelection]}
                            minimal={minimizeColumns}
                            setMinimal={setMinimizeColumns}
                        />
                    </div>
                    <div className={classes.column}>
                        <SendQuizView
                            studentList={studentList}
                            students={[
                                selectedStudents,
                                toggleAllSelectedStudents,
                                toggleRandomSelectedStudents,
                            ]}
                            minimal={minimizeColumns}
                            setMinimal={setMinimizeColumns}
                        />
                    </div>
                </div>
            </div>
            <div className={classes.contentBottom}>
                <div className={classes.bottomSection}>
                    <div className={classes.column}>
                        <div className={classes.columnWrapper}>
                            <StudentsQuestionListView />
                        </div>
                        <div className={classes.columnFooter}>
                            <ReactionReceiveView />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
