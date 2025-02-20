"use strict";
/* -------------------------------------------------------
                 BLOG API Project 
------------------------------------------------------- */
const { BlogCategory, BlogPost} = require('../models/blogModel')
/* ------------------------------------------------------------------ */
// blogCategoryController:

module.exports.blogCategoryController = {

    list: async (req, res) => {

        // const data = await BlogCategory.find()
        const data = await res.getModelList(BlogCategory)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(BlogCategory),
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
/* ----------------------------------------------------------------------------------- *   
        // FILTERING:
        // URL?filter[fieldName1]=value1&filter[fieldname2]=value2
        const filter = req.query?.filter || {};
        // console.log(filter);  // output: { fieldName1: 'value1', fieldname2: 'value2' }

        
        // SEARCHING:
        // URL?search[fieldName1]=value1&search[fieldname2]=value2
        // http://127.0.0.1:8000/blog/post?search[title]=test 0&search[content]=test
        const search = req.query?.search || {};
        //console.log(search);  // output: { title: 'test 0', content: 'test' }
        
        // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
        for ( let key in search)
            search[key] = { $regex: search[key]}
        //console.log(search) // output: { title: { '$regex': 'test 0' }, content: { '$regex': 'test' } }

        
        // SORTING:
        // URL?sort[fieldName1]=asc&sort[fieldname2]=desc
        const sort = req.query?.sort || {}

        //PAGINATION:
        // URL?page=3&limit=20
        // let limit = req.query?.limit || 15 // to show data per page
        let limit = Number(req.query?.limit)
        limit = limit > 0 ? limit : Number((process.env?.PAGE_SIZE || 20))
        // console.log(limit, typeof limit);

        let page = Number(req.query?.page)
        page = page > 0 ? page : 1

        let skip = Number(req.query?.skip)
        skip = skip > 0 ? skip : ((page-1)*limit)


     /* ----------------------------------------------------------------------------------- */   
        // const data = await BlogPost.find({...filter},{...select})
        // const data = await BlogPost.find({},{ categoryId: true, title: 1, content: true}).populate('categoryId','name')
        // const data = await BlogPost.find().populate('categoryId','name')

        // const data = await BlogPost.find({...filter,...search}).sort(sort).skip(skip).limit(limit).populate('categoryId','name')

        const data = await res.getModelList(BlogPost, ["categoryId","name"])

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(BlogPost),
            result: data
        })

    },

    create: async (req, res) => {

        req.body.userId = req.user?._id

        req.body.content += ` - Author: ${req.user?.firstName} ${req.user?.lastName}` 

        const data = await BlogPost.create(req.body);

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