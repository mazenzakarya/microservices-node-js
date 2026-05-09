const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});


app.post('/events', (req, res) => {
    if (req.body.type === 'postCreated') {
        const { id, title } = req.body.data;
        const { type, data } = req.body;
        posts[id] = { id, title, comments: [] };
    }
    if (req.body.type === 'commentCreated') {
        const { id, content, postId } = req.body.data;
        const post = posts[postId];
        if (post) {
            post.comments.push({ id, content });
        }
    }
    if (req.body.type === 'commentUpdated') {
        const { id, content, postId, status } = req.body.data;
        const post = posts[postId];
        if (post) {
            const comment = post.comments.find(comment => comment.id === id);
            if (comment) {
                comment.content = content;
                comment.status = status;
            }
        }
    }
    res.send({});
});

app.listen(4002, () => {
    console.log('Listening on port 4002');
});
