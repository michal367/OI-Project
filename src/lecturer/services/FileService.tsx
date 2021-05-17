import { saveAs } from 'file-saver';


const exportQuestions = (questionList: Question[], fileName: string = "questions.json") => {
    exportToJsonFile(questionList, fileName);
}

const exportToJsonFile = (object: Object, fileName: string = "object.lazare.json") => {
    var blob = new Blob([JSON.stringify(object, null, "\t")], { type: "text/plain;charset=utf-8" })
    saveAs(blob, fileName);
}

export { exportQuestions, exportToJsonFile };