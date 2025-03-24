"use strict";
/* -----------------------------------------------------------
    EXPRESS - Personnel API
-------------------------------------------------------------- */

const Token = require('../models/tokenModel')

/*-------------------------------------------------------------- */
module.exports = async (req, res, next) => {

    req.user = null

    //Check Token:
    const auth = req.headers?.authorization || null
    const tokenKey = auth ? auth.split(' ') : null

    if(tokenKey && tokenKey[0]=='Token'){

        const tokenData = await Token.findOne({token: tokenKey[1]}).populate('userId')
        // console.log(tokenData);
        if(tokenData) req.user = tokenData.userId
    }
     //console.log(req.user);
    next()

}

/*-------------------------------------------------------------- */