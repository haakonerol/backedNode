"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
-------------------------------------------------------------- */
/*
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ nodemon
*/
const express = require('express')
const app = express()
/* ------------------------------------------------------------ */
// Required modules:
require('dotenv').config()
const PORT = process.evn?.PORT || 8000

require('express-async-errors')

/* ------------------------------------------------------------ */
// Connect to DB:
const {dbConnection} = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------------ */
// middlewares:
app.use(express.json());

app.use(require('./src/middlewares/logger'))

app.use(require('./src/middlewares/queryHandler'))

/* ------------------------------------------------------------ */
// Ruotes: 



/* ------------------------------------------------------------ */
// errorHandler:
app.use(require('./src/middlewares/errorHandler'))
/* ------------------------------------------------------------ */
// Run server:
app.listen(PORT, () => console.log('Running: http://127.0.0.1:'+PORT))