import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useBackEnd } from "../../services/backEnd/BackEndService";

interface StudentListViewProps {
    lecture?: Lecture
}

export function StudentListView(props: StudentListViewProps) {
    const backEnd = useBackEnd();
    const [studentList, setStudentList] = useState<Student[]>([]);

    useEffect(() => {
        backEnd.getStudentsForLecture(props.lecture?.id ?? "").then((list) => {
            setStudentList(list);
        })
    }, [backEnd, props.lecture?.id])


    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nr</TableCell>
                        <TableCell>Nick</TableCell>
                        <TableCell>Imię</TableCell>
                        <TableCell>Nazwisko</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {studentList.map((student, index) => (
                        <TableRow key={student.id}>
                            <TableCell>{index}</TableCell>
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
