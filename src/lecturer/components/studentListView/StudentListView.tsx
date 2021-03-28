import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useBackEnd } from "../../services/backEnd/BackEndService";
import { HeadCell, Order, StudentListHead } from "./StudentListHead";

interface StudentListViewProps {
    lecture?: Lecture
}

export function StudentListView(props: StudentListViewProps) {
    const backEnd = useBackEnd();
    const [studentList, setStudentList] = useState<Student[]>([]);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Student>('nick');

    useEffect(() => {
        backEnd.getStudentsForLecture(props.lecture?.id ?? "").then((list) => {
            setStudentList(list);
        })
    }, [backEnd, props.lecture?.id])

    const headCells: HeadCell<Student>[] = [
        { id: 'name', numeric: false, label: 'Imię' },
        { id: 'surname', numeric: false, label: 'Nazwisko' },
        { id: 'nick', numeric: false, label: 'Nick' },
    ];

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Student) => {
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
                    {studentList.map((student, index) => (
                        <TableRow key={student.id}>
                            <TableCell>{student.nick}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.surname}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
