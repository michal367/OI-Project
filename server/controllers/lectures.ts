import Lecture from "../Lecture.ts";

const lectures = new Map();

const createLecture = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const lecture: Lecture = new Lecture("n/a");
  lectures.set(lecture.id, lecture);
  response.status = 201;
  response.body = {
    id: lecture.id,
  };
};

const listLectures = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  response.status = 200;
  response.body = [...lectures.values()];
};

const getLecture = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
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

const deleteLecture = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  lectures.delete(params.id);
  response.status = 204;
};

export { createLecture, listLectures, getLecture, deleteLecture };
