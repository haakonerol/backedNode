"use strict";
/* -------------------------------------------------------
                 BLOG API Project 
------------------------------------------------------- */

const router = require('express').Router();
const {blogCategoryController, blogPostController} = require('../controllers/blogController')
/* ------------------------------------------------------------------ */
// URL: /blog -->

// BlogCategory
router.route('/category')
    .get(blogCategoryController.list)
    .post( blogCategoryController.create);

router.route('/category/:categoryId') 
    .get(blogCategoryController.read)
    .put(blogCategoryController.update)
    .patch(blogCategoryController.update)
    .delete(blogCategoryController.delete)

//BlogPost:
router.route('/post')
    .get(blogPostController.list)
    .post( blogPostController.create);

router.route('/post/:postId') 
    .get(blogPostController.read)
    .put(blogPostController.update)
    .patch(blogPostController.update)
    .delete(blogPostController.delete)    


/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
module.exports = router;