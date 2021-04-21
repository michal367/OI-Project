declare module 'payloads' {

    interface Payload {
        event: string
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
            questions: any
        }
    }

    interface ServerQuizSendToPayload extends Payload{
        data: {
            student_ids: string[],
        }
    }

    interface ServerQuizRequestPayload extends Payload {
        data: {
            questions: any
        }
    }

    interface QuizResponsePayload extends Payload {
        data: {
            answers: any
        }
    }

    interface ServerQuizResponsePayload extends Payload {
        data: {
            student_id: string,
            answers: any
        }
    }

    export {
        Payload,
        LectureSubPayload,
        StudentSubPayload,
        QuizRequestPayload,
        QuizResponsePayload,
        ServerQuizRequestPayload, 
        ServerQuizResponsePayload,
        ServerQuizSendToPayload
    };
}