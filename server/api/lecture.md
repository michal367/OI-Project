## **howToReadApiDoc**

    Wyjaśnia jak rozumieć podane pola.

-   **Requirements:** `wymagane metody, które muszą być wykonane wcześniej`
-   **Event type:** `jedno ze stringowych pól w payloadzie`
-   **Payload Content:** `co ma zostać przysłane`
-   **Success Payload Content** `co odeśle po udanej operacji`
-   **Error Payload Content** `co odeśle po nieudanej operacji`
-   **Emitted Payload Content:** `co zostanie przesłane dalej`
-   **Payload Content Emitted On Event:** `co zostanie wyslane przy zaistnieniu eventu`

## **createLecture**

    Tworzy obiekt wykładu po stronie serwera i subskrybuje go na różne zdarzenia.

-   **Requirements:** `None`
-   **Event type:** `create_lecture`
-   **Payload Content:**

    ```json
    {
        "event": "create_lecture",
        "data": {
            "tutor": "Apple I-Dzik"
        }         
    }
    ```

-   **Success Response Payload:**

    ```json
    {
        "event": "lecture_created",
        "data": {
            "lectureID": "7101b8b4-acd2-4838-9464-1da7aeff5335",
            "lectureLink": "1765661"
        }        
    }
    ```

-   **Error Response Payload:**

    ```json
    {
        "event": "lecture_not_created"
    }
    ```

-   **Emitted Payload Content:** `None`
-   **Payload Content Emitted On Event:** `new student added`

    ```json
    {
        "event": "student_added",
        "data": {
            "studentID": "7101b8b4-acd2-4838-9464-1da7aeff5335",
            "nick": "nickowicz",
            "name": "namowicz",
            "surname": "surnamowicz"
        }        
    }
    ```

-   **Payload Content Emitted On Event:** `student deleted`

    ```json
    {
        "event": "student_deleted",
        "data": {
            "studentID": "7101b8b4-acd2-4838-9464-1da7aeff5335"
        }        
    }
    ```

## **reconnectLecture**

    Przywraca połączenie z istniejącym po stronie serwera obiektem wykładu.

-   **Requirements:** `createLecture`
-   **Event type:** `reconnect_lecture`
-   **Payload Content:**

    ```json
    {
        "event": "reconnect_lecture",
        "data": {
            "lectureID": "8ae1c319-b480-4e4c-a10a-8c5836cd8f3b"
        }         
    }
    ```

-   **Success Response Payload:**

    ```json
    {
        "event": "lecture_reconnected",      
    }
    ```

-   **Error Response Payload:**

    ```json
    {
        "event": "lecture_not_reconnected"
    }
    ```

-   **Emitted Payload Content:** `None`
-   **Payload Content Emitted On Event:** `None`

## **deleteLecture**

    Usuwa obiekt wykładu i przypisanych do niego studentów po stronie serwera i zrywa połączenia.

-   **Requirements:** `createLecture`
-   **Event type:** `delete_lecture`
-   **Payload Content:**

    ```json
    {
        "event": "delete_lecture"
    }
    ```

-   **Response Payload:**

    ```json
    {
        "event": "lecture_ended"
    }
    ```

-   **Error Response Payload:** `None`
-   **Emitted Payload Content:** 

    ```json
    {
        "event": "lecture_ended"
    }
    ```

-   **Payload Content Emitted On Event:** `None`

## **sendQuizToStudents**

    Wysyła do wybranych studentów zadany quiz.

-   **Requirements:** `subsribeToLecture`
-   **Event type:** `send_quiz`
-   **Payload Content:**

    ```json
    {
        "event": "send_quiz",
        "data": {
            "studentIDs": [
                "c3b6e86d-8b12-472b-85f2-f8452380ca87",
                "20d7a5c9-f4f6-45ca-87a4-39ac97df3499"
            ],
            "timeSeconds": 90,
            "questions": {
                "title":"Zwierze",
                "questions":
                [
                    {
                        "title":"Jeż",
                        "text":"Dokąd nocą tupta",
                        "options":
                        [
                            {"index":1,"text":"nocna wyczieka","isCorrect":false},
                            {"index":2,"text":"pracia","isCorrect":true}
                        ]
                    },
                    {
                        "title":"Koń",
                        "text":"Czy koń liczy kroki?",
                        "options":
                        [
                            {"index":1,"text":"tak","isCorrect":true},
                            {"index":2,"text":"nie","isCorrect":false}
                        ]
                    }
                ]
            }
        }
    }
    ```

-   **Response Payload:**

    ```json
    {
        "event": "quiz_in_progress",
        "data": {
            "quizID": "a3d577db-9b81-4d03-9cbc-6ecaa3fcf381"
        }
    }
    ```

-   **Error Response Payload:** `None`
-   **Emitted Payload Content:**

    ```json
    {
        "event": "send_quiz",
        "data": {
            "quizID": "185f192f-3c51-4855-a46e-868756d66c6c",
            "timeSeconds": 90,
            "questions": "literally any type"
        }
    }
    ```

-   **Payload Content Emitted On Event:** `student added answers`

    ```json
    {
        "event": "quiz_answers_added",
        "data": {
            "quizID":  "some identifiable string",
            "studentID": "185f192f-3c51-4855-a46e-868756d66c6c",
            "answers": "literally any type"
        }
    }
    ```

-   **Payload Content Emitted On Event:** `quiz ended - lecturer`

    ```json
    {
        "event": "quiz_ended",
        "data": {
            "quizID":  "some identifiable string",
            "reason": "timeout"
        }
    }
    ```

-   **Payload Content Emitted On Event:** `quiz ended - student`

    ```json
    {
        "event": "quiz_ended",
        "data": {
            "quizID":  "f19f15b7-be67-4591-ad2f-e098128c6c17",
            "reason": "timeout"
        }
    }
    ```


## **getStudentList**

    Odysła listę zapisanych do wykładu studentów.

-   **Requirements:** `createLecture`
-   **Event type:** `get_student_list`
-   **Payload Content:**

    ```json
    {
        "event": "get_student_list"
    }
    ```

-   **Response Payload:**

    ```json
    {
        "event":"student_list",
        "data":{
            "studentList":[
                {
                    "id":"20f52cf6-ddbb-4380-a046-5f528b76beca",
                    "nick":"nickomowicz",
                    "name":"namowicz",
                    "surname":"surnamowicz"
                },
                {
                    "id":"80a93b73-d017-487f-aa2c-b14222d1e70a",
                    "nick":"nickomowicz",
                    "name":"namowicz",
                    "surname":"surnamowicz"
                }
            ]
        }
    }
    ```

-   **Error Response Payload:** `None`
-   **Emitted Payload Content:**  `None`
-   **Payload Content Emitted On Event:** `None`


## **showAnswersToStudent**

    Pokazuje odpowiedzi na dany quiz.

-   **Requirements:** `subsribeStudentToLecture`
-   **Event type:** `show_answers`
-   **Payload Content:**

    ```json
    {
        "event": "show_answers",
        "data": {
            "quizID": "e1cb341e-73d3-4481-80e4-2f71371f845c"
        }
    }
    ```

-   **Response Payload:**

    ```json
    {
        "event": "answers_showed"
    }
    ```

-   **Error Response Payload:**

    ```json
    {
        "event": "answers_not_showed"
    }
    ```

-   **Emitted Payload Content:**

    ```json
    {
        "event": "show_answers",
        "data": {
            "quizID": "2e847f59-aa76-4621-a853-b0af852998e3",
            "correctAnswers": "answers",
            "studentAnswers": "student answers"
        }
    }
    ```
