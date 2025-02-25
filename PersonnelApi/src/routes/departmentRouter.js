/* -----------------------------------------------------------
    EXPRESS - Personnel API
-------------------------------------------------------------- */
const department = require('../controllers/departmentController')
const router = require('express').Router()
/* ------------------------------------------------------------ */

// URL /departments -->
router.route('/')
    .get(department.list)
    .post(department.create);

router.route('/:id')
    .get(department.read)
    .put(department.update)
    .patch(department.update)
    .delete(department.delete);   
