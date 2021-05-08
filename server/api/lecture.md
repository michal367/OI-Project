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

-   **Requirements:** `createLecture`
-   **Event type:** `send_quiz`
-   **Payload Content:**

    ```json
    {
        "event": "send_quiz",
        "data": {
            "quizID": "some identifiable string",
            "studentIDs": [
                "6f545cd3-6586-4e0f-b7d4-847b024c09f9",
                "a9e471b0-d188-485b-91b0-abba40a25de1"
            ],
            "timeSeconds": 60,
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
            "quizID": "185f192f-3c51-4855-a46e-868756d66c6c",
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

-   **Requirements:** `None`
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
                {"studentID":"20f52cf6-ddbb-4380-a046-5f528b76beca","nick":"nickomowicz","name":"namowicz","surname":"surnamowicz"},{"studentID":"80a93b73-d017-487f-aa2c-b14222d1e70a","nick":"nickomowicz","name":"namowicz","surname":"surnamowicz"}
            ]
        }
    }
    ```

-   **Error Response Payload:** `None`
-   **Emitted Payload Content:**  `None`
-   **Payload Content Emitted On Event:** `None`
