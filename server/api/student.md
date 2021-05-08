## **howToReadApiDoc**

    Wyjaśnia jak rozumieć podane pola.

-   **Requirements:** `wymagane metody, które muszą być wykonane wcześniej`
-   **Event type:** `jedno ze stringowych pól w payloadzie`
-   **Payload Content:** `co ma zostać przysłane`
-   **Success Payload Content** `co odeśle po udanej operacji`
-   **Error Payload Content** `co odeśle po nieudanej operacji`
-   **Emitted Payload Content:** `co zostanie przesłane dalej`
-   **Payload Content Emitted On Event:** `co zostanie wyslane przy zaistnieniu eventu`

## **createStudent**

    Tworzy obiekt studenta po stronie serwera i umieszcza go we właściwym wykładzie.

-   **Requirements:** `None`
-   **Event type:** `create_student`
-   **Payload Content:**

    ```json
    {
        "event": "create_student",
        "data": {
            "lectureLink": "2571327",
            "nick": "nickomowicz",
            "name": "namowiczowin",
            "surname": "surnamowicz"
        }
    }
    ```

-   **Success Response Payload:**

    ```json
    {
        "event": "student_created",
        "data": {
            "studentID": "059bc853-0522-4c06-bc04-bff704fb34f5"
        }
    }
    ```

-   **Error Response Payload:**

    ```json
    {
        "event": "student_not_created"
    }
    ```

-   **Emitted Payload Content:** `None`
-   **Payload Content Emitted On Event:** `None`

## **reconnectStudent**

    Przywraca połączenie z istniejącym po stronie serwera obiektem studenta.

-   **Requirements:** `createStudent`
-   **Event type:** `reconnect_student`
-   **Payload Content:**

    ```json
    {
        "event": "reconnect_student",
        "data": {
            "lectureLink": "2571327",
            "studentID": "6f545cd3-6586-4e0f-b7d4-847b024c09f9"
        }
    }
    ```

-   **Success Response Payload:**

    ```json
    {
        "event": "student_reconnected",
    }
    ```

-   **Error Response Payload:**

    ```json
    {
        "event": "student_not_reconnected"
    }
    ```

-   **Emitted Payload Content:** `None`
-   **Payload Content Emitted On Event:** `None`

## **deleteStudent**

    Usuwa obiekt studenta po stronie serwera i zrywa połączenie.

-   **Requirements:** `createStudent`
-   **Event type:** `delete_student`
-   **Payload Content:**

    ```json
    {
        "event": "delete_student"
    }
    ```

-   **Response Payload:**

    ```json
    {
        "event": "student_deleted"
    }
    ```

-   **Error Response Payload:** `None`
-   **Emitted Payload Content:** `None`
-   **Payload Content Emitted On Event:** `None`

## **sendQuizResponseFromStudent**

    Odsyła odpowiedzi na zadany quiz.

-   **Requirements:** `createStudent`
-   **Event type:** `send_quiz_response`
-   **Payload Content:**

    ```json
    {
        "event": "send_quiz_response",
        "data": {
            "quizID": "3e8baec5-13b0-4d5a-90a6-d6ad72d10727",
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

    Wysyła reakcję studenta.

-   **Requirements:** `createStudent`
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
            "studentID": "185f192f-3c51-4855-a46e-868756d66c6c"
        }
    }
    ```

## **checkLectureLink**

    Pozwala na sprawdzenie czy przesłany link jest w użyciu.

-   **Requirements:** `None`
-   **Event type:** `check_link`
-   **Payload Content:**

    ```json
    {
        "event": "check_link",
        "data": {
            "lectureLink": "2571327"
        }
    }
    ```

-   **Response Payload:**

    ```json
    {
        "event": "valid_link"
    }
    ```

-   **Error Response Payload:**

    ```json
    {
        "event": "invalid_link"
    }
    ```

-   **Emitted Payload Content:** `None`
-   **Payload Content Emitted On Event:** `None`
