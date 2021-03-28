import Lecture from "../Lecture.ts";
import {Response} from "https://deno.land/x/oak/response.ts";
//import {Request} from "https://deno.land/x/oak/request.ts";

const lectures = new Map();

const create = async ({
  response
}: {
  response: Response;
}) => {
  const lecture: Lecture = new Lecture("n/a");
  lectures.set(lecture.id, lecture);
  response.status = 201;
  response.body = {
    id: lecture.id,
  };
};

const list = async ({
  response
}: {
  response: Response;
}) => {
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

// TODO: write student list proceed functions
// addStudent
// getStudent
// showStudents
// deleteStudent


export { create, list, get, remove };
