/* Code adopted from: https://material-ui.com/components/tables/ */

import { makeStyles, useTheme, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useBackEnd, useBackEndSocket } from "../../services/BackEndService";
import { StoreContext } from "../../services/StoreService";
import { getComparator, Order, stableSort } from "../../util/comparators";
import { HeadCell, StudentListHead } from "./StudentListHead";

interface StudentListViewProps {
    lecture?: Lecture
}

export interface StudentListRow extends Student {
    orderIndex: number;
}

export function StudentListView(props: StudentListViewProps) {
    const backEnd = useBackEnd();
    const store = useContext(StoreContext);
    const { socketEmiter } = useBackEndSocket();
    
    const [studentList, setStudentList] = useState<StudentListRow[]>([]);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof StudentListRow>('orderIndex');

    const theme = useTheme();

    const classes = makeStyles({
        root: {
            maxWidth: "500px",
            margin: "15px auto",
            background: theme.palette.secondary.light,
            borderRadius: "0"
        },
        row: {
            "& td": {
                padding: "15px",
                textAlign: "left",
                verticalAlign: "middle",
                fontWeight: 300,
                fontSize: "14px",
                color: "#000",
                borderBottom: "solid 1px rgba(255,255,255,0.1)"
            },
            "&:nth-of-type(odd)": {
                background: "#fedf9d;"
            }
        }
    })();

    const refreshList = useCallback(() => {
        console.log("refreshList");
        backEnd.getStudentsForLecture(props.lecture?.id ?? store.sessionId ?? "")
            .then((list) => list.map((item, index) => {
                return { orderIndex: index + 1, ...item }
            }))
            .then(setStudentList)
            .catch((error) => console.log)
    },
        [backEnd, props.lecture?.id, store.sessionId],
    );

    useEffect(() => {
        socketEmiter.addListener("studentAdded", refreshList);
        return () => {
            socketEmiter.removeListener("studentAdded", refreshList);
        }
    }, [refreshList, socketEmiter])

    useEffect(() => {
        refreshList()
    }, [refreshList])

    const headCells: HeadCell<StudentListRow>[] = [
        { id: 'orderIndex', numeric: false, label: 'Nr' },
        { id: 'nick', numeric: false, label: 'Nick' },
        { id: 'name', numeric: false, label: 'Imię' },
        { id: 'surname', numeric: false, label: 'Nazwisko' },
    ];

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof StudentListRow) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <TableContainer component={Paper} className={classes.root}>
            <div><a target="_blank" rel="noreferrer" href={"http://localhost:3001/" + store.link}>LectureLink: http://localhost:3001/{store.link}</a></div>
            <Table aria-label="tabela z listą studentów">
                <StudentListHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    cells={headCells}
                />
                <TableBody>
                    {stableSort(studentList, getComparator(order, orderBy))
                        .map((row, index) => {
                            return (
                                <TableRow key={row.id} className={classes.row}>
                                    <TableCell>{row.orderIndex}</TableCell>
                                    <TableCell>{row.nick}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.surname}</TableCell>
                                </TableRow>
                            );
                        })}

                </TableBody>
            </Table>
        </TableContainer>
    );
}
