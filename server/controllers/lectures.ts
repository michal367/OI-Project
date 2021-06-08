import { Response } from "https://deno.land/x/oak/mod.ts";
import { lectures } from "../websockets.ts";

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

export {
    getStudentsList
};
