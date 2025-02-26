/* -----------------------------------------------------------
    EXPRESS - Personnel API
-------------------------------------------------------------- */
const token = require('../controllers/tokenController')
const router = require('express').Router()
/* ------------------------------------------------------------ */

// URL /tokens -->
router.route('/')
    .get(token.list)
    .post(token.create);

router.route('/:id')
    .get(token.read)
    .put(token.update)
    .patch(token.update)
    .delete(token.delete);   

module.exports = router;    