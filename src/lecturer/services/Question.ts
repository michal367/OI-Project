export default class Question{
    text: string;
    options: string[];
    correctAnswers: number[];

    constructor(text: string, options: string[], correctAnswer:number[]){
        this.text = text;
        this.options = options;
        this.correctAnswers = correctAnswer;
    }
}