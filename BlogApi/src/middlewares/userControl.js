"use strict";
/* -------------------------------------------------------
     BLOG API Project 
------------------------------------------------------- */
const {User} = require('../models/userModel')

/* ------------------------------------------------------------------ */
// Authentication middlevare to check user id and password in session

module.exports = async (req, res, next) => {

    req.user = null

    if(req?.session?._id){

         const user = await User.findOne({_id: req.session._id})

        if(user && user.password == req.session.password){

            req.user = user // going to use in blogController.blogPostController.create()

        }else{
            req.session = null
        }
    }

    next()

}


/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */