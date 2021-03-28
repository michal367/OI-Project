/* Code adopted from: https://material-ui.com/components/tables/ */

import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useBackEnd } from "../../services/backEnd/BackEndService";
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
    const [studentList, setStudentList] = useState<StudentListRow[]>([]);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof StudentListRow>('orderIndex');

    useEffect(() => {
        backEnd.getStudentsForLecture(props.lecture?.id ?? "")
            .then((list) => list.map((item, index) => {
                return { orderIndex: index + 1, ...item }
            }))
            .then(setStudentList)
    }, [backEnd, props.lecture?.id])

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
        <TableContainer component={Paper}>
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
                                <TableRow key={row.id}>
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
