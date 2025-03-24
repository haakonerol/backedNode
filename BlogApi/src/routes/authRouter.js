"use strict";
/* -------------------------------------------------------
                 BLOG API Project 
------------------------------------------------------- */

const router = require('express').Router();
const {authController} = require('../controllers/authController')
/* ------------------------------------------------------------------ */
// URL: /auth -->

router.post('/login', authController.login)
router.get('/logout', authController.logout)

/* ------------------------------------------------------------------ */

module.exports = router;