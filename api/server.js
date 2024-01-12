require('dotenv').config();

const express = require('express');


const server = express()

server.use(express.json())


server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({ message })
})



module.exports = server