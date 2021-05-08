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
            "lecturer": "Apple I-Dzik"
        }         
    }
    ```

-   **Success Response Payload:**

    ```json
    {
        "event": "lecture_created",
        "data": {
            "lecture_id": "7101b8b4-acd2-4838-9464-1da7aeff5335",
            "lecture_link": "1765661"
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
            "student_id": "7101b8b4-acd2-4838-9464-1da7aeff5335",
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
            "student_id": "7101b8b4-acd2-4838-9464-1da7aeff5335"
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
            "lecture_id": "2b152644-b224-4b6e-a530-ffc54730b1a6"
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

-   **Requirements:** `None`
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
            "quiz_id": "some identifiable string",
            "student_ids": [
                "aee9f548-836a-49c2-bc30-c4e6be14e879"
            ],
            "time_seconds": 60,
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
