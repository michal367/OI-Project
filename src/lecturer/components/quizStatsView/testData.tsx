export function testData() {
    return {
        quizes: [
        {
            title: "Quiz 1",
            questions: [
                {
                    title: "pierwsze pytanie",
                    text: 'What is the capital of France?',
                    options: [
                        { index: 0, text: 'New York', isCorrect: false,  selected: 10},
                        { index: 1, text: 'London', isCorrect: false,  selected: 20},
                        { index: 2, text: 'Paris', isCorrect: true, selected:  40},
                        { index: 3, text: 'Dublin', isCorrect: false, selected: 70 },
                    ],
                },
                {
                    title: "drugie pytanie",
                    text: 'Who is CEO of Tesla?',
                    options: [
                        { index: 0, text: 'Jeff Bezos', isCorrect: false, selected: 10 },
                        { index: 1, text: 'Elon Musk', isCorrect: true, selected: 10 },
                        { index: 2,  text: 'Bill Gates', isCorrect: false, selected: 10 },
                        { index: 3, text: 'Tony Stark', isCorrect: false, selected: 10 },
                    ],
                },
            ],
        },
        {
            title: "Quiz 2",
            questions: [
                {
                    title: "pierwsze pytanie",
                    text: 'What is the capital of Poland?',
                    options: [
                        { index: 0, text: 'Cracow', isCorrect: false, selected: 10 },
                        { index: 1, text: 'Warsaw', isCorrect: false, selected: 10 },
                        { index: 2, text: 'Paris', isCorrect: true, selected: 10 },
                        { index: 3, text: 'London', isCorrect: false, selected: 10 },
                    ],
                },
                {
                    title: "drugie pyt",
                    text: 'Who is not CEO of Comarch?',
                    options: [
                        { index: 0, text: 'Janusz Filipiak', isCorrect: false, selected: 10 },
                        { index: 1, text: 'Piotr Nowak', isCorrect: true, selected: 10 },
                        { index: 2,  text: 'Bill Gates', isCorrect: false, selected: 10 },
                        { index: 3, text: 'Tomasz Karolak', isCorrect: false, selected: 10 },
                    ],
                },
                
            ],
        },
        ]
    }
    };