## **subscribeToLecture**

    Ustanawia połączenie między widokiem wykładu a obiektem wykładu po stronie serwera.

-   **Requirements:** `None`
-   **Event type:** `subscribe`
-   **Payload Content:**

    ```json
    {
        "event": "subscribe_lecture",
        "data": {
            "lecture_id": "152a28b7-3767-4d59-8718-ac001c4178f0"
        }
    }
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
            "student_id": "9b2f85f4-a57b-415f-9697-bd5cd8a9da76",
            "lecture_link": "9144139"
        }
    }
    ```

## **sendQuizToStudents**

    Wysyła do wybranych studentów zadany quiz.

-   **Requirements:** `subsribeToLecture`
-   **Event type:** `send_quiz`
-   **Payload Content:**

    ```json
    {
        "event": "send_quiz",
        "data": {
            "lecture_id": "152a28b7-3767-4d59-8718-ac001c4178f0",
            "student_ids": [
                "eb3b9363-2e5b-4996-8bd9-ea22503b2ab8",
                "9b2f85f4-a57b-415f-9697-bd5cd8a9da76"
            ],
            "questions": "literally any type"
        }
    }
    ```

-   **Emitted Payload Content:**

    ```json
    {
        "event": "send_quiz",
        "data": {
            "questions": "literally any type"
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
            "lecture_link": "9144139",
            "student_id": "9b2f85f4-a57b-415f-9697-bd5cd8a9da76",
            "answers": "literally any type"
        }
    }
    ```

-   **Emitted Payload Content:**

    ```json
    {
        "event": "send_quiz_response",
        "data": {
            "student_id": "e50f2783-7857-4aad-9d18-a83d26cf678b",
            "answers": "literally any type"
        }
    }
    ```
