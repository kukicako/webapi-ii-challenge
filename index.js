const express = require('express');

const router = require('./data/router')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`hi hi hi`)
});

server.use('/api/posts', router);

server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n');
});


