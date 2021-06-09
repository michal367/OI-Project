export function isQuestionCorrect(question: Question, storeQuestions: Question[], result: Question[]) {
    if (typeof question.title != "string" || question.title === "" || typeof question.text != "string" || question.text === "")
        return false;

    if (question.options != undefined) {
        for (const option of question.options) {
            if (typeof option.index != 'number' || typeof option.text != 'string' || option.text === "" || typeof option.isCorrect != 'boolean') {
                return false;
            }
        }
    }

    for (const item of storeQuestions) {
        if (item.title === question.title)
            return false
    }
    for (const item of result) {
        if (item.title === question.title)
            return false;
    }

    return true;
}

export function isQuizCorrect(quiz: FrontQuiz, storeQuizzes: FrontQuiz[], result: FrontQuiz[]) {
    if (typeof quiz.title != "string" || quiz.title === "" || !(quiz.questions instanceof Array))
        return false;

    if (quiz.questions.length == 0)
        return false;

    for (const item of storeQuizzes) {
        if (item.title === quiz.title)
            return false;
    }
    for (const item of result) {
        if (item.title === quiz.title)
            return false;
    }

    let correctQuestions: Question[] = [];
    for (const quest of quiz.questions) {
        if (isQuestionCorrect(quest, [], correctQuestions)) {
            correctQuestions.push(quest);
        }
        else {
            return false;
        }
    }
    
    return true;
}