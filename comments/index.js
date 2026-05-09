const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require("crypto");

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'commentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    }).catch((err) => {
        console.log('Error posting to event bus', err.message);
    });

    res.status(201).send(comments);
});

app.post("/events", (req, res) => {
    console.log("Event Received", req.body.type);
    const { type, data } = req.body;
    if (type === 'commentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId] || [];
        const comment = comments.find(comment => comment.id === id);
        if (comment) {
            comment.status = status;
            axios.post('http://localhost:4005/events', {
                type: 'commentUpdated',
                data: {
                    id: data.id,
                    postId: data.postId,
                    content: data.content,
                    status: data.status
                }
            }).catch((err) => {
                console.log('Error posting to event bus', err.message);
            });
        }
    }
    res.send({});
});

app.listen(4007, () => {
    console.log('Listening on port 4007');
});