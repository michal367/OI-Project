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
    iscorrect: boolean;
}
interface Question {
    title: string;
    text: string;
    options: Answer[];
}