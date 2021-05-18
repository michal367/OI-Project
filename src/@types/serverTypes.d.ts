
interface Payload {
    event: string,
    data?:any
}

interface LectureSubPayload extends Payload {
    data: {
        lecture_id: string
    }
}

interface StudentSubPayload extends Payload {
    data: {
        student_id: string,
        lecture_link: string
    }
}

interface QuizRequestPayload extends Payload {
    data: {
        student_ids: string[],
        time_seconds: number,
        questions: any
    }
}

interface ServerQuizRequestPayload extends Payload {
    data: {
        quiz_id: string,
        timeSeconds: number,
        questions: any
    }
}

interface QuizResponsePayload extends Payload {
    data: {
        quiz_id: string,
        answers: any
    }
}

interface ServerQuizResponsePayload extends Payload {
    data: {
        quiz_id: string,
        student_id: string,
        answers: any
    }
}

interface QuizEndedPayload extends Payload {
    data: {
        quiz_id: string,
        reason: string
    }
}

interface ReactionRequestPayload extends Payload{
    data:{
        reaction: string
    }
}

interface ReactionResponsePayload extends Payload{
    data: {
        reaction: string,
        student_id: string
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