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

## **createStudent**

    Tworzy obiekt studenta po stronie serwera i umieszcza go we właściwym wykładzie.

-   **Requirements:** `None`
-   **Event type:** `create_student`
-   **Payload Content:**

    ```json
    {
        "event": "create_student",
        "data": {
            "lecture_link": "4902065",
            "nick": "nickomowicz",
            "name": "namowicz",
            "surname": "surnamowicz"
        }
    }
    ```

-   **Success Response Payload:**

    ```json
    {
        "event": "student_created",
        "data": {
            "student_id": "059bc853-0522-4c06-bc04-bff704fb34f5"
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
            "lecture_link": "8047751",
            "student_id": "3069042f-5d2d-4679-946b-5e1f9f9bb46a"
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

## **sendResponseFromStudent**

    Odsyła odpowiedzi na zadany quiz.

-   **Requirements:** `subsribeStudentToLecture`
-   **Event type:** `send_quiz_response`
-   **Payload Content:**

    ```json
    {
        "event": "send_quiz_response",
        "data": {
            "quiz_id": "6fda732a-281d-4e9e-989a-132bd74eea08",
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

## **checkLectureLink**

    Pozwala na sprawdzenie czy przesłany link jest w użyciu.

-   **Requirements:** `None`
-   **Event type:** `check_link`
-   **Payload Content:**

    ```json
    {
        "event": "check_link",
        "data": {
            "lecture_link": "8076695"
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

## **deleteStudent**

    Usuwa obiekt studenta po stronie serwera i zrywa połączenie.

-   **Requirements:** `None`
-   **Event type:** `kill_me`
-   **Payload Content:**

    ```json
    {
        "event": "kill_me"
    }
    ```

-   **Response Payload:**

    ```json
    {
        "event": "you_dead"
    }
    ```

-   **Error Response Payload:** `None`
-   **Emitted Payload Content:** `None`
-   **Payload Content Emitted On Event:** `None`