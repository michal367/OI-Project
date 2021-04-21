declare module 'payloads' {
    interface LectureSubPayload {
        event: string,
        data: {
            lecture_id: string
        }
    }

    interface StudentSubPayload {
        event: string,
        data: {
            student_id: string,
            lecture_link: string
        }
    }

    interface QuizRequestPayload {
        event: string,
        data: {
            lecture_id: string,
            student_ids: string[],
            questions: any
        }
    }

    interface QuizResponsePayload {
        event: string,
        data: {
            lecture_link: string,
            student_id: string,
            answers: any
        }
    }

    export {
        LectureSubPayload,
        StudentSubPayload,
        QuizRequestPayload,
        QuizResponsePayload
    };
}