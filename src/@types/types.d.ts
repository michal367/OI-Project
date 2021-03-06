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
    title: string;
    text: string;
    options?: Answer[];
}

interface Quiz {
    title: string;
    questions: Question[];
}
interface MatchParams {
    session: string;
}

interface ScheduledQuiz {
    quiz?: Quiz;
    students: Students[];
    timeInMin?: number;
    canShowResults: boolean;
}

interface StudentQuestion{
    studentNick: string,
    hours: string,
    minutes: string,
    text: string;
}

interface AnswerStat{
    index: number;
    text: string;
    isCorrect: boolean;
    selected: number;
}

interface QuestionStat{
    title: string;
    text: string;
    options: AnswerStat[];
}

interface QuizStat{
    title : string;
    questions: QuestionStat[];
}

interface Statistic{
    quizes: QuizStat[];
}