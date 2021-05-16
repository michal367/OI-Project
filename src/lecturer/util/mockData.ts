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
        message: "Dołączył",
        hours:"09",
        minutes:"30",
        owner: "PŚwiderski",
    },
    {
        type: "LogType",
        message: "Zadał pytanie",
        hours:"09",
        minutes:"30",
        owner: "PŚwiderski",
    },
    {
        type: "QuizType",
        message: "Zakończył quiz",
        hours:"09",
        minutes:"30",
        owner: "PŚwiderski",
    },
    {
        type: "QuizType",
        message: "Zakończył quiz",
        hours:"09",
        minutes:"30",
        owner: "PŚwiderski",
    },
    {
        type: "QuizType",
        message: "Zakończył quiz",
        hours:"09",
        minutes:"30",
        owner: "PŚwiderski",
    },
    {
        type: "QuizType",
        message: "Zakończył quiz",
        hours:"09",
        minutes:"37",
        owner: "PŚwiderski",
    },
    {
        type: "QuizType",
        message: "Zakończył quiz",
        hours:"09",
        minutes:"37",
        owner: "PŚwiderski",
    },
    {
        type: "QuizType",
        message: "Zakończył quiz",
        hours:"09",
        minutes:"37",
        owner: "PŚwiderski",
    },
    {
        type: "QuizType",
        message: "Zakończył quiz",
        hours:"09",
        minutes:"37",
        owner: "PŚwiderski",
    },
    {
        type: "QuizType",
        message: "Zakończył quiz",
        hours:"09",
        minutes:"37",
        owner: "PŚwiderski",
    },
    {
        type: "ReactionType",
        message: "Zareagował",
        hours:"09",
        minutes:"30",
        owner: "PŚwiderski",
    }
];

const studentQusestionsMock: StudentQuestion[] = [
    {
      studentNick: "Erickson Bradley",
      hours: "9",
      minutes: "27",
      text: "Excepteur anim consectetur esse cupidatat occaecat laborum et est commodo enim irure minim."
    },
    {
      studentNick: "Jean Melton",
      hours: "9",
      minutes: "29",
      text: "Consectetur non ad tempor commodo ad irure magna."
    },
    {
      studentNick: "Aileen Bruce",
      hours: "8",
      minutes: "22",
      text: "Reprehenderit amet eu veniam sit non laborum ut excepteur excepteur Lorem voluptate anim id ea."
    },
    {
      studentNick: "Lila Yang",
      hours: "9",
      minutes: "11",
      text: "Esse fugiat id eiusmod nulla sint non cillum nisi minim dolore est magna ea id."
    },
    {
      studentNick: "Elsa Moses",
      hours: "9",
      minutes: "18",
      text: "Do cillum commodo aliquip Lorem veniam duis nisi aliqua."
    },
    {
      studentNick: "Becker Patel",
      hours: "8",
      minutes: "21",
      text: "Aliqua anim esse sint occaecat Lorem incididunt."
    },
    {
        studentNick: "Elsa Moses",
        hours: "9",
        minutes: "18",
        text: "Do cillum commodo aliquip Lorem veniam duis nisi aliqua."
      },
      {
        studentNick: "Becker Patel",
        hours: "8",
        minutes: "21",
        text: "Aliqua anim esse sint occaecat Lorem incididunt."
      },
      {
        studentNick: "Elsa Moses",
        hours: "9",
        minutes: "18",
        text: "Do cillum commodo aliquip Lorem veniam duis nisi aliqua."
      },
      {
        studentNick: "Becker Patel",
        hours: "8",
        minutes: "21",
        text: "Aliqua anim esse sint occaecat Lorem incididunt."
      },
      {
        studentNick: "Elsa Moses",
        hours: "9",
        minutes: "18",
        text: "Do cillum commodo aliquip Lorem veniam duis nisi aliqua."
      },
      {
        studentNick: "Becker Patel",
        hours: "8",
        minutes: "21",
        text: "Aliqua anim esse sint occaecat Lorem incididunt."
      },
      {
        studentNick: "Haney Beck",
        hours: "9",
        minutes: "2",
        text: "Cillum et aute adipisicing esse deserunt esse eiusmod non."
      },
      {
        studentNick: "Becker Patel",
        hours: "8",
        minutes: "21",
        text: "Aliqua anim esse sint occaecat Lorem incididunt."
      },
      {
        studentNick: "Haney Beck",
        hours: "9",
        minutes: "2",
        text: "Cillum et aute adipisicing esse deserunt esse eiusmod non."
      }
  ]

export { studentListMock, questionListMock, studentQusestionsMock, timestampMock };