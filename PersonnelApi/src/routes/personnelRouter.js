/* -----------------------------------------------------------
    EXPRESS - Personnel API
-------------------------------------------------------------- */
const personnel = require('../controllers/personnelController')
const router = require('express').Router()
/* ------------------------------------------------------------ */

// URL /personnels -->
router.route('/')
    .get(personnel.list)
    .post(personnel.create);

router.route('/:id')
    .get(personnel.read)
    .put(personnel.update)
    .patch(personnel.update)
    .delete(personnel.delete);   

module.exports = router;    