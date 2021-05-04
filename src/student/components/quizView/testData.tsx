export function testData() {
    return {
        title: "test",
        questions: [
            {
                title: "pierwsze pytanie",
                text: 'What is the capital of France?',
                options: [
                    { index: 0, text: 'New York', isCorrect: false },
                    { index: 1, text: 'London', isCorrect: false },
                    { index: 2, text: 'Paris', isCorrect: true },
                    { index: 3, text: 'Dublin', isCorrect: false },
                ],
            },
            {
                title: "drugie pytanie",
                text: 'Who is CEO of Tesla?',
                options: [
                    { index: 0, text: 'Jeff Bezos', isCorrect: false },
                    { index: 0, text: 'Elon Musk', isCorrect: true },
                    { index: 0,  text: 'Bill Gates', isCorrect: false },
                    { index: 0, text: 'Tony Stark', isCorrect: false },
                ],
            },
            {
                title: "trzecie pytanie",
                text: 'The iPhone was created by which company?',
            },
        ],
    };
}