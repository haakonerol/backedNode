"use strict";
/* -----------------------------------------------------------
    EXPRESS - Personnel API
-------------------------------------------------------------- */


/*-------------------------------------------------------------------- */

module.exports = {

    isLogin: (req, res, next) => {

        if(req.user && req.user.isActive){
            next()
        }else{
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must logged in.')
        }

    },

    isAdmin: (req, res, next) => {

        if(req.user && req.user.isActive && req.user.isAdmin){
            next()
        }else{
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must logged in and to be admin.')
        }
    },

    isAdminOrLead: (req, res, next) => {

        const departmentId = req.params?.id

        if(req.user && req.user.isActive && (req.user.isAdmin || (req.user.isLead && req.user.departmentId == departmentId))){
            next()
        }else{
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must logged in and to be admin or own department lead.')
        }
    }
}