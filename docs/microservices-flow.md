# Microservices Flow Diagram

```mermaid
flowchart LR
    UI[Client UI\nReact :3000]

    POSTS[Posts Service\n:4001]
    COMMENTS[Comments Service\n:4007]
    MOD[Moderation Service\n:4003]
    QUERY[Query Service\n:4002]
    BUS[Event Bus\n:4005]

    UI -->|Create post\nPOST /posts| POSTS
    UI -->|Create comment\nPOST /posts/:id/comments| COMMENTS
    UI -->|Read posts + comments\nGET /posts| QUERY

    POSTS -->|Emit postCreated| BUS
    COMMENTS -->|Emit commentCreated| BUS
    MOD -->|Emit commentModerated| BUS
    COMMENTS -->|Emit commentUpdated| BUS

    BUS -->|POST /events\npostCreated| QUERY
    BUS -->|POST /events\npostCreated| POSTS

    BUS -->|POST /events\ncommentCreated| MOD
    BUS -->|POST /events\ncommentCreated| QUERY
    BUS -->|POST /events\ncommentCreated| COMMENTS

    BUS -->|POST /events\ncommentModerated| COMMENTS

    BUS -->|POST /events\ncommentUpdated| QUERY

    subgraph Note[Moderation Rule]
        RULE[If content contains "orange" => rejected\nElse => approved]
    end
    MOD --- RULE
```

## How to Read It

- Solid request arrows from the client show direct API calls.
- Event arrows through the Event Bus show asynchronous communication.
- The Query service keeps the aggregated read model used by the client.
