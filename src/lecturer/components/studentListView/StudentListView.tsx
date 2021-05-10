/* Code adopted from: https://material-ui.com/components/tables/ */

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
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../services/StoreService";
import { getComparator, Order, stableSort } from "../../util/comparators";
import { HeadCell, StudentListHead } from "./StudentListHead";
import copy from "copy-to-clipboard";

interface StudentListViewProps {
    studentList?: StudentListRow[];
    students?: [string[],any];
}

export interface StudentListRow extends Student {
    orderIndex: number;
}

export function StudentListView(props: StudentListViewProps) {

    const store = useContext(StoreContext);
    const studentList:StudentListRow[] = props.studentList ?? [];
    let [selectedStudents, toggleStudentSelection]:[string[], any] = props.students ?? [[], ()=>{}]
    const [students, setStudents] = useState<string[]>(selectedStudents);


    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof StudentListRow>("orderIndex");
    const changeSelectedStudents = (index:string) => () =>{
        toggleStudentSelection(index);
    }

    useEffect(() => {
        [selectedStudents, toggleStudentSelection] = props.students ?? [[], ()=>{}];
        setStudents(selectedStudents);
    }, [props.students]);

    const theme = useTheme();
    const classes = makeStyles({
        root: {
            width: "100%",
            background: theme.palette.secondary.light,
            borderRadius: "0",
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
                background: "#fedf9d;",
            },
        },
        table: {
            maxHeight: "100%",
        },
    })();

    const headCells: HeadCell<StudentListRow>[] = [
        { id: "orderIndex", numeric: false, label: "Nr" },
        { id: "nick", numeric: false, label: "Nick" },
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

    return (
        <TableContainer component={Paper} className={classes.root}>
            <Table stickyHeader aria-label="tabela z listą studentów" 
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
                                                inputProps={{
                                                    "aria-label":
                                                        "secondary checkbox",
                                                }}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>{row.nick}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.surname}</TableCell>
                                </TableRow>
                            );
                        }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
