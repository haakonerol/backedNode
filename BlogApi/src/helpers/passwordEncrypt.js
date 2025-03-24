"use strict";
/* -------------------------------------------------------
                 BLOG API Project 
------------------------------------------------------- */
// https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest

const crypto = require('node:crypto')
// Required params:
const keyCode = process.env.SECRET_KEY
const loopCount = 10_000
const charCount = 32
const encType = 'sha512'


const passwordEncrypt = function (password){

    return crypto.pbkdf2Sync(password, keyCode, loopCount, charCount, encType ).toString('hex')
};
/* ------------------------------------------------------------------ */

module.exports = passwordEncrypt;