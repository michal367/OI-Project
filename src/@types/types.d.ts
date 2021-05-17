interface Lecture {
    id: string;
}

interface Student {
    id: string;
    name: string;
    surname: string;
    nick: string;
}

interface Answer {
    index: number;
    text: string;
    isCorrect: boolean;
}
interface Question {
    index?: number;
    title: string;
    imageSrc?: string;
    text: string;
    options?: Answer[];
}

interface FrontQuiz {
    title: string;
    questions: Question[];
}
interface MatchParams {
    session: string;
}

interface StudentQuestion{
    studentNick: string,
    hours: string,
    minutes: string,
    text: string;
}
interface ScheduledQuiz {
    quiz?: FrontQuiz;
    students: string[];
    timeInSec?: number;
    questionStats: QuestionStat[];
    alreadyShowedResults: boolean;
}

interface AnswerStat {
    index: number;
    numberOfTimesSelected: number;
}

interface QuestionStat{
    index: number;
    options: AnswerStat[];
}
