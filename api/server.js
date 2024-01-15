require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usersRouter = require('./users/users-router')
const passwordRouter = require('./passwords/passwords-router')

const server = express()

server.use(cors());
server.use(express.json())

server.use('/api/users', usersRouter)
server.use('/api/passwords', passwordRouter)


server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({ message })
})



module.exports = server