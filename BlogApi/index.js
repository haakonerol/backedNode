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

app.all('/', (req, res) => {
    res.send('Welcome to Blog API')
})
/* ------------------------------------------------------------------ */
// Routes:
app.use('/blog', require('./src/routes/blogRouter'))

/* ------------------------------------------------------------------ */
app.use(require('./src/errorHandler'))

app.listen(PORT, () => console.log('Running: http://127.0.0.1:'+ PORT))