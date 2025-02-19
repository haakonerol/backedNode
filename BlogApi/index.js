"use strict";
/* -------------------------------------------------------
     BLOG API Project 
------------------------------------------------------- */
const express = require('express')
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 8000

/* ------------------------------------------------------------------ */

app.use(express.json()) // accept JSON
require('./src/dbConnection')() // db connection

require('express-async-errors')

/* ------------------------------------------------------------------ */
// SessionCookies:
// http://expressjs.com/en/resources/middleware/cookie-session.html
// https://www.npmjs.com/package/cookie-session
//* $ npm i cookie-session

const session = require('cookie-session') // --> middleware

app.use(session({
    secret: process.env.SECRET_KEY, // to encrypt data
    // maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days -- we dont want to use this pga. session and cookie useage.
}))
/* ------------------------------------------------------------------ */

app.all('/', (req, res) => {
    res.send({
        session: req.session,
        message: 'Welcome to Blog API',
    })
})
/* ------------------------------------------------------------------ */
// Routes:
app.use('/auth', require('./src/routes/authRouter'))
app.use('/users', require('./src/routes/userRouter'))
app.use('/blog', require('./src/routes/blogRouter'))

/* ------------------------------------------------------------------ */
app.use(require('./src/errorHandler'))

app.listen(PORT, () => console.log('Running: http://127.0.0.1:'+ PORT))