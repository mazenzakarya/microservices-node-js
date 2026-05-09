const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/events', (req,res) => {
    const event = req.body;
    axios.post('http://localhost:4007/events', event).catch((err) => {
        console.log('Error posting to 4007', err.message);
    });
    axios.post('http://localhost:4001/events', event).catch((err) => {
        console.log('Error posting to 4001', err.message);
    });
    axios.post('http://localhost:4002/events', event).catch((err) => {
        console.log('Error posting to 4002', err.message);
    });
    axios.post('http://localhost:4003/events', event).catch((err) => {
        console.log('Error posting to 4003', err.message);
    });
    res.send({ status: 'OK' });
})

app.listen(4005, () => {
    console.log('Listening on port 4005');
});