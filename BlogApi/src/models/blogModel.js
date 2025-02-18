"use strict";
/* -------------------------------------------------------
                 BLOG API Project 
------------------------------------------------------- */
const mongoose = require('mongoose')

const BlogCategorySchema = new mongoose.Schema({

    // _id: Number -> Primary Key, no need for definition. Generates automatically.

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }

},{
    collection: 'blogCategories',
    timestamps: true // Generates createdAt, updatedAt fields automatically.
});
const BlogCategory = mongoose.model('BlogCategory', BlogCategorySchema);

/* ------------------------------------------------------------------ */

const BlogPostSchema = new mongoose.Schema({

    categoryId: {
        type: mongoose.Schema.Types.ObjectId, // Hexadecimal format: 'fedcba9876543210'
        ref: 'BlogCategory',
        required: true,
        // unique: true  // to make 1:1 relation.
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    content: {
        type: String,
        trim:true,
        required: true
    }
}, {
    collection: 'blogPosts',
    timestamps: true

});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
/* ------------------------------------------------------------------ */

module.exports = { BlogCategory, BlogPost}






