
// type createLectureEventTypes = "create_lecture" | "lecture_created" | "lecture_not_created";
// type reconnectLectureEventTypes = "reconnect_lecture" | "lecture_reconnected" | "lecture_not_reconnected";
// type deleteLectureEventTypes = "delete_lecture" | "lecture_ended";
// type studentCreationEventTypes = "student_added" | "student_deleted";
// type quizActivityEventTypes = "send_quiz" | "quiz_in_progress" | "quiz_answers_added" | "quiz_ended";
// type studentListEventTypes = "get_student_list" | "student_list";
// type createStudentEventTypes = "create_student" | "student_created" | "student_not_created";
// type reconnectStudentEventTypes = "reconnect_student" | "student_reconnected" | "student_not_reconnected";
// type deleteStudentEventTypes = "delete_student" | "student_deleted";
// type quizStudentActivityEventTypes = "send_quiz_response" | "student_answers_added" | "student_answers_not_added";
// type studentReactionEventTypes = "send_reaction" | "student_reaction_sent" | "student_reaction_not_sent" | "send_student_reaction";
// type checkLinkEventTypes = "check_link" | "valid_link" | "invalid_link";

// type eventType = 
//     createLectureEventTypes |
//     reconnectLectureEventTypes |
//     deleteLectureEventTypes |
//     studentCreationEventTypes |
//     quizActivityEventTypes |
//     studentListEventTypes |
//     createStudentEventTypes |
//     reconnectStudentEventTypes |
//     deleteStudentEventTypes |
//     quizStudentActivityEventTypes |
//     studentReactionEventTypes |
//     checkLinkEventTypes
//     ;

interface Payload {
    event: string,
    data?: any
}

interface LectureCreateRequestPayload extends Payload {
    data: {
        tutor: string
    }
}
interface LectureCreateResponsePayload extends Payload {
    data: {
        lectureID: string,
        lectureLink: string
    }
}

interface StudentCreateRequestPayload extends Payload {
    data: {
        lectureLink: string,
        nick: string,
        name: string,
        surname: string
    }
}

interface StudentCreateResponsePayload extends Payload {
    data: {
        studentID: string,
    }
}
interface QuizRequestPayload extends Payload {
    data: {
        quizID: string,
        studentIDs: string[],
        timeSeconds: number,
        questions: any
    }
}

interface ServerQuizRequestPayload extends Payload {
    data: {
        quizID: string,
        timeSeconds: number,
        questions: any
    }
}

interface QuizResponsePayload extends Payload {
    data: {
        quizID: string,
        answers: any
    }
}

interface ServerQuizResponsePayload extends Payload {
    data: {
        quizID: string,
        studentID: string,
        answers: any
    }
}

interface QuizEndedPayload extends Payload {
    data: {
        quizID: string,
        reason: string
    }
}

interface ReactionRequestPayload extends Payload {
    data: {
        reaction: string
    }
}

interface ReactionResponsePayload extends Payload {
    data: {
        reaction: string,
        studentID: string
    }
}

interface StudentReconnectRequestPayload extends Payload {
    data: {
        lectureLink: string,
        studentID: string
    }
}

interface LectureReconnectRequestPayload extends Payload {
    data: {
        lectureID: string,
    }
}

interface CheckLinkPayload extends Payload {
    data: {
        lectureLink: string
    }
}

interface StudentDeletedPayload extends Payload {
    data: {
        studentID: string
    }
}

interface StudentAddedPayload extends Payload {
    data: {
        studentID: string,
        nick: string,
        name: string,
        surname: string
    }
}

interface StudentData {
    studentID: string,
    nick: string,
    name: string,
    surname: string
}
interface GetStudentListResponsePayload extends Payload {
    data: {
        studentList: StudentData[]
    }
}
interface ShowAnswersPayload extends Payload{
    data:{
        quizID: string
    }
}

interface ShowAnswersToStudentPayload extends Payload{
    data:{
        quizID: string,
        correctAnswers: any,
        studentAnswers: any
    }
}
interface SendQuestionRequestPayload extends Payload{
    data:{
        text: string
    }
}

interface SendQuestionResponsePayload extends Payload{
    data:{
        text: string,
        studentID: string
    }
}
