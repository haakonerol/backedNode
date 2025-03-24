/* -----------------------------------------------------------
    EXPRESS - Personnel API
-------------------------------------------------------------- */
const token = require('../controllers/tokenController')
const router = require('express').Router()
const { isAdmin } = require('../middlewares/permissions')
/* ------------------------------------------------------------ *

// URL /tokens -->
router.route('/')
    .get(isAdmin,token.list)
    .post(isAdmin,token.create);

router.route('/:id')
    .get(isAdmin,token.read)
    .put(isAdmin,token.update)
    .patch(isAdmin,token.update)
    .delete(isAdmin,token.delete);   
/* ------------------------------------------------------------ */
// URL /tokens -->
router.use(isAdmin)
router.route('/')
    .get(token.list)
    .post(token.create);

router.route('/:id')
    .get(token.read)
    .put(token.update)
    .patch(token.update)
    .delete(token.delete); 
/* ------------------------------------------------------------ */
module.exports = router;    