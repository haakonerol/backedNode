"use strict";
/* -----------------------------------------------------------
    EXPRESS - Personnel API
-------------------------------------------------------------- */

module.exports = function (err, req, res, next) {

  console.log('errorHandler initiated.');
  
  return res.status(res?.errorStatusCode || 500).send({
    error: true,
    message: err.message,
    cause: err.cause,
    body: req.body,
  });
};
