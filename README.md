



# Microservices Node.js Project

A simple event-driven microservices demo built with Node.js, Express, and React.

This project includes:
- A React client to create posts and comments
- Independent backend services for posts, comments, moderation, query, and event distribution
- Event-based communication through a central event bus

## Project Structure

- `client/` React frontend (Create React App)
- `posts/` Creates posts
- `comments/` Creates comments and handles moderation updates
- `moderation/` Moderates comment content
- `query/` Builds and serves aggregated post/comment view data
- `event-bus/` Broadcasts events to all services

## Service Ports

- `client` -> `3000`
- `posts` -> `4001`
- `query` -> `4002`
- `moderation` -> `4003`
- `event-bus` -> `4005`
- `comments` -> `4007`

## API Endpoints (Main)

### Posts Service (`4001`)
- `GET /posts`
- `POST /posts`
- `POST /events`

### Comments Service (`4007`)
- `GET /posts/:id/comments`
- `POST /posts/:id/comments`
- `POST /events`

### Query Service (`4002`)
- `GET /posts`
- `POST /events`

### Moderation Service (`4003`)
- `POST /events`

### Event Bus (`4005`)
- `POST /events`

## Event Flow

1. Client creates a post -> `posts` emits `postCreated` to `event-bus`
2. Client adds a comment -> `comments` emits `commentCreated` to `event-bus`
3. `moderation` receives `commentCreated`, sets status (`approved`/`rejected`), emits `commentModerated`
4. `comments` receives `commentModerated`, updates local comment status, emits `commentUpdated`
5. `query` consumes events and stores the aggregated read model used by the client

## Prerequisites

- Node.js 18+ (or current LTS)
- npm 9+

## Installation

Run `npm install` in each service folder and in the client folder:

```bash
cd posts && npm install
cd ../comments && npm install
cd ../moderation && npm install
cd ../query && npm install
cd ../event-bus && npm install
cd ../client && npm install
```

## Running the Project

Start each service in a separate terminal.

### Terminal 1

```bash
cd event-bus
npm start
```

### Terminal 2

```bash
cd posts
npm start
```

### Terminal 3

```bash
cd comments
npm start
```

### Terminal 4

```bash
cd moderation
npm start
```

### Terminal 5

```bash
cd query
npm start
```

### Terminal 6

```bash
cd client
npm start
```

Then open `http://localhost:3000` in your browser.

## Quick Test

1. Create a post from the UI.
2. Add comments to the post.
3. Add a comment containing the word `orange` to trigger rejection in moderation logic.
4. Refresh and verify comments still load via the `query` service.

## Notes

- Data is stored in-memory in each service. Restarting a service clears its local state.
- Event fan-out currently uses hardcoded localhost endpoints in `event-bus/index.js`.








# optimistic lock
const prd = await prods.findOne({id: sjdskgjds})
if qty < 1 throw err
5 - 1=> qty 4
update prd qty to 4

prd.findOneAndUpdate({id: sjdskgjds}, {$set: {qty: 4}})
prd.findOneAndUpdate({id: sjdskgjds}, {$inc: -sentQty})
const result = await prd.findOneAndUpdate({id: sjdskgjds, qty: {$gte: sentQty}}, {$inc: -sentQty})
if(!result){
    throw err quantity is not sufficient
}







# pessimestic lock
start trx
get product for update 
check if qty is enough
update qty to be -1
commit





const mznAcc = findone(id: 1)
const aliAcc = findone(id: 2)

mznAcc.balance >= 200, else throw err
update mazen to be balance - 200 where balance >= 200
if(no update) throw error
update ali to balance + 200





get random task where task is not started
task (id: 42)

update task where id=42 and status = not started set status= in progress










start trx
insert post 

await publish event
publish event

commit