"use strict";
/* -----------------------------------------------------------
    EXPRESS - Personnel API
-------------------------------------------------------------- */

const Personnel = require('../models/personnelModel')
const Token = require('../models/tokenModel')
const passwordEncrypt = require('../helpers/passwordEncrypt')

/*-------------------------------------------------------------- */

module.exports = {

    login: async (req, res) => {
        
        const {userName, password} = req.body;
        if(userName && password){

            const user = await Personnel.findOne({userName})

            if(user && user.password == passwordEncrypt(password)){

                if(user.isActive){

                    let tokenData = await Token.findOne({userId: user._id})
                    if(!tokenData){
                        tokenData = await Token.create({
                            userId: user._id,
                            token: passwordEncrypt(user._id+Date.now())
                        })
                    }
                    res.status(200).send({
                        error: false,
                        token: tokenData.token,
                        user
                    })
                    

                }else{
                    res.errorStatusCode = 401
                    throw new Error('This user is not active.')
                }

            }else{
                res.errorStatusCode = 401
                throw new Error('Wrong username or password.')
            }


        }else{
            res.errorStatusCode = 401
            throw new Error('Please enter username and password.')
        };

        
    },

    logout: async (req, res) => {

        // if(req.user){
        //     const data = await Token.deleteOne({userId: req.user._id})
        // }
        const data = req.user ? await Token.deleteOne({userId: req.user._id}) : null

        res.status(200).send({
            error: false,
            message: 'Logout: OK',
            data
        })

    },
}