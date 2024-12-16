sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes a note and clicks "Save"

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP 201 Created (or similar response)
    deactivate server

    Note right of browser: The browser updates the UI to display the new note

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, { "content": "New SPA note", "date": "2024-12-15" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function to render the updated list of notes
