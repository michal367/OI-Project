import { saveAs } from 'file-saver';


const exportQuestions = (questionList: Question[], fileName: string = "questions.json") => {  
    var blob = new Blob([JSON.stringify(questionList, null, "\t")], {type: "text/plain;charset=utf-8"})
    saveAs(blob, fileName);
}

export { exportQuestions };