"use strict"
/* -----------------------------------------------------------
    EXPRESS - Personnel API
-------------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/
/* ------------------------------------------------------------ */

const express = require('express')
const app = express()

require('dotenv').config()
require('express-async-errors')

const PORT = process.env?.PORT || 8000
const HOST = process.env?.HOST || 'http://127.0.0.1'

const { dbConnection, mongoose } = require('./src/config/dbConnection')
/* ------------------------------------------------------------ */

app.use('/departments', require('./src/routes/departmentRouter'))

/* ------------------------------------------------------------ */
dbConnection()
/* ------------------------------------------------------------ */
app.use(require('./src/middlewares/errorHandler'))
/* ------------------------------------------------------------ */
app.listen(PORT, () => console.log(`Running: ${HOST}: ${PORT}`))
/* ------------------------------------------------------------ */