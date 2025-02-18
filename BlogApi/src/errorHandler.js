"use strict";
/* -------------------------------------------------------
     BLOG API Project 
------------------------------------------------------- */

module.exports = (err,req,res,next) => {
    const errorStatusCode = res.errorStatusCode ?? 500
    console.log('errorHandler initiated.')
    res.status(errorStatusCode).send({
        error: true,
        message: err.message,
        cause: err.cause
    })
}