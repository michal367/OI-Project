## **howToReadApiDoc**

    Wyjaśnia jak rozumieć podane pola.

-   **Requirements:** `wymagane metody, które muszą być wykonane wcześniej`
-   **Event type:** `jedno ze stringowych pól w payloadzie`
-   **Payload Content:** `co ma zostać przysłane`
-   **Emitted Payload Content:** `co zostanie przesłane dalej`

## **subscribeToLecture**

    Ustanawia połączenie między widokiem wykładu a obiektem wykładu po stronie serwera.

-   **Requirements:** `None`
-   **Event type:** `subscribe_lecture`
-   **Payload Content:**

    ```json
    {
        "event": "subscribe_lecture",
        "data": {
            "lecture_id": "af9320ed-9ea5-44fe-a9c0-1d40d91bce29"
        }
    }
    ```
-   **Emitted Payload Content:** `None`

## **subscribeStudentToLecture**

    Ustanawia połączenie między widokiem studenta a obiektem studenta po stronie serwera.

-   **Requirements:** `None`
-   **Event type:** `subscribe_student`
-   **Payload Content:**

    ```json
    {
        "event": "subscribe_student",
        "data": {
            "student_id": "82fde8f0-d01c-4175-8324-f58907d7c1d1",
            "lecture_link": "6240584"
        }
    }
    ```
-   **Emitted Payload Content:** `None`

## **sendQuizToStudents**

    Wysyła do wybranych studentów zadany quiz.

-   **Requirements:** `subsribeToLecture`
-   **Event type:** `send_quiz`
-   **Payload Content:**

    ```json
    {
        "event": "send_quiz",
        "data": {
            "lecture_id": "af9320ed-9ea5-44fe-a9c0-1d40d91bce29",
            "student_ids": [
                "82fde8f0-d01c-4175-8324-f58907d7c1d1",
                "30dd5a67-e59d-4f1f-bf42-05ece01cfc36"
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
            "lecture_link": "6240584",
            "student_id": "82fde8f0-d01c-4175-8324-f58907d7c1d1",
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
