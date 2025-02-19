"use strict";
/* -------------------------------------------------------
                 BLOG API Project 
------------------------------------------------------- */

const router = require('express').Router();
const {userController} = require('../controllers/userController')
/* ------------------------------------------------------------------ */
// URL: /users -->

router.route('/')
    .get(userController.list)
    .post(userController.create);

router.route('/:userId') 
    .get(userController.read)
    .put(userController.update)
    .patch(userController.update)
    .delete(userController.delete)


/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */

module.exports = router;