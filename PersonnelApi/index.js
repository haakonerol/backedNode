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

// JSON visualization
app.use('/documents/json', (req, res)=>{
  res.sendFile('swagger.json', {root:'.'})
})
// Swagger visualization:
const swaggerUi = require('swagger-ui-express')
const swaggerJson = require('./swagger.json')
app.use('/documents/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson, {swaggerOptions: { persistAuthorization: true }}))

// Redoc visualization:
const redoc = require('redoc-express')
app.use('/documents/redoc', redoc({specUrl:'/documents/json', title: 'Redoc UI'}))
/* ------------------------------------------------------------ */
app.use(require('./src/middlewares/logger'))
app.use(require('./src/middlewares/authentication'))
app.use(require('./src/middlewares/filterSortSearchPage'))
/* ------------------------------------------------------------ */
app.all("/", (req, res) => {
    res.send({
      error: false,
      message: "Welcome to PERSONNEL API",
      // session: req.session,
      // isLogin: req.isLogin,
      user: req.user
    });
  });

app.use('/auth', require('./src/routes/authRouter'))
app.use('/tokens', require('./src/routes/tokenRouter'))
app.use('/departments', require('./src/routes/departmentRouter'))
app.use('/personnels', require('./src/routes/personnelRouter'))

/* ------------------------------------------------------------ */

/* ------------------------------------------------------------ */
app.use(require('./src/middlewares/errorHandler'))
/* ------------------------------------------------------------ */
app.listen(PORT, () => console.log(`Running: ${HOST}: ${PORT}`))
/* ------------------------------------------------------------ *

// sync: 
//! Run one time only
 const sync = require('./src/helpers/sync')
// sync()
/* ------------------------------------------------------------ */