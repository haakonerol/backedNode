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

dbConnection()
app.use(express.json())

app.use(require('./src/middlewares/filterSortSearchPage'))
/* ------------------------------------------------------------ */

app.use('/departments', require('./src/routes/departmentRouter'))
app.use('/personnels', require('./src/routes/personnelRouter'))

/* ------------------------------------------------------------ */

/* ------------------------------------------------------------ */
app.use(require('./src/middlewares/errorHandler'))
/* ------------------------------------------------------------ */
app.listen(PORT, () => console.log(`Running: ${HOST}: ${PORT}`))
/* ------------------------------------------------------------ */

// sync: 
//! Run one time only
// const sync = require('./src/helpers/sync')
// sync()
/* ------------------------------------------------------------ */