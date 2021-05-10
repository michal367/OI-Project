## **howToReadApiDoc**

    Wyjaśnia jak rozumieć podane pola.

-   **Requirements:** `wymagane metody, które muszą być wykonane wcześniej`
-   **Event type:** `jedno ze stringowych pól w payloadzie`
-   **Payload Content:** `co ma zostać przysłane`
-   **Success Payload Content** `co odeśle po udanej operacji`
-   **Error Payload Content** `co odeśle po nieudanej operacji`
-   **Emitted Payload Content:** `co zostanie przesłane dalej`
-   **Payload Content Emitted On Event:** `co zostanie wyslane przy zaistnieniu eventu`

## **subscribeToLecture**

    Ustanawia połączenie między widokiem wykładu a obiektem wykładu po stronie serwera.

-   **Requirements:** `None`
-   **Event type:** `subscribe_lecture`
-   **Payload Content:**

    ```json
    {
        "event": "subscribe_lecture",
        "data": {
            "lecture_id": "c1a0ee5c-1998-46b2-8f7b-9cc02697b64a"
        }
    }
    ```

-   **Success Response Payload:**

    ```json
    {
        "event": "lecture_subscribed"
    }
    ```

-   **Error Response Payload:**

    ```json
    {
        "event": "lecture_not_subscribed"
    }
    ```

-   **Emitted Payload Content:** `None`
-   **Payload Content Emitted On Event:** `new student added`

    ```json
        "studentAdded"
    ```

-   **Payload Content Emitted On Event:** `student deleted`

    ```json
        "studentDeleted"
    ```


## **subscribeStudentToLecture**

    Ustanawia połączenie między widokiem studenta a obiektem studenta po stronie serwera.

-   **Requirements:** `None`
-   **Event type:** `subscribe_student`
-   **Payload Content:**

    ```json
    {
        "event": "subscribe_student",
        "data": {
            "student_id": "47eecf6c-9547-4194-a6c3-1e7752bb0f80",
            "lecture_link": "7442202"
        }
    }
    ```

-   **Success Response Payload:**

    ```json
    {
        "event": "student_subscribed"
    }
    ```

-   **Error Response Payload:**

    ```json
    {
        "event": "student_not_subscribed"
    }
    ```

-   **Emitted Payload Content:** `None`
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
            "student_ids": [
                "47eecf6c-9547-4194-a6c3-1e7752bb0f80",
                "20d7a5c9-f4f6-45ca-87a4-39ac97df3499"
            ],
            "time_seconds": 90,
            "quiz": {
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
            "quiz_id": "185f192f-3c51-4855-a46e-868756d66c6c",
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
            "quiz_id":  "some identifiable string",
            "student_id": "185f192f-3c51-4855-a46e-868756d66c6c",
            "answers": "literally any type"
        }
    }
    ```

-   **Payload Content Emitted On Event:** `quiz ended - lecturer`

    ```json
    {
        "event": "quiz_ended",
        "data": {
            "quiz_id":  "some identifiable string",
            "reason": "timeout"
        }
    }
    ```

-   **Payload Content Emitted On Event:** `quiz ended - student`

    ```json
    {
        "event": "quiz_ended",
        "data": {
            "quiz_id":  "f19f15b7-be67-4591-ad2f-e098128c6c17",
            "reason": "timeout"
        }
    }
    ```

## **sendResponseFromStudent**

    Odsyła odpowiedzi na zadany quiz.

-   **Requirements:** `subsribeStudentToLecture`
-   **Event type:** `send_quiz_response`
-   **Payload Content:**

    ```json
    {
        "event": "send_quiz_response",
        "data": {
            "quiz_id": "63d09893-cf7d-466e-aadd-c96af0d39b59",
            "answers": "literally any type"
        }
    }
    ```

-   **Response Payload:**

    ```json
    {
        "event": "student_answers_added"
    }
    ```

-   **Error Response Payload:**

    ```json
    {
        "event": "student_answers_not_added"
    }
    ```

-   **Emitted Payload Content:** `None`


## **sendReactionFromStudent**

    Odsyła odpowiedzi na zadany quiz.

-   **Requirements:** `subsribeStudentToLecture`
-   **Event type:** `send_reaction`
-   **Payload Content:**

    ```json
    {
        "event": "send_reaction",
        "data": {
            "reaction": "POG"
        }
    }
    ```

-   **Response Payload:**

    ```json
    {
        "event": "student_reaction_sent"
    }
    ```

-   **Error Response Payload:**

    ```json
    {
        "event": "student_reaction_not_sent"
    }
    ```

-   **Payload Content Emitted On Event:** `student added reaction`

    ```json
    {
        "event": "send_student_reaction",
        "data": {
            "reaction": "POG",
            "student_id": "185f192f-3c51-4855-a46e-868756d66c6c"
        }
    }
    ```

## **showAnswersToStudent**

    Pokazuje odpowiedzi na dany quiz.

-   **Requirements:** `subsribeStudentToLecture`
-   **Event type:** `show_answers`
-   **Payload Content:**

    ```json
    {
        "event": "show_answers",
        "data": {
            "quizID": "63d09893-cf7d-466e-aadd-c96af0d39b59"
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

## **sendQuestionFromStudent**

    Wysyła pytanie studenta TYLKO do wykładowcy.

-   **Requirements:** `subsribeStudentToLecture`
-   **Event type:** `send_question`
-   **Payload Content:**

    ```json
    {
        "event": "send_question",
        "data": {
            "text": "Czy pingwiny maja kolana?"
        }
    }
    ```

-   **Response Payload:**

    ```json
    {
        "event": "student_question_sent"
    }
    ```

-   **Error Response Payload:**

    ```json
    {
        "event": "student_question_not_sent"
    }
    ```

-   **Payload Content Emitted On Event:** `student added question`

    ```json
    {
        "event": "send_student_question",
        "data": {
            "text": "Czy pingwiny maja kolana?",
            "student_id": "185f192f-3c51-4855-a46e-868756d66c6c",
        }
    }
    ```
