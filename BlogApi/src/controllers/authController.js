"use strict";
/* -------------------------------------------------------
                 BLOG API Project 
------------------------------------------------------- */
const { User} = require('../models/userModel')
const passwordEncrypt = require('../helpers/passwordEncrypt')
/* ------------------------------------------------------------------ */

module.exports.authController = {

    login: async (req, res) => {

        const { email, password } = req.body;

        if(email && password){

            // const user = await User.findOne({email: email})
            const user = await User.findOne({email})

            if(user){
                if(user.password == passwordEncrypt(password)){

                    // session:
                   req.session = {
                    _id: user._id,
                    password: user.password
                   } 
                   // cookie: 
                   if(req.body?.remindMe == true){
                    req.session.remindMe = true
                    req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3
                   }
                   res.status(200).send({
                    error: false,
                    message: 'Login: OK',
                    user //* this user is from line:18
                   })

                }else{
                    res.errorStatusCode = 401
                    throw new Error('Password parameters are not true.')
                }
            }else{
                res.errorStatusCode = 401
                throw new Error('This user not found.')
            }

        }else{
            res.errorStatusCode = 401
            throw new Error('Email and password are required.')
        }

    },

    logout: async (req, res) => {

        // To delete session and cookie data --> null
        req.session = null

        res.status(200).send({
            error: false,
            message: 'Logout: OK'
        })

    }
}


/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
