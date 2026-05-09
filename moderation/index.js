const express = require('express');
const axios = require('axios');
// const cors = require('cors');

const app = express();
app.use(express.json());
// app.use(cors());

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    if (type === 'commentCreated') {
        if(data.content.includes("orange")) {
            data.status = 'rejected';
        } else {
            data.status = 'approved';
        }
        axios.post('http://localhost:4005/events', {
            id: data.id,
            postId: data.postId,
            type: 'commentModerated',
            data,
            status: data.status
        }).catch((err) => {
            console.log('Error posting to event bus', err.message);
        });
}
    res.send({});
});

app.listen(4003, () => {
    console.log('Listening on port 4003');
});