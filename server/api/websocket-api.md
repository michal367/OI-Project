## **howToReadApiDoc**

    Wyjaśnia jak rozumieć podane pola.

-   **Requirements:** `wymagane metody, które muszą być wykonane wcześniej`
-   **Event type:** `jedno ze stringowych pól w payloadzie`
-   **Payload Content:** `co ma zostać przysłane`
-   **Succes Payload Content** `co odeśle po udanej operacji`
-   **Error Payload Content** `co odeśle po nieudanej operacji`
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
            "lecture_id": "3de2a841-697a-4623-9607-d89ad85d1a6d"
        }
    }
    ```

-   **Succes Response Payload:**

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

## **subscribeStudentToLecture**

    Ustanawia połączenie między widokiem studenta a obiektem studenta po stronie serwera.

-   **Requirements:** `None`
-   **Event type:** `subscribe_student`
-   **Payload Content:**

    ```json
    {
        "event": "subscribe_student",
        "data": {
            "student_id": "185f192f-3c51-4855-a46e-868756d66c6c",
            "lecture_link": "6097751"
        }
    }
    ```
    
-   **Succes Response Payload:**

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
                "185f192f-3c51-4855-a46e-868756d66c6c",
                "30dd5a67-e59d-4f1f-bf42-05ece01cfc36"
            ],
            "questions": "literally any type"
        }
    }
    ```

-   **Response Payload:**

    ```json
    {
        "event": "quiz_sent_to",
        "data": {
            "student_ids": [
                "185f192f-3c51-4855-a46e-868756d66c6c",
                "30dd5a67-e59d-4f1f-bf42-05ece01cfc36"
            ]
        }
    }
    ```

-   **Error Response Payload:** `None`
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
