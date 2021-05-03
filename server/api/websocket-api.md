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
            "lecture_id": "4630f745-0a10-47ec-b1c8-cddb3fcf598b"
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
            "student_id": "4fef1e0f-e77f-4302-aab6-d0cc67811368",
            "lecture_link": "8341568"
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
            "quiz_id": "some identifiable string",
            "student_ids": [
                "059bc853-0522-4c06-bc04-bff704fb34f5",
                "20d7a5c9-f4f6-45ca-87a4-39ac97df3499"
            ],
            "time_seconds": 90,
            "questions": "literally any type"
        }
    }
    ```

-   **Response Payload:**

    ```json
    {
        "event": "quiz_in_progress"
    }
    ```

-   **Error Response Payload:** `None`
-   **Emitted Payload Content:**

    ```json
    {
        "event": "send_quiz",
        "data": {
            "quiz_id": "185f192f-3c51-4855-a46e-868756d66c6c",
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
            "quiz_id": "2e847f59-aa76-4621-a853-b0af852998e3",
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

  