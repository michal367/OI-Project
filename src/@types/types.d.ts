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
    id: string;
    index?: number;
    title: string;
    imageSrc?: string;
    text: string;
    options?: Answer[];
}

interface FrontQuiz {
    id: string;
    title: string;
    questions: Question[];
}
interface MatchParams {
    session: string;
}

interface StudentQuestion{
    studentNick: string,
    time: Date;
    text: string;
    processed: boolean;
}
interface ScheduledQuiz {
    id: string;
    quiz?: FrontQuiz;
    studentIDs: string[];
    timeSeconds?: number;
    questionStats: QuestionStat[];
    alreadyShowedResults: boolean;
    inProgress?: boolean;
    timeToEnd?: number;
}

interface AnswerStat {
    index: number;
    numberOfTimesSelected: number;
    textAnswers?: string;
}

interface QuestionStat{
    index: number;
    options: AnswerStat[];
}

interface QuizStat{
    title : string;
    questions: QuestionStat[];
}

interface Statistic{
    quizzes: QuizStat[];
}

type TimestampType = 
    "QuestionType" |
    "LogType" |
    "QuizType" |
    "ReactionType";


interface Timestamp{
    type: TimestampType,
    message: string,
    minutes: string,
    hours: string,
    owner: string,
}
