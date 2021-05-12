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

interface FrontQuiz {
    title: string;
    questions: Question[];
}
