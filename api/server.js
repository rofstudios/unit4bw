const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

let authRouter = require('./auth/auth-router');
let usersRouter = require('./users/users-router');
let ownersRouter = require('./owners/owners-router');
let restricted = require('./auth/restricted-middleware');


// const db = require('./data/db-config')

// function getAllUsers() { return db('users') }

// async function insertUser(user) {
//   // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
//   // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
//   // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
//   const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
//   return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
// }

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())



// server.get('/api/users', async (req, res) => {
//   res.json(await getAllUsers())
// })

// server.post('/api/users', async (req, res) => {
//   res.status(201).json(await insertUser(req.body))
// })

server.use('/api/auth', authRouter);
server.use('/api/owners', restricted, ownersRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h1> Welcome to African Marketplace API </h1>`)
})

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server
