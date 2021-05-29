import { IStore } from "../../lecturer/services/StoreService";

const studentListMock: Student[] = [
    {
        id: "1c8541f6-4151-48d7-854f-d562b1e0e7eb",
        name: "Link",
        surname: "Weakley",
        nick: "lweakley0",
    },
    {
        id: "74b57fd2-f0b2-4633-94c5-0cdbda70de5c",
        name: "Kristan",
        surname: "Durtnell",
        nick: "kdurtnell1",
    },
    {
        id: "eb9f0963-615f-4420-a18a-0be45cc7b8a5",
        name: "Simeon",
        surname: "Rapo",
        nick: "srapo2",
    },
    {
        id: "db5f1186-42ae-447e-b08a-4856a27dee26",
        name: "Stan",
        surname: "Tebbs",
        nick: "stebbs3",
    },
    {
        id: "486ddcf9-9a2b-41bd-bf9e-0a6c7126e517",
        name: "Cosetta",
        surname: "Predohl",
        nick: "cpredohl4",
    },
    {
        id: "de707243-46ee-4f6d-bc81-4cba8b1e9c68",
        name: "Diana",
        surname: "Sylvester",
        nick: "dsylvester5",
    },
    {
        id: "cfe818c1-52ae-439a-a40a-9505cff5d0fe",
        name: "Edee",
        surname: "Hubbold",
        nick: "ehubbold6",
    },
    {
        id: "ecce0265-b77b-4c41-923a-bc8288ede151",
        name: "Wally",
        surname: "Griffe",
        nick: "wgriffe7",
    },
    {
        id: "531a6a3d-7535-4cab-bf8c-8a133ca678a2",
        name: "Deloria",
        surname: "Elia",
        nick: "delia8",
    },
    {
        id: "1697aa78-6525-4f77-8c8b-1a162a0036f7",
        name: "Maryanna",
        surname: "Orneblow",
        nick: "morneblow9",
    },
    {
        id: "b174ba1e-e804-426a-a11d-78e15cd3e6f9",
        name: "Beale",
        surname: "Clemintoni",
        nick: "bclemintonia",
    },
    {
        id: "2dca2b76-6e00-4787-af22-1fdb52bd63ff",
        name: "Zia",
        surname: "Gillimgham",
        nick: "zgillimghamb",
    },
    {
        id: "7e40b26a-a912-4767-85fa-0d3691d3403b",
        name: "Alfie",
        surname: "Wurst",
        nick: "awurstc",
    },
    {
        id: "0411a01c-eaf4-46d0-820c-44fdbd2112b1",
        name: "Linus",
        surname: "Moroney",
        nick: "lmoroneyd",
    },
    {
        id: "3f7995ed-0bbb-4d07-bd25-d36fc6d0f04c",
        name: "Cheslie",
        surname: "Howes",
        nick: "chowese",
    },
    {
        id: "29e6d8dc-602a-4fdb-be56-5227c3ca0145",
        name: "Gasparo",
        surname: "Simonite",
        nick: "gsimonitef",
    },
    {
        id: "174ae9a9-4f46-4f84-8eb5-3e9ddb567dbe",
        name: "Orion",
        surname: "Parcell",
        nick: "oparcellg",
    },
    {
        id: "a306a4c2-b416-4de7-bc42-5c9d1b288c2b",
        name: "Brynne",
        surname: "Aizikovitch",
        nick: "baizikovitchh",
    },
    {
        id: "e2af4d83-4410-4844-892c-37d539c13748",
        name: "Augustine",
        surname: "Budden",
        nick: "abuddeni",
    },
    {
        id: "28fddd3d-cbe0-4dab-93bb-b93d6cd6ece7",
        name: "Yettie",
        surname: "Halgarth",
        nick: "yhalgarthj",
    },
];

const questionListMock: Question[] = [
    {
        title: "Lynch Street",
        text:
            "Officia aute cillum ipsum consectetur magna quis aliqua proident ea ipsum.",
        options: [
            {
                index: 0,
                text: "laboris",
                isCorrect: false,
            },
            {
                index: 1,
                text: "quis",
                isCorrect: true,
            },
            {
                index: 2,
                text: "sunt",
                isCorrect: false,
            },
            {
                index: 3,
                text: "pariatur",
                isCorrect: true,
            },
        ],
    },
    {
        title: "Classon Avenue",
        text:
            "Est laboris culpa duis pariatur magna sint aliquip duis qui aliqua.",
        options: [
            {
                index: 0,
                text: "pariatur",
                isCorrect: false,
            },
            {
                index: 1,
                text: "veniam",
                isCorrect: true,
            },
            {
                index: 2,
                text: "et",
                isCorrect: true,
            },
        ],
    },
    {
        title: "Nova Court",
        text:
            "Deserunt officia do sint reprehenderit do consectetur cupidatat est officia quis et ea adipisicing.",
        options: [
            {
                index: 0,
                text: "sit",
                isCorrect: true,
            },
            {
                index: 1,
                text: "elit",
                isCorrect: false,
            },
            {
                index: 2,
                text: "sit",
                isCorrect: true,
            },
            {
                index: 3,
                text: "deserunt",
                isCorrect: true,
            },
            {
                index: 4,
                text: "magna",
                isCorrect: false,
            },
        ],
    },
    {
        title: "Prince Street",
        text:
            "Laborum nisi eu sint mollit dolore duis amet et adipisicing commodo.",
        options: [
            {
                index: 0,
                text: "est",
                isCorrect: true,
            },
            {
                index: 1,
                text: "sit",
                isCorrect: false,
            },
            {
                index: 2,
                text: "quis",
                isCorrect: true,
            },
        ],
    },
    {
        title: "Box Street",
        text:
            "Sint fugiat exercitation aliqua incididunt eu sint aliqua incididunt non voluptate ipsum ut labore.",
        options: [
            {
                index: 0,
                text: "excepteur",
                isCorrect: true,
            },
            {
                index: 1,
                text: "aliqua",
                isCorrect: false,
            },
            {
                index: 2,
                text: "id",
                isCorrect: true,
            },
            {
                index: 3,
                text: "dolore",
                isCorrect: false,
            },
            {
                index: 4,
                text: "aliquip",
                isCorrect: false,
            },
        ],
    },
    {
        title: "Locust Avenue",
        text: "Occaecat do aute ullamco deserunt pariatur aute Lorem Lorem.",
        options: [
            {
                index: 0,
                text: "esse",
                isCorrect: false,
            },
            {
                index: 1,
                text: "nisi",
                isCorrect: true,
            },
            {
                index: 2,
                text: "nisi",
                isCorrect: false,
            },
        ],
    },
    {
        title: "Hull Street",
        text:
            "Irure pariatur adipisicing enim fugiat Lorem enim eiusmod laboris sit pariatur incididunt aute.",
        options: [
            {
                index: 0,
                text: "excepteur",
                isCorrect: true,
            },
            {
                index: 1,
                text: "elit",
                isCorrect: false,
            },
            {
                index: 2,
                text: "labore",
                isCorrect: false,
            },
            {
                index: 3,
                text: "fugiat",
                isCorrect: true,
            },
        ],
    },
    {
        title: "Lefferts Avenue",
        text: "Est laborum ut et dolor in cupidatat ullamco.",
        options: [
            {
                index: 0,
                text: "cillum",
                isCorrect: true,
            },
            {
                index: 1,
                text: "dolor",
                isCorrect: false,
            },
        ],
    },
    {
        title: "Desmond Court",
        text:
            "Esse cupidatat nostrud do velit enim incididunt laboris Lorem aute ipsum commodo esse magna aliqua.",
        options: [
            {
                index: 0,
                text: "aliqua",
                isCorrect: true,
            },
            {
                index: 1,
                text: "consequat",
                isCorrect: false,
            },
        ],
    },
    {
        title: "Agate Court",
        text: "Nostrud pariatur aliqua proident ullamco aliquip sint.",
        options: [
            {
                index: 0,
                text: "excepteur",
                isCorrect: false,
            },
            {
                index: 1,
                text: "adipisicing",
                isCorrect: true,
            },
        ],
    },
    {
        title: "Fleet Walk",
        text:
            "Ea elit reprehenderit do est est adipisicing tempor sint occaecat.",
        options: [
            {
                index: 0,
                text: "fugiat",
                isCorrect: false,
            },
            {
                index: 1,
                text: "dolor",
                isCorrect: true,
            },
            {
                index: 2,
                text: "elit",
                isCorrect: true,
            },
            {
                index: 3,
                text: "irure",
                isCorrect: false,
            },
            {
                index: 4,
                text: "est",
                isCorrect: true,
            },
        ],
    },
    {
        title: "Driggs Avenue",
        text: "Sit pariatur nulla reprehenderit mollit magna.",
        options: [
            {
                index: 0,
                text: "culpa",
                isCorrect: false,
            },
            {
                index: 1,
                text: "eiusmod",
                isCorrect: false,
            },
        ],
    },
    {
        title: "Berkeley Place",
        text: "Laboris non tempor minim incididunt irure laboris non.",
        options: [
            {
                index: 0,
                text: "reprehenderit",
                isCorrect: true,
            },
            {
                index: 1,
                text: "enim",
                isCorrect: false,
            },
            {
                index: 2,
                text: "non",
                isCorrect: false,
            },
        ],
    },
    {
        title: "Gerry Street",
        text: "In laboris ex incididunt duis.",
        options: [
            {
                index: 0,
                text: "minim",
                isCorrect: false,
            },
            {
                index: 1,
                text: "voluptate",
                isCorrect: false,
            },
            {
                index: 2,
                text: "mollit",
                isCorrect: true,
            },
            {
                index: 3,
                text: "nulla",
                isCorrect: false,
            },
            {
                index: 4,
                text: "nisi",
                isCorrect: false,
            },
        ],
    },
    {
        title: "Kensington Street",
        text:
            "Commodo anim quis ipsum culpa excepteur Lorem enim ex irure esse eiusmod nostrud esse nisi.",
        options: [
            {
                index: 0,
                text: "in",
                isCorrect: true,
            },
            {
                index: 1,
                text: "deserunt",
                isCorrect: false,
            },
        ],
    },
    {
        title: "Bergen Court",
        text: "Incididunt officia exercitation incididunt ea.",
        options: [
            {
                index: 0,
                text: "labore",
                isCorrect: true,
            },
            {
                index: 1,
                text: "adipisicing",
                isCorrect: false,
            },
            {
                index: 2,
                text: "occaecat",
                isCorrect: true,
            },
        ],
    },
    {
        title: "Ocean Court",
        text:
            "Officia officia irure non officia cillum id eiusmod officia consequat.",
        options: [
            {
                index: 0,
                text: "ex",
                isCorrect: true,
            },
            {
                index: 1,
                text: "eu",
                isCorrect: false,
            },
            {
                index: 2,
                text: "id",
                isCorrect: true,
            },
            {
                index: 3,
                text: "mollit",
                isCorrect: true,
            },
            {
                index: 4,
                text: "nulla",
                isCorrect: false,
            },
        ],
    },
    {
        title: "Evergreen Avenue",
        text: "Eiusmod deserunt in nostrud ipsum labore cillum aute.",
        options: [
            {
                index: 0,
                text: "laboris",
                isCorrect: false,
            },
            {
                index: 1,
                text: "nostrud",
                isCorrect: true,
            },
            {
                index: 2,
                text: "velit",
                isCorrect: true,
            },
            {
                index: 3,
                text: "culpa",
                isCorrect: false,
            },
            {
                index: 4,
                text: "do",
                isCorrect: true,
            },
        ],
    },
    {
        title: "Beard Street",
        text:
            "Et aliqua eu occaecat sit veniam labore irure minim sint fugiat et adipisicing ex aliquip.",
        options: [
            {
                index: 0,
                text: "consequat",
                isCorrect: true,
            },
            {
                index: 1,
                text: "reprehenderit",
                isCorrect: false,
            },
            {
                index: 2,
                text: "cupidatat",
                isCorrect: true,
            },
            {
                index: 3,
                text: "duis",
                isCorrect: false,
            },
        ],
    },
    {
        title: "Pierrepont Place",
        text: "Do eiusmod esse laboris duis esse magna quis duis ullamco.",
        options: [
            {
                index: 0,
                text: "fugiat",
                isCorrect: false,
            },
            {
                index: 1,
                text: "cupidatat",
                isCorrect: false,
            },
            {
                index: 2,
                text: "voluptate",
                isCorrect: true,
            },
            {
                index: 3,
                text: "non",
                isCorrect: true,
            },
            {
                index: 4,
                text: "elit",
                isCorrect: false,
            },
        ],
    },
];

const timestampMock: Timestamp[] = [
    {
        type: "QuestionType",
        message: "Zadał pytanie",
        hours: "09",
        minutes: "30",
        owner: "PŚwiderski",
    },
    {
        type: "LogType",
        message: "Dołączył",
        hours: "09",
        minutes: "30",
        owner: "PŚwiderski",
    },
    {
        type: "QuizType",
        message: "Zakończył quiz",
        hours: "09",
        minutes: "30",
        owner: "PŚwiderski",
    },
    {
        type: "QuizType",
        message: "Zakończył quiz",
        hours: "09",
        minutes: "30",
        owner: "PŚwiderski",
    },
    {
        type: "QuizType",
        message: "Zakończył quiz",
        hours: "09",
        minutes: "30",
        owner: "PŚwiderski",
    },
    {
        type: "QuizType",
        message: "Zakończył quiz",
        hours: "09",
        minutes: "37",
        owner: "PŚwiderski",
    },
    {
        type: "QuizType",
        message: "Zakończył quiz",
        hours: "09",
        minutes: "37",
        owner: "PŚwiderski",
    },
    {
        type: "QuizType",
        message: "Zakończył quiz",
        hours: "09",
        minutes: "37",
        owner: "PŚwiderski",
    },
    {
        type: "QuizType",
        message: "Zakończył quiz",
        hours: "09",
        minutes: "37",
        owner: "PŚwiderski",
    },
    {
        type: "QuizType",
        message: "Zakończył quiz",
        hours: "09",
        minutes: "37",
        owner: "PŚwiderski",
    },
    {
        type: "ReactionType",
        message: "Zareagował",
        hours: "09",
        minutes: "30",
        owner: "PŚwiderski",
    }
];

const scheduledQuizzesMock: ScheduledQuiz[] = [
    {
        "quiz": {
            "title": "Linwood",
            "questions": [
                {
                    "index": 0,
                    "title": "velit officia cupidatat esse",
                    "text": "Qui duis duis sit duis. Laboris consectetur esse esse occaecat voluptate tempor cillum sit id sit ad veniam elit aliquip. Laboris dolor cupidatat sint nulla.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Est sint in nostrud laborum ea anim adipisicing velit laborum anim.",
                            "isCorrect": false
                        },
                        {
                            "index": 1,
                            "text": "Consequat commodo aliqua laborum tempor.",
                            "isCorrect": false
                        },
                        {
                            "index": 2,
                            "text": "Consequat sit mollit commodo anim est.",
                            "isCorrect": true
                        },
                        {
                            "index": 3,
                            "text": "Sunt eu labore nulla consequat id nulla laboris.",
                            "isCorrect": true
                        },
                        {
                            "index": 4,
                            "text": "Exercitation nostrud voluptate nulla labore ea esse ipsum in Lorem exercitation culpa nostrud consequat.",
                            "isCorrect": true
                        },
                        {
                            "index": 5,
                            "text": "Consequat ullamco excepteur pariatur velit elit qui eiusmod.",
                            "isCorrect": true
                        },
                        {
                            "index": 6,
                            "text": "Ut esse cupidatat est ea.",
                            "isCorrect": false
                        },
                        {
                            "index": 7,
                            "text": "Labore veniam ullamco et nostrud duis duis proident aliqua do ex minim sint.",
                            "isCorrect": false
                        },
                        {
                            "index": 8,
                            "text": "Adipisicing aute commodo culpa velit pariatur magna anim.",
                            "isCorrect": true
                        }
                    ]
                },
                {
                    "index": 1,
                    "title": "aliquip id sint culpa",
                    "text": "Elit ex est dolore eu culpa qui. Deserunt Lorem elit nulla et id dolor labore eiusmod. Proident enim mollit nisi ipsum eu qui tempor labore consectetur commodo.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Excepteur est veniam amet deserunt sint nulla.",
                            "isCorrect": false
                        },
                        {
                            "index": 1,
                            "text": "Dolore incididunt quis do cillum voluptate proident esse proident exercitation elit mollit consequat dolore.",
                            "isCorrect": false
                        },
                        {
                            "index": 2,
                            "text": "Amet fugiat velit aliquip consequat velit aliqua.",
                            "isCorrect": true
                        },
                        {
                            "index": 3,
                            "text": "Non cillum id sit proident qui magna veniam voluptate elit.",
                            "isCorrect": true
                        },
                        {
                            "index": 4,
                            "text": "Quis ullamco ex quis officia pariatur ex nostrud sunt ex occaecat dolor.",
                            "isCorrect": false
                        },
                        {
                            "index": 5,
                            "text": "Cillum incididunt non anim minim in voluptate voluptate exercitation proident id qui id nostrud reprehenderit.",
                            "isCorrect": true
                        },
                        {
                            "index": 6,
                            "text": "Magna quis non duis est anim ad id consectetur officia pariatur.",
                            "isCorrect": false
                        },
                        {
                            "index": 7,
                            "text": "Nisi aute consectetur adipisicing reprehenderit aute.",
                            "isCorrect": true
                        },
                        {
                            "index": 8,
                            "text": "Ut minim proident duis et adipisicing culpa pariatur commodo proident adipisicing nostrud proident cupidatat sit.",
                            "isCorrect": true
                        }
                    ]
                },
                {
                    "index": 2,
                    "title": "enim laboris ullamco quis",
                    "text": "Aliquip duis do amet ipsum fugiat deserunt enim. Proident voluptate incididunt aute veniam elit nisi commodo id nostrud exercitation Lorem in. Esse et id velit velit qui laborum in.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Occaecat laborum qui do id esse voluptate duis duis.",
                            "isCorrect": false
                        },
                        {
                            "index": 1,
                            "text": "Pariatur amet sint reprehenderit nisi amet cupidatat amet minim Lorem voluptate exercitation anim pariatur non.",
                            "isCorrect": false
                        },
                        {
                            "index": 2,
                            "text": "Lorem ullamco ea enim enim enim officia consectetur tempor.",
                            "isCorrect": false
                        },
                        {
                            "index": 3,
                            "text": "Labore eiusmod ea ad aliqua.",
                            "isCorrect": false
                        },
                        {
                            "index": 4,
                            "text": "Do dolore occaecat occaecat aliqua aute cillum.",
                            "isCorrect": true
                        },
                        {
                            "index": 5,
                            "text": "Dolore proident aute occaecat laboris.",
                            "isCorrect": true
                        },
                        {
                            "index": 6,
                            "text": "Fugiat ipsum qui ad duis amet sit ea occaecat proident nisi do excepteur consequat amet.",
                            "isCorrect": false
                        },
                        {
                            "index": 7,
                            "text": "Anim in ipsum sint nostrud consequat incididunt cupidatat non deserunt pariatur.",
                            "isCorrect": true
                        },
                        {
                            "index": 8,
                            "text": "Minim officia dolor sint magna minim qui fugiat.",
                            "isCorrect": false
                        }
                    ]
                },
                {
                    "index": 3,
                    "title": "dolor esse laboris do",
                    "text": "Duis enim dolore ipsum ad ea do id laborum. Mollit proident cupidatat do velit sunt nulla cillum cupidatat adipisicing pariatur. Nisi veniam irure nostrud dolor anim exercitation aute ullamco adipisicing culpa sint dolore.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Nostrud duis ut incididunt aliquip incididunt ullamco et aute nulla mollit consequat id enim quis.",
                            "isCorrect": true
                        },
                        {
                            "index": 1,
                            "text": "Eiusmod do pariatur voluptate sunt anim sint veniam in.",
                            "isCorrect": true
                        },
                        {
                            "index": 2,
                            "text": "Magna enim et magna minim consequat elit eiusmod dolor.",
                            "isCorrect": true
                        },
                        {
                            "index": 3,
                            "text": "Magna minim mollit velit exercitation non amet ex esse aliquip incididunt elit irure nisi eu.",
                            "isCorrect": true
                        },
                        {
                            "index": 4,
                            "text": "Eu tempor Lorem qui exercitation enim veniam enim sint ad quis esse incididunt ad esse.",
                            "isCorrect": true
                        },
                        {
                            "index": 5,
                            "text": "Fugiat occaecat amet qui in dolore est.",
                            "isCorrect": true
                        },
                        {
                            "index": 6,
                            "text": "Laboris nostrud tempor proident cillum ad duis laborum.",
                            "isCorrect": true
                        },
                        {
                            "index": 7,
                            "text": "Lorem mollit dolor exercitation qui aliqua.",
                            "isCorrect": true
                        },
                        {
                            "index": 8,
                            "text": "Amet duis deserunt cupidatat elit occaecat dolore veniam nisi.",
                            "isCorrect": true
                        }
                    ]
                },
                {
                    "index": 4,
                    "title": "cupidatat incididunt irure nulla",
                    "text": "Proident ex eu eu voluptate deserunt commodo cillum nulla cupidatat. Excepteur est aute aliquip eu magna ea esse proident ex aliqua ad consequat. Ex nostrud eiusmod nulla culpa aliqua fugiat quis id ullamco quis.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Proident nisi sunt nostrud elit aliquip aute non pariatur labore et nisi cupidatat.",
                            "isCorrect": true
                        },
                        {
                            "index": 1,
                            "text": "Consectetur aliquip sint ea qui aliquip velit.",
                            "isCorrect": false
                        },
                        {
                            "index": 2,
                            "text": "Amet consectetur ullamco nisi proident.",
                            "isCorrect": true
                        },
                        {
                            "index": 3,
                            "text": "Pariatur Lorem excepteur non voluptate occaecat aliqua in.",
                            "isCorrect": true
                        },
                        {
                            "index": 4,
                            "text": "Ad sit do est enim culpa aliqua et nisi do.",
                            "isCorrect": true
                        },
                        {
                            "index": 5,
                            "text": "Elit sit adipisicing Lorem labore.",
                            "isCorrect": true
                        },
                        {
                            "index": 6,
                            "text": "Pariatur in eu eu proident aute deserunt non amet culpa consectetur commodo tempor dolore.",
                            "isCorrect": false
                        },
                        {
                            "index": 7,
                            "text": "Sunt ut eiusmod esse pariatur aute.",
                            "isCorrect": false
                        },
                        {
                            "index": 8,
                            "text": "Consectetur minim ullamco ex eu Lorem laboris irure enim labore sunt nostrud aliquip do.",
                            "isCorrect": false
                        }
                    ]
                }
            ]
        },
        "students": [],
        "questionStats": [
            {
                "index": 0,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 155
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 290
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 21
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 203
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 194
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 106
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 101
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 290
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 220
                    }
                ]
            },
            {
                "index": 1,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 49
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 94
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 212
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 82
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 94
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 259
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 47
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 67
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 20
                    }
                ]
            },
            {
                "index": 2,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 226
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 83
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 64
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 2
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 145
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 122
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 192
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 52
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 158
                    }
                ]
            },
            {
                "index": 3,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 220
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 115
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 288
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 240
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 160
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 120
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 31
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 111
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 93
                    }
                ]
            },
            {
                "index": 4,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 155
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 287
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 115
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 163
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 31
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 210
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 3
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 164
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 281
                    }
                ]
            }
        ],
        "alreadyShowedResults": true
    },
    {
        "quiz": {
            "title": "Ripley",
            "questions": [
                {
                    "index": 0,
                    "title": "enim cillum eu ut",
                    "text": "Non consectetur laborum labore eu dolor minim cupidatat. Consequat voluptate mollit duis minim. Minim magna esse culpa ex tempor exercitation dolor et ad aliquip aute ipsum fugiat.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Occaecat duis dolore esse mollit aliquip est ad fugiat.",
                            "isCorrect": false
                        },
                        {
                            "index": 1,
                            "text": "Nulla enim laborum aliqua minim dolor sint duis reprehenderit non nisi elit.",
                            "isCorrect": true
                        },
                        {
                            "index": 2,
                            "text": "Proident tempor do laboris incididunt qui et.",
                            "isCorrect": false
                        },
                        {
                            "index": 3,
                            "text": "Ullamco excepteur sit pariatur sint ut non esse non ad amet in in.",
                            "isCorrect": false
                        },
                        {
                            "index": 4,
                            "text": "Culpa laborum veniam minim nulla proident.",
                            "isCorrect": false
                        },
                        {
                            "index": 5,
                            "text": "Voluptate consectetur mollit dolore occaecat eu.",
                            "isCorrect": true
                        },
                        {
                            "index": 6,
                            "text": "Do magna minim est culpa aliquip eu elit in reprehenderit.",
                            "isCorrect": false
                        },
                        {
                            "index": 7,
                            "text": "Nostrud ut in pariatur elit pariatur sit id id ut.",
                            "isCorrect": true
                        },
                        {
                            "index": 8,
                            "text": "Mollit ullamco sint consectetur irure amet excepteur ad ex.",
                            "isCorrect": true
                        }
                    ]
                },
                {
                    "index": 1,
                    "title": "ex esse minim sint",
                    "text": "Tempor consequat sunt aliqua ea mollit veniam et nostrud commodo ex elit. Anim ullamco dolore et id sint exercitation laborum minim sunt veniam consectetur sit. Mollit voluptate voluptate irure fugiat sunt mollit amet labore et Lorem.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Ex esse laboris irure cupidatat deserunt consectetur qui.",
                            "isCorrect": false
                        },
                        {
                            "index": 1,
                            "text": "Dolore cillum consequat qui elit magna elit sint.",
                            "isCorrect": false
                        },
                        {
                            "index": 2,
                            "text": "Lorem sint ut quis reprehenderit Lorem.",
                            "isCorrect": true
                        },
                        {
                            "index": 3,
                            "text": "Enim qui dolor sint duis in commodo fugiat ex.",
                            "isCorrect": false
                        },
                        {
                            "index": 4,
                            "text": "Sunt tempor veniam cillum nostrud ex.",
                            "isCorrect": false
                        },
                        {
                            "index": 5,
                            "text": "Excepteur nisi magna ex deserunt ipsum dolor tempor nisi ex occaecat exercitation magna.",
                            "isCorrect": false
                        },
                        {
                            "index": 6,
                            "text": "Nulla enim commodo deserunt et amet mollit ad Lorem ullamco.",
                            "isCorrect": true
                        },
                        {
                            "index": 7,
                            "text": "Culpa exercitation eiusmod magna ullamco excepteur est.",
                            "isCorrect": true
                        },
                        {
                            "index": 8,
                            "text": "Ad minim irure est ex pariatur.",
                            "isCorrect": false
                        }
                    ]
                },
                {
                    "index": 2,
                    "title": "veniam amet ea ullamco",
                    "text": "Deserunt voluptate adipisicing proident cupidatat et duis adipisicing irure id. Mollit pariatur veniam fugiat amet consequat reprehenderit consequat aliqua Lorem ex exercitation ex proident. Aliquip ut dolore dolore cillum consequat.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Magna cillum occaecat do minim quis sint non ipsum in elit voluptate excepteur.",
                            "isCorrect": true
                        },
                        {
                            "index": 1,
                            "text": "Nulla est proident eu veniam veniam aliqua deserunt reprehenderit ex do eu.",
                            "isCorrect": true
                        },
                        {
                            "index": 2,
                            "text": "Excepteur ad officia ullamco in sunt ut aliqua magna.",
                            "isCorrect": false
                        },
                        {
                            "index": 3,
                            "text": "Fugiat reprehenderit sit amet veniam nostrud magna id fugiat.",
                            "isCorrect": true
                        },
                        {
                            "index": 4,
                            "text": "Fugiat cupidatat id consectetur pariatur ea.",
                            "isCorrect": true
                        },
                        {
                            "index": 5,
                            "text": "Nulla nisi ipsum sint nisi elit proident pariatur fugiat mollit quis duis non nisi adipisicing.",
                            "isCorrect": true
                        },
                        {
                            "index": 6,
                            "text": "Veniam mollit occaecat ipsum non ullamco cillum id occaecat commodo officia.",
                            "isCorrect": false
                        },
                        {
                            "index": 7,
                            "text": "Consequat eiusmod deserunt amet nulla cupidatat occaecat excepteur.",
                            "isCorrect": false
                        },
                        {
                            "index": 8,
                            "text": "Et est Lorem reprehenderit in sint est aute duis do officia.",
                            "isCorrect": false
                        }
                    ]
                },
                {
                    "index": 3,
                    "title": "adipisicing ut commodo velit",
                    "text": "Irure cupidatat culpa do sunt fugiat laborum adipisicing. Amet pariatur labore aute esse dolor. Anim aliqua voluptate sit culpa.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Lorem pariatur enim irure sit.",
                            "isCorrect": false
                        },
                        {
                            "index": 1,
                            "text": "Dolore nostrud exercitation in id nulla velit eu in pariatur cillum minim laboris culpa reprehenderit.",
                            "isCorrect": false
                        },
                        {
                            "index": 2,
                            "text": "Enim cillum ex qui labore irure nulla ipsum consequat.",
                            "isCorrect": false
                        },
                        {
                            "index": 3,
                            "text": "Qui consequat Lorem labore incididunt quis laborum pariatur occaecat sint dolore reprehenderit commodo culpa ut.",
                            "isCorrect": false
                        },
                        {
                            "index": 4,
                            "text": "Nostrud eiusmod culpa duis officia mollit reprehenderit consectetur.",
                            "isCorrect": true
                        },
                        {
                            "index": 5,
                            "text": "Eiusmod veniam labore anim dolore.",
                            "isCorrect": true
                        },
                        {
                            "index": 6,
                            "text": "Laboris mollit aliqua dolore velit incididunt anim eiusmod sint incididunt.",
                            "isCorrect": true
                        },
                        {
                            "index": 7,
                            "text": "Adipisicing amet excepteur ad ad labore ea ut magna fugiat.",
                            "isCorrect": true
                        },
                        {
                            "index": 8,
                            "text": "Eu consequat officia tempor minim id laborum reprehenderit pariatur et mollit mollit reprehenderit et laboris.",
                            "isCorrect": true
                        }
                    ]
                },
                {
                    "index": 4,
                    "title": "sit pariatur deserunt deserunt",
                    "text": "Laborum deserunt cillum tempor eiusmod eiusmod cillum duis. Non anim aliqua ex pariatur anim nulla laborum tempor adipisicing cupidatat nisi. Deserunt commodo laboris minim esse deserunt amet labore ex id aute Lorem.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Lorem nulla elit magna sint magna sint in.",
                            "isCorrect": true
                        },
                        {
                            "index": 1,
                            "text": "Culpa culpa adipisicing ex cillum et.",
                            "isCorrect": false
                        },
                        {
                            "index": 2,
                            "text": "Consequat eiusmod ut cupidatat mollit pariatur irure sit dolore quis nulla officia dolor aute voluptate.",
                            "isCorrect": false
                        },
                        {
                            "index": 3,
                            "text": "Magna quis pariatur fugiat excepteur laboris ad irure nisi.",
                            "isCorrect": false
                        },
                        {
                            "index": 4,
                            "text": "Lorem aliqua aliqua reprehenderit dolor culpa adipisicing commodo excepteur velit magna Lorem ipsum qui cupidatat.",
                            "isCorrect": true
                        },
                        {
                            "index": 5,
                            "text": "Exercitation duis ut et dolor enim nulla sit tempor est excepteur qui qui officia veniam.",
                            "isCorrect": true
                        },
                        {
                            "index": 6,
                            "text": "Do sit aute veniam incididunt excepteur voluptate aliquip sint laboris proident veniam.",
                            "isCorrect": false
                        },
                        {
                            "index": 7,
                            "text": "Excepteur laborum fugiat voluptate fugiat sunt dolore deserunt nisi qui consequat aliquip ea.",
                            "isCorrect": false
                        },
                        {
                            "index": 8,
                            "text": "Ullamco nostrud pariatur est minim dolor excepteur sunt Lorem deserunt aliquip excepteur do do culpa.",
                            "isCorrect": false
                        }
                    ]
                }
            ]
        },
        "students": [],
        "questionStats": [
            {
                "index": 0,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 51
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 159
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 81
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 97
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 107
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 155
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 263
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 143
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 137
                    }
                ]
            },
            {
                "index": 1,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 286
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 73
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 1
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 154
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 233
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 81
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 46
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 250
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 232
                    }
                ]
            },
            {
                "index": 2,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 173
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 133
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 113
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 228
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 187
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 288
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 241
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 230
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 14
                    }
                ]
            },
            {
                "index": 3,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 87
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 155
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 226
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 102
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 100
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 193
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 59
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 186
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 13
                    }
                ]
            },
            {
                "index": 4,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 91
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 113
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 119
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 279
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 99
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 27
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 21
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 144
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 245
                    }
                ]
            }
        ],
        "alreadyShowedResults": true
    },
    {
        "quiz": {
            "title": "Garfield",
            "questions": [
                {
                    "index": 0,
                    "title": "occaecat incididunt id duis",
                    "text": "Amet sit sint incididunt mollit laborum Lorem laboris commodo aliquip pariatur aute. Duis laboris fugiat eiusmod nisi tempor exercitation ex culpa veniam in. Ea in culpa est ut anim consectetur culpa nulla excepteur do non minim consectetur.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Ullamco ipsum consectetur esse eu ad ullamco incididunt incididunt tempor.",
                            "isCorrect": false
                        },
                        {
                            "index": 1,
                            "text": "Proident incididunt sit velit non aliqua quis qui pariatur ea nostrud anim nisi.",
                            "isCorrect": true
                        },
                        {
                            "index": 2,
                            "text": "Sunt cupidatat aliquip ex nulla ex est fugiat.",
                            "isCorrect": false
                        },
                        {
                            "index": 3,
                            "text": "Nulla aute do adipisicing eu.",
                            "isCorrect": false
                        },
                        {
                            "index": 4,
                            "text": "Cupidatat consequat eu consectetur nisi sit nisi nostrud tempor Lorem occaecat aliquip amet deserunt.",
                            "isCorrect": false
                        },
                        {
                            "index": 5,
                            "text": "Laboris anim occaecat occaecat reprehenderit ex laboris dolore esse reprehenderit officia ex.",
                            "isCorrect": false
                        },
                        {
                            "index": 6,
                            "text": "Incididunt proident esse laborum ex.",
                            "isCorrect": false
                        },
                        {
                            "index": 7,
                            "text": "Irure proident mollit excepteur sit aute velit tempor pariatur eu.",
                            "isCorrect": true
                        },
                        {
                            "index": 8,
                            "text": "Dolor cupidatat eu eu officia aute cillum minim laborum commodo adipisicing laboris ipsum ea.",
                            "isCorrect": false
                        }
                    ]
                },
                {
                    "index": 1,
                    "title": "occaecat enim culpa id",
                    "text": "Voluptate cupidatat non excepteur ut culpa. Qui irure aute labore exercitation. Exercitation id exercitation ex nisi reprehenderit culpa proident culpa labore.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Mollit sunt reprehenderit elit sunt.",
                            "isCorrect": true
                        },
                        {
                            "index": 1,
                            "text": "Non nulla incididunt consectetur commodo.",
                            "isCorrect": false
                        },
                        {
                            "index": 2,
                            "text": "Adipisicing consequat magna voluptate labore laboris exercitation nostrud qui.",
                            "isCorrect": false
                        },
                        {
                            "index": 3,
                            "text": "Consequat labore adipisicing quis aute ea ullamco Lorem duis id sit nostrud officia.",
                            "isCorrect": false
                        },
                        {
                            "index": 4,
                            "text": "Sint qui minim dolore in nostrud ullamco ad id sit.",
                            "isCorrect": true
                        },
                        {
                            "index": 5,
                            "text": "Duis cupidatat duis et magna exercitation anim cupidatat exercitation pariatur labore et ipsum consectetur.",
                            "isCorrect": true
                        },
                        {
                            "index": 6,
                            "text": "Mollit proident ea cupidatat eu Lorem dolore et occaecat incididunt reprehenderit dolor.",
                            "isCorrect": false
                        },
                        {
                            "index": 7,
                            "text": "Ut enim occaecat Lorem est sunt.",
                            "isCorrect": true
                        },
                        {
                            "index": 8,
                            "text": "Elit do nulla nostrud elit aliquip ipsum nulla Lorem id.",
                            "isCorrect": true
                        }
                    ]
                },
                {
                    "index": 2,
                    "title": "amet dolor nisi dolor",
                    "text": "Do est laborum dolore consequat commodo laborum. Aute labore consectetur cillum pariatur mollit nulla. Aute eiusmod voluptate veniam sint cillum magna in pariatur in veniam Lorem sunt eiusmod et.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Magna officia mollit dolor in esse laboris.",
                            "isCorrect": false
                        },
                        {
                            "index": 1,
                            "text": "Esse velit esse ipsum occaecat eiusmod ullamco ex minim id ut enim nostrud adipisicing adipisicing.",
                            "isCorrect": false
                        },
                        {
                            "index": 2,
                            "text": "Laborum cillum cupidatat veniam esse ut voluptate cillum nulla labore proident consectetur.",
                            "isCorrect": false
                        },
                        {
                            "index": 3,
                            "text": "Cupidatat ea ut cillum elit commodo commodo et in irure cillum esse fugiat qui adipisicing.",
                            "isCorrect": false
                        },
                        {
                            "index": 4,
                            "text": "Lorem est fugiat laborum do officia aute magna minim aute.",
                            "isCorrect": true
                        },
                        {
                            "index": 5,
                            "text": "Labore ullamco et commodo fugiat.",
                            "isCorrect": true
                        },
                        {
                            "index": 6,
                            "text": "Ad Lorem id ex officia occaecat id incididunt ullamco elit elit nostrud.",
                            "isCorrect": false
                        },
                        {
                            "index": 7,
                            "text": "Magna exercitation quis sit elit reprehenderit velit ipsum ut et est tempor magna.",
                            "isCorrect": false
                        },
                        {
                            "index": 8,
                            "text": "Sunt amet minim minim mollit voluptate occaecat.",
                            "isCorrect": true
                        }
                    ]
                },
                {
                    "index": 3,
                    "title": "consectetur culpa proident duis",
                    "text": "Elit esse dolor et dolore. Voluptate tempor duis labore irure cillum dolore dolor consequat sit labore. Aliquip ad dolor veniam consectetur cillum in elit velit anim ad laboris proident.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Ut occaecat quis reprehenderit magna Lorem non cupidatat elit ad excepteur dolor.",
                            "isCorrect": false
                        },
                        {
                            "index": 1,
                            "text": "Sint minim reprehenderit nisi elit incididunt est Lorem in sunt.",
                            "isCorrect": false
                        },
                        {
                            "index": 2,
                            "text": "Do anim consequat deserunt fugiat commodo adipisicing.",
                            "isCorrect": true
                        },
                        {
                            "index": 3,
                            "text": "Consectetur ad eiusmod nulla eu excepteur est aliqua labore culpa.",
                            "isCorrect": false
                        },
                        {
                            "index": 4,
                            "text": "Do irure sunt veniam id et.",
                            "isCorrect": true
                        },
                        {
                            "index": 5,
                            "text": "Proident et cupidatat laboris magna Lorem enim.",
                            "isCorrect": true
                        },
                        {
                            "index": 6,
                            "text": "Magna voluptate non aute non nostrud veniam id nisi et aute cillum fugiat dolore.",
                            "isCorrect": true
                        },
                        {
                            "index": 7,
                            "text": "In irure velit veniam veniam ex anim in.",
                            "isCorrect": true
                        },
                        {
                            "index": 8,
                            "text": "Et enim nulla commodo et minim culpa excepteur anim officia aliquip ut deserunt aute.",
                            "isCorrect": false
                        }
                    ]
                },
                {
                    "index": 4,
                    "title": "qui anim qui aute",
                    "text": "Labore Lorem non irure nisi incididunt nulla sit do voluptate et aliquip minim. Id elit irure mollit eu deserunt dolor. Magna consequat ipsum commodo amet elit voluptate aliqua esse ex cupidatat.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Sit magna enim elit fugiat adipisicing enim amet reprehenderit laboris fugiat occaecat in nostrud.",
                            "isCorrect": true
                        },
                        {
                            "index": 1,
                            "text": "Sunt minim reprehenderit nulla dolor ea fugiat ex do laborum voluptate cillum.",
                            "isCorrect": true
                        },
                        {
                            "index": 2,
                            "text": "Cillum esse minim irure irure laborum voluptate veniam nulla ex duis cillum ad.",
                            "isCorrect": false
                        },
                        {
                            "index": 3,
                            "text": "Consectetur minim tempor dolor do dolor consectetur cillum sint magna incididunt culpa.",
                            "isCorrect": false
                        },
                        {
                            "index": 4,
                            "text": "Occaecat aliqua Lorem cillum quis eiusmod deserunt.",
                            "isCorrect": false
                        },
                        {
                            "index": 5,
                            "text": "Sunt eu reprehenderit sint culpa quis sint.",
                            "isCorrect": false
                        },
                        {
                            "index": 6,
                            "text": "Id proident cillum tempor amet elit amet magna commodo ad do sint fugiat eu.",
                            "isCorrect": true
                        },
                        {
                            "index": 7,
                            "text": "Cupidatat ut adipisicing nulla voluptate irure voluptate laborum labore.",
                            "isCorrect": false
                        },
                        {
                            "index": 8,
                            "text": "Et sunt in proident officia ea adipisicing proident laborum voluptate sunt incididunt deserunt aliquip.",
                            "isCorrect": false
                        }
                    ]
                }
            ]
        },
        "students": [],
        "questionStats": [
            {
                "index": 0,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 40
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 83
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 57
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 232
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 44
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 202
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 89
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 216
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 237
                    }
                ]
            },
            {
                "index": 1,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 35
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 298
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 14
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 168
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 216
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 122
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 164
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 97
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 36
                    }
                ]
            },
            {
                "index": 2,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 132
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 242
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 125
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 257
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 284
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 127
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 132
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 272
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 171
                    }
                ]
            },
            {
                "index": 3,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 181
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 231
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 108
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 208
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 182
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 295
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 165
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 6
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 96
                    }
                ]
            },
            {
                "index": 4,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 18
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 190
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 3
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 253
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 54
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 248
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 296
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 68
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 175
                    }
                ]
            }
        ],
        "alreadyShowedResults": true
    },
    {
        "quiz": {
            "title": "Riverton",
            "questions": [
                {
                    "index": 0,
                    "title": "aliquip in adipisicing proident",
                    "text": "Elit ut ex labore tempor voluptate Lorem tempor excepteur irure. Proident ipsum aliquip amet cupidatat aliqua ut consequat cupidatat ut ex dolor officia. Qui Lorem minim ad quis velit mollit pariatur nostrud et consectetur tempor.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Elit sunt non ea deserunt et magna voluptate deserunt quis.",
                            "isCorrect": false
                        },
                        {
                            "index": 1,
                            "text": "Anim labore amet incididunt nostrud esse enim sunt ullamco do sit pariatur fugiat Lorem.",
                            "isCorrect": false
                        },
                        {
                            "index": 2,
                            "text": "Ut deserunt dolor culpa minim occaecat.",
                            "isCorrect": true
                        },
                        {
                            "index": 3,
                            "text": "Officia culpa cillum excepteur occaecat enim.",
                            "isCorrect": false
                        },
                        {
                            "index": 4,
                            "text": "Mollit commodo laborum esse irure ipsum magna excepteur ut cillum.",
                            "isCorrect": false
                        },
                        {
                            "index": 5,
                            "text": "Duis amet enim aliqua dolor qui do ullamco minim irure aute id Lorem nisi velit.",
                            "isCorrect": false
                        },
                        {
                            "index": 6,
                            "text": "Consequat veniam ipsum tempor veniam est eiusmod pariatur nostrud anim officia cupidatat nisi mollit id.",
                            "isCorrect": true
                        },
                        {
                            "index": 7,
                            "text": "Enim dolore duis velit sint adipisicing aute ipsum adipisicing anim aliquip laboris eu.",
                            "isCorrect": true
                        },
                        {
                            "index": 8,
                            "text": "Minim ipsum et laboris eiusmod enim exercitation et proident in duis nostrud laboris occaecat do.",
                            "isCorrect": false
                        }
                    ]
                },
                {
                    "index": 1,
                    "title": "exercitation magna est ut",
                    "text": "Proident voluptate cupidatat quis magna ex. Eiusmod ipsum in commodo officia nulla irure irure deserunt culpa et Lorem. In irure nostrud cupidatat amet ea ullamco labore sunt nostrud velit reprehenderit.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Id pariatur Lorem in non do tempor et aute veniam.",
                            "isCorrect": true
                        },
                        {
                            "index": 1,
                            "text": "Labore culpa esse pariatur laborum duis magna anim culpa aliqua officia ad commodo consectetur Lorem.",
                            "isCorrect": false
                        },
                        {
                            "index": 2,
                            "text": "Officia aliqua reprehenderit ullamco veniam irure reprehenderit exercitation incididunt laborum adipisicing sunt laborum irure.",
                            "isCorrect": false
                        },
                        {
                            "index": 3,
                            "text": "Dolor magna dolore aute amet ipsum occaecat sint quis id nulla cupidatat.",
                            "isCorrect": true
                        },
                        {
                            "index": 4,
                            "text": "Reprehenderit laboris laborum do est enim aliquip culpa.",
                            "isCorrect": true
                        },
                        {
                            "index": 5,
                            "text": "Consequat aliquip aliquip minim aute excepteur ad mollit consequat ex tempor laborum pariatur laboris.",
                            "isCorrect": true
                        },
                        {
                            "index": 6,
                            "text": "Qui magna nulla ad nostrud incididunt Lorem fugiat cupidatat reprehenderit excepteur ullamco.",
                            "isCorrect": true
                        },
                        {
                            "index": 7,
                            "text": "Dolor minim qui eiusmod nisi anim non.",
                            "isCorrect": true
                        },
                        {
                            "index": 8,
                            "text": "Pariatur id ad aliquip proident reprehenderit aute duis irure eu esse qui proident et nulla.",
                            "isCorrect": true
                        }
                    ]
                },
                {
                    "index": 2,
                    "title": "deserunt irure non ullamco",
                    "text": "Sunt aliqua amet do culpa. Et nisi anim esse deserunt officia non nostrud dolore. Commodo minim ex esse consectetur magna tempor laboris laborum consequat id ullamco consectetur labore.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Dolore nostrud cillum culpa nostrud tempor ullamco laborum qui aliquip est.",
                            "isCorrect": true
                        },
                        {
                            "index": 1,
                            "text": "Est culpa est laboris exercitation.",
                            "isCorrect": false
                        },
                        {
                            "index": 2,
                            "text": "Consectetur adipisicing esse consectetur veniam est est duis dolore pariatur do nulla.",
                            "isCorrect": true
                        },
                        {
                            "index": 3,
                            "text": "Et anim reprehenderit exercitation consectetur proident ullamco elit officia dolore irure eu.",
                            "isCorrect": true
                        },
                        {
                            "index": 4,
                            "text": "Et exercitation mollit consectetur dolor excepteur id culpa sit ut consectetur ad enim consectetur.",
                            "isCorrect": true
                        },
                        {
                            "index": 5,
                            "text": "Non culpa exercitation elit commodo duis eiusmod amet.",
                            "isCorrect": true
                        },
                        {
                            "index": 6,
                            "text": "Eiusmod eu aliquip voluptate non.",
                            "isCorrect": true
                        },
                        {
                            "index": 7,
                            "text": "Et culpa nostrud pariatur voluptate ea duis veniam qui reprehenderit sunt.",
                            "isCorrect": false
                        },
                        {
                            "index": 8,
                            "text": "Veniam dolore incididunt ipsum aute commodo amet.",
                            "isCorrect": true
                        }
                    ]
                },
                {
                    "index": 3,
                    "title": "aliquip sit proident reprehenderit",
                    "text": "Id qui esse ea laborum dolor nostrud sunt tempor laborum Lorem. Officia aute occaecat enim culpa Lorem. Elit do ad consectetur fugiat.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Esse tempor mollit esse nostrud.",
                            "isCorrect": false
                        },
                        {
                            "index": 1,
                            "text": "Amet ullamco aliqua culpa labore do occaecat culpa aliqua irure eiusmod non quis veniam.",
                            "isCorrect": false
                        },
                        {
                            "index": 2,
                            "text": "Tempor laboris tempor pariatur duis commodo id tempor in ex.",
                            "isCorrect": true
                        },
                        {
                            "index": 3,
                            "text": "Aliqua dolor proident sit in.",
                            "isCorrect": true
                        },
                        {
                            "index": 4,
                            "text": "Elit id veniam proident voluptate.",
                            "isCorrect": true
                        },
                        {
                            "index": 5,
                            "text": "Et qui officia aute amet.",
                            "isCorrect": false
                        },
                        {
                            "index": 6,
                            "text": "Aliquip qui fugiat id id cillum adipisicing.",
                            "isCorrect": true
                        },
                        {
                            "index": 7,
                            "text": "Et consectetur et ea pariatur labore nisi eiusmod ea dolore ut sint nulla anim id.",
                            "isCorrect": true
                        },
                        {
                            "index": 8,
                            "text": "Tempor laboris officia ex commodo laboris.",
                            "isCorrect": true
                        }
                    ]
                },
                {
                    "index": 4,
                    "title": "exercitation ipsum occaecat sint",
                    "text": "Dolor excepteur voluptate nulla reprehenderit fugiat excepteur qui fugiat. Lorem mollit excepteur ad dolor esse commodo adipisicing. Enim veniam et aliqua dolore amet est ad amet consequat ad non officia ipsum nisi.",
                    "options": [
                        {
                            "index": 0,
                            "text": "Cillum cillum in id minim consectetur cillum ipsum deserunt minim minim reprehenderit velit voluptate.",
                            "isCorrect": false
                        },
                        {
                            "index": 1,
                            "text": "Consectetur sit laboris duis adipisicing non et irure magna nostrud.",
                            "isCorrect": false
                        },
                        {
                            "index": 2,
                            "text": "Excepteur nisi irure Lorem enim veniam reprehenderit sint laboris anim.",
                            "isCorrect": true
                        },
                        {
                            "index": 3,
                            "text": "Amet non proident qui exercitation quis aute.",
                            "isCorrect": false
                        },
                        {
                            "index": 4,
                            "text": "Consequat consectetur reprehenderit dolore minim mollit id nulla consequat ad laborum ipsum duis ullamco.",
                            "isCorrect": true
                        },
                        {
                            "index": 5,
                            "text": "Est irure magna et quis nostrud consectetur pariatur do elit eiusmod ea ut cillum occaecat.",
                            "isCorrect": true
                        },
                        {
                            "index": 6,
                            "text": "Tempor tempor exercitation exercitation irure sit laborum eu qui ex minim elit fugiat voluptate reprehenderit.",
                            "isCorrect": false
                        },
                        {
                            "index": 7,
                            "text": "Cillum Lorem ad do qui deserunt culpa sint est dolore commodo qui nulla deserunt ut.",
                            "isCorrect": true
                        },
                        {
                            "index": 8,
                            "text": "Mollit quis tempor ad velit ea.",
                            "isCorrect": false
                        }
                    ]
                }
            ]
        },
        "students": [],
        "questionStats": [
            {
                "index": 0,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 275
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 291
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 253
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 19
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 91
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 67
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 119
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 175
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 118
                    }
                ]
            },
            {
                "index": 1,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 63
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 55
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 27
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 23
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 162
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 79
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 175
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 25
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 31
                    }
                ]
            },
            {
                "index": 2,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 293
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 55
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 284
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 219
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 119
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 160
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 290
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 63
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 270
                    }
                ]
            },
            {
                "index": 3,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 143
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 277
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 127
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 120
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 84
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 18
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 235
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 80
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 255
                    }
                ]
            },
            {
                "index": 4,
                "options": [
                    {
                        "index": 0,
                        "numberOfTimesSelected": 50
                    },
                    {
                        "index": 1,
                        "numberOfTimesSelected": 231
                    },
                    {
                        "index": 2,
                        "numberOfTimesSelected": 238
                    },
                    {
                        "index": 3,
                        "numberOfTimesSelected": 220
                    },
                    {
                        "index": 4,
                        "numberOfTimesSelected": 209
                    },
                    {
                        "index": 5,
                        "numberOfTimesSelected": 87
                    },
                    {
                        "index": 6,
                        "numberOfTimesSelected": 138
                    },
                    {
                        "index": 7,
                        "numberOfTimesSelected": 1
                    },
                    {
                        "index": 8,
                        "numberOfTimesSelected": 140
                    }
                ]
            }
        ],
        "alreadyShowedResults": true
    }
]

const includeMockData = (enabled: boolean, store: IStore) => {
    let storeWithMock = JSON.parse(JSON.stringify(store));

    if (enabled) {
        storeWithMock.scheduledQuizzes = scheduledQuizzesMock;
    }

    return storeWithMock;
}

export { includeMockData, studentListMock, timestampMock };

