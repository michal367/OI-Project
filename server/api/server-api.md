**createLecture**
----
    Tworzy obiekt Lecture i zwraca jego autogenerowane ID.

* **URL** /api/lectures

* **Method:** `POST`
  
*  **URL Params**

   **Required:** None

* **Data Params** None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {"id": "53e78969-cf08-44e2-bb91-3b8eef50478e"}
    ```
 
* **Error Response:** None

**listLectures**
----
    Zwraca listę obecnie utworzonych sesji wykładowych.

* **URL** /api/lectures

* **Method:** `GET`
  
*  **URL Params**

   **Required:** None

* **Data Params** None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
        {
            "tutor": "n/a",
            "id": "d2c549f5-489b-42aa-a49b-535b34f871ea",
            "link": "9802756",
            "studentList": {
                "students": {}
            }
        },
        {
            "tutor": "n/a",
            "id": "62236f55-6f6b-4803-8a88-5e0f074e6e3b",
            "link": "8808076",
            "studentList": {
                "students": {}
            }
        },
        {
            "tutor": "n/a",
            "id": "fb0d077c-29db-479d-8f81-909fbc0a8762",
            "link": "6639376",
            "studentList": {
                "students": {}
            }
        }
    ]
    ```
 
* **Error Response:** None


**getLecture**
----
    Zwraca jedną konkretną sesję wykładową identyfikowaną po id.

* **URL** /api/lectures/:id

* **Method:** `GET`
  
*  **URL Params**

   **Required:** `id=[string]`

* **Data Params** None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
        {
            "tutor": "n/a",
            "id": "fb0d077c-29db-479d-8f81-909fbc0a8762",
            "link": "6639376",
            "studentList": {
                "students": {}
            }
        }
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ msg : "Lecture Not Found" }`



**deleteLecture**
----
    Usuwa jedną konkretną sesję wykładową identyfikowaną po id.

* **URL** /api/lectures/:id

* **Method:** `DELETE`
  
*  **URL Params**

   **Required:** `id=[string]`

* **Data Params** None

* **Success Response:**

  * **Code:** 204 <br />
    **Content:** None
 
* **Error Response:** None

**getLink**
----
    Zwraca link, jeśli sesja istnieje.

* **URL** /api/lectures/link/:id
* **Method:** `GET`
  
*  **URL Params**

   **Required:** `id=[string]`
* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  7-cyfr
* **Error Response:** **Content:** `{ msg : "Lecture Not Found" }`

**getStudentsList**
----
    Zwraca listę studentów przypisanych do sesji wykładowej identyfikowanej po id.

* **URL** /api/lectures/:id/student-list

* **Method:** `GET`
  
*  **URL Params**

   **Required:** `id=[string]`

* **Data Params** None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
        {
            "id": "1ad32b7a-0ce0-4542-b305-bb1d648776b0",
            "nick": "nickowicz",
            "name": "naomowicz",
            "surname": "surnamowciz"
        },
        {
            "id": "0af690ae-2fda-445c-aba4-88ef4319869b",
            "nick": "nickowicz",
            "name": "naomowicz",
            "surname": "surnamowciz"
        },
        {
            "id": "d45123f1-1808-4b7f-8cf5-ec6d23690caf",
            "nick": "nickowicz",
            "name": "naomowicz",
            "surname": "surnamowciz"
        }
    ]
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ msg : "Lecture Not Found" }`

**addStudentToLecture**
----
    Tworzy studenta z przesłanych w body danych i dodaje go do sesji wykładowej o podanym id.

* **URL** /api/lectures/:id/student-login

* **Method:** `POST`
  
*  **URL Params**

   **Required:** `id=[string]`

* **Data Params** 
    **Content:**
    ```json
    { 
        "nick": "nickowicz",
        "name": "naomowicz",
        "surname": "surnamowciz"
    }
    ```
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "msg": "Student connection successfull!"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ msg : "Lecture Not Found" }`
