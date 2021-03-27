import { useEffect, useState } from "react";
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
        <pre>
            {
                JSON.stringify(studentList, null, 4)
            }
        </pre>
    );
}
