import Lecture from "../Lecture.ts";
import { Response, Request } from "https://deno.land/x/oak/mod.ts";
import Student from "../Student.ts";
const lectures = new Map();

const create = ({ response }: { response: Response }) => {
    const lecture: Lecture = new Lecture("n/a");
    lectures.set(lecture.id, lecture);
    response.status = 201;
    response.body = {
        id: lecture.id,
    };
};

const list = ({ response }: { response: Response }) => {
    response.status = 200;
    response.body = [...lectures.values()];
};

const get = ({
    params,
    response,
}: {
    params: { id: string };
    response: Response;
}) => {
    const selectedLecture: Lecture | undefined = lectures.get(params.id);
    if (selectedLecture) {
        response.status = 200;
        response.body = selectedLecture;
    } else {
        response.status = 404;
        response.body = {
            msg: "Lecture Not Found",
        };
    }
};

const remove = ({
    params,
    response,
}: {
    params: { id: string };
    response: Response;
}) => {
    lectures.delete(params.id);
    response.status = 204;
};

const link = ({
    params,
    response,
}: {
    params: { id: string };
    response: Response;
}) => {
    const selectedLecture: Lecture | undefined = lectures.get(params.id);
    if (selectedLecture) {
        response.status = 200;
        response.body = selectedLecture.link;
    } else {
        response.status = 404;
        response.body = {
            msg: "Lecture Not Found",
        };
    }
};

const getStudentsList = ({
    params,
    response,
}: {
    params: { id: string };
    response: Response;
}) => {
    const selectedLecture = lectures.get(params.id);
    if (selectedLecture) {
        response.status = 200;
        response.body = selectedLecture.studentList.asArray();
    } else {
        response.status = 404;
        response.body = {
            msg: "Lecture Not Found",
        };
    }
};

const addStudentToLecture = async ({
    params,
    request,
    response,
}: {
    params: { link: string };
    request: Request;
    response: Response;
}) => {
    const jsonData = await request.body({ type: "json" }).value;
    const selectedLecture: Lecture | undefined = [...lectures.values()].find(
        (lecture) => lecture.link === params.link
    );
    if (selectedLecture) {
        const student = new Student(
            jsonData["nick"],
            jsonData["name"],
            jsonData["surname"],
            selectedLecture
        );
        let add = true
        const array = selectedLecture.studentList.asArray()
        for(let i = 0; i < array.length; i++){
            if (selectedLecture.studentList.compareTwoStudents(student, array[i])){
                response.status = 404;
                response.body = {
                    msg: "Student already added",
                };
                add = false;
                break;
            }
        }
        
        if (add){
            selectedLecture.studentList.addStudent(student);
            response.status = 200;
            response.body = {
                msg: "Student connection successfull!",
                student_id: student.id
            };
        }
    } else {
        response.status = 404;
        response.body = {
            msg: "Lecture Not Found",
        };
    }
};

const getLectureByLink = ({
    params,
    response,
}: {
    params: { link: string };
    response: Response;
}) => {
    const selectedLecture: Lecture | undefined = [...lectures.values()].find(
        (lecture) => lecture.link === params.link
    );
    if (selectedLecture) {
        response.status = 200;
        response.body = selectedLecture;
    } else {
        response.status = 404;
        response.body = {
            msg: "Lecture Not Found",
        };
    }
};

const getStudentById = ({
    params,
    response,
}: {
    params: { l_id: string; s_id: string };
    response: Response;
}) => {
    const selectedLecture: Lecture | undefined = lectures.get(params.l_id);
    if (selectedLecture) {
        const selectedStudent:
            | Student
            | undefined = selectedLecture.studentList.getStudent(params.s_id);
        if (selectedStudent) {
            response.status = 200;
            response.body = selectedStudent;
        } else {
            response.status = 404;
            response.body = {
                msg: "Student Not found",
            };
        }
    } else {
        response.status = 404;
        response.body = {
            msg: "Lecture Not Found",
        };
    }
};

export {
    create,
    list,
    get,
    remove,
    getStudentsList,
    addStudentToLecture,
    link,
    getLectureByLink,
    getStudentById,
    lectures,
};
