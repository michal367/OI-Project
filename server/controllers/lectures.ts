import Lecture from "../Lecture.ts";
import {Response} from "https://deno.land/x/oak/response.ts";
import {Request} from "https://deno.land/x/oak/request.ts";

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

const getStudentsList = ({
  params,
  response,
}:{
  params: {id: string };
  response: Response;
}) => {
  const selectedLecture = lectures.get(params.id);
  if (selectedLecture) {
    response.status = 200;
    response.body = selectedLecture.lectureStudents;
  } else {
    response.status = 404;
    response.body = {
      msg: "Lecture Not Found",
    };
  }
};

const addStudentToLecture = ({
  params,
  request,
  response,
}:{
  params:  {id: string};
  request: Request;
  response: Response;
}) => {
  const selectedLecture = lectures.get(params.id);
  if (selectedLecture) {
    selectedLecture.lectureStudents.addStudent("nick", "name", "surname");
    response.status = 200;
    response.body = {
      msg: "Student connection successfull!",
    };
  } else {
    response.status = 404;
    response.body = {
      msg: "Lecture Not Found",
    };
  }
};

export { create, list, get, remove, getStudentsList, addStudentToLecture };
