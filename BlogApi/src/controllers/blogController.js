"use strict";
/* -------------------------------------------------------
                 BLOG API Project 
------------------------------------------------------- */
const { BlogCategory, BlogPost} = require('../models/blogModel')
/* ------------------------------------------------------------------ */
// blogCategoryController:

module.exports.blogCategoryController = {

    list: async (req, res) => {

        const data = await BlogCategory.find()

        res.status(200).send({
            error: false,
            result: data
        })

    },

    create: async (req, res) => {

        const data = await BlogCategory.create(req.body);
        console.log(data);

        res.status(201).send({
            error: false,
            result: data

        })
    },

    read: async (req, res) => {

        // const categoryId = req.params.categoryId;
        // const data = await BlogCategory.findOne({_id: categoryId});
        const data = await BlogCategory.findOne({_id: req.params.categoryId});

        res.status(200).send({
            error: false,
            result: data
        })
    },

    update: async (req, res) => {

        // const data = await BlogCategory.updateOne({...filter}, {...data})
        const data = await BlogCategory.updateOne({_id: req.params.categoryId}, req.body)

        res.status(202).send({
            error: false,
            result: data,
            new: await BlogCategory.findOne({_id: req.params.categoryId})
        })
    },

    delete: async (req, res) => {

        const data = await BlogCategory.deleteOne({_id: req.params.categoryId})

        // console.log(data);
        // res.status(204).send({
        //     error: false,
        //     result: data
        // })
        if(data.deletedCount){

            res.sendStatus(204)
        }else{

            res.errorStatusCode = 404
            throw new Error(' Not Found. ')
        }
    }
}

/* ------------------------------------------------------------------ */
// blogPostController:

module.exports.blogPostController = {

    list: async (req, res) => {

        // const data = await BlogPost.find({...filter},{...select})
        const data = await BlogPost.find({},{ categoryId: true, title: 1, content: true}).populate('categoryId','name')

        res.status(200).send({
            error: false,
            result: data
        })

    },

    create: async (req, res) => {

        const data = await BlogPost.create(req.body);
        console.log(data);

        res.status(201).send({
            error: false,
            result: data

        })
    },

    read: async (req, res) => {

        // const categoryId = req.params.categoryId;
        // const data = await BlogPost.findOne({_id: postId});
        const data = await BlogPost.findOne({_id: req.params.postId}).populate('categoryId');

        res.status(200).send({
            error: false,
            result: data
        })
    },

    update: async (req, res) => {

        // const data = await BlogPost.updateOne({...filter}, {...data})
        const data = await BlogPost.updateOne({_id: req.params.postId}, req.body)

        res.status(202).send({
            error: false,
            result: data,
            new: await BlogPost.findOne({_id: req.params.postId})
        })
    },

    delete: async (req, res) => {

        const data = await BlogPost.deleteOne({_id: req.params.postId})

        // console.log(data);
        // res.status(204).send({
        //     error: false,
        //     result: data
        // })
        if(data.deletedCount){

            res.sendStatus(204)
        }else{

            res.errorStatusCode = 404
            throw new Error(' Not Found. ')
        }
    }


}


/* ------------------------------------------------------------------ */