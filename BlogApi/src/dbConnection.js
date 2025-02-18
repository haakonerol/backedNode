"use strict";
/* -------------------------------------------------------
  BLOG API Project with Mongoose
------------------------------------------------------- */
// Mongoose ODM
// $ npm i mongoose

const mongoose = require('mongoose');

const dbConnection = () => {

    mongoose.connect(process.env?.MONGODB || 'mongodb://localhost:27017/blogAPI')
        .then(() => console.log('* DB Connected *'))
        .catch(() => console.log('* DB NOT Connected *'));
};

module.exports = dbConnection;