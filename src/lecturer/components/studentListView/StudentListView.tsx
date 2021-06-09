import {
    makeStyles,
    useTheme,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    Checkbox,
    TableRow,
    Card,
    Button,
    Typography,
    Divider,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Order, stableSort, getComparator } from "../../../common/util/comparators";
import { StoreContext } from "../../services/StoreService";
import { HeadCell, StudentListHead } from "./StudentListHead";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

interface StudentListViewProps {
    studentList?: StudentListRow[];
    students?: [string[], (id: string) => void];
    minimal?: boolean;
    setMinimal?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface StudentListRow extends Student {
    orderIndex: number;
}

export function StudentListView(props: StudentListViewProps) {

    const store = useContext(StoreContext);
    const studentList: StudentListRow[] = props.studentList ?? [];

    let [selectedStudents, toggleStudentSelection]: [string[], (id: string) => void] = props.students ?? [[], () => { }]

    const [students, setStudents] = useState<string[]>(selectedStudents);
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof StudentListRow>("orderIndex");
    const [minimal, setMinimal] = useState(props.minimal);
    useEffect(() => setMinimal(props.minimal));

    const changeSelectedStudents = (index: string) => () => {
        toggleStudentSelection(index);
    }

    useEffect(() => {
        if (props.students) {
            let [students] = props.students;
            setStudents(students);
        }
    }, [props.students]);

    const theme = useTheme();
    const classes = makeStyles({
        root: {
            width: "100%",
            padding: 1,
            height: "93%",
            ...(()=>{
                if(minimal) return {maxHeight: 220}
                return {maxHeight: "100vh"}
            })(),
            "& .MuiTableContainer-root":{
                height: "100%",
            },
        },
        row: {
            "& td": {
                padding: "0 0 0 16px",
                height: "46px",
                textAlign: "left",
                verticalAlign: "middle",
                fontWeight: 300,
                fontSize: "14px",
                color: "#000",
                borderBottom: "solid 1px rgba(255,255,255,0.1)",
            },
            "&:nth-of-type(odd)": {
                background: "rgba(65, 101, 138, 0.2)",
            },
        },
        table: {
            maxHeight: "100%",

        },
        minimalContent: {
            height: "100%",
            width: "100%",
            backgroundColor: "white",
            fontSize: 24,
            "& .MuiButton-label":{
                display: "flex",
                gap: 10,
            }
        }
    })();

    const headCells: HeadCell<StudentListRow>[] = [
        { id: "orderIndex", numeric: false, label: "Nr" },
        //{ id: "nick", numeric: false, label: "Nick" },
        { id: "name", numeric: false, label: "Imię" },
        { id: "surname", numeric: false, label: "Nazwisko" },
    ];

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof StudentListRow
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    const updateMinimal = () => {
        if(props.setMinimal)
            props!.setMinimal(prev=>!prev)
        setMinimal(prev=>!prev);
    }

    return (
        <Card className={classes.root} style={{transition: "max-height 0.5s"}}>
            {minimal ?
                (<Button
                    variant="outlined"
                    color="secondary"
                    className={classes.minimalContent}
                    size="large"
                    onClick={()=>props.setMinimal?updateMinimal():null}
                >
                    <span>{"Lista uczestników"}</span>
                    <Divider orientation="vertical" flexItem/>
                    <span style={{display: "inline-flex"}}><PeopleAltIcon fontSize="large" />
                    {studentList.length}</span>
                </Button>) :
                (<TableContainer>
                    <Table stickyHeader
                        className={classes.table}
                    >
                        <StudentListHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            cells={headCells}
                        />
                        <TableBody>
                            {stableSort(studentList, getComparator(order, orderBy)).map(
                                (row, index) => {
                                    return (
                                        <TableRow key={row.id} className={classes.row}>
                                            <TableCell>
                                                {row.orderIndex}
                                                {store.sendQuizStep >= 2 && (
                                                    <Checkbox
                                                        disabled={
                                                            store.sendQuizStep >= 3
                                                        }
                                                        color="primary"
                                                        onChange={changeSelectedStudents(row.id)}
                                                        checked={
                                                            students.indexOf(
                                                                row.id
                                                            ) !== -1
                                                        }
                                                    />
                                                )}
                                            </TableCell>
                                            {/*<TableCell>{row.nick}</TableCell>*/}
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.surname}</TableCell>
                                        </TableRow>
                                    );
                                }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>)}
        </Card>
    );
}
