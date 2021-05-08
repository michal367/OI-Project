declare module 'payloads' {
    interface Payload {
        event: string
    }

    interface LectureCreateRequestPayload extends Payload {
        data: {
            lecturer: string
        }
    }
    interface LectureCreateResponsePayload extends Payload {
        data: {
            lecture_id: string,
            lecture_link: string
        }
    }

    interface StudentCreateRequestPayload extends Payload {
        data: {
            lecture_link: string,
            nick: string,
            name: string,
            surname: string
        }
    }

    interface StudentCreateResponsePayload extends Payload {
        data: {
            student_id: string,
        }
    }
    interface QuizRequestPayload extends Payload {
        data: {
            quiz_id: string,
            student_ids: string[],
            time_seconds: number,
            questions: any
        }
    }

    interface ServerQuizRequestPayload extends Payload {
        data: {
            quiz_id: string,
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

    interface StudentReconnectRequestPayload extends Payload{
        data: {
            lecture_link: string,
            student_id: string
        }        
    }

    interface LectureReconnectRequestPayload extends Payload{
        data: {
            lecture_id: string,
        }        
    }
}
