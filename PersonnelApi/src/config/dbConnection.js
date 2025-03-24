"use strict"
/* -----------------------------------------------------------
    EXPRESS - Personnel API
-------------------------------------------------------------- */
const mongoose = require('mongoose')

const dbConnection = function(){

    mongoose.connect(process.env.MONGODB)
        .then(() => console.log('* DB connected * '))
        .catch((err) => console.log(' * DB Not Connected *', err))
}
/* ------------------------------------------------------------ */

module.exports = {
    mongoose,
    dbConnection
}