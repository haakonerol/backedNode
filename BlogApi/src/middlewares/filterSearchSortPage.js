/* -------------------------------------------------------
                 BLOG API Project 
------------------------------------------------------- */

// QUERY HANDLER MIDDLEWARE:

module.exports = async (req, res, next) => {

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


        
        // const data = await BlogPost.find({...filter},{...select})
        // const data = await BlogPost.find({},{ categoryId: true, title: 1, content: true}).populate('categoryId','name')
        // const data = await BlogPost.find().populate('categoryId','name')

        res.getModelList = async function(Model,populate = []) {
            
           return await Model.find({...filter,...search}).sort(sort).skip(skip).limit(limit).populate(...populate)

        }

        res.getModelListDetails = async function (Model) {

            const data = await Model.find({...filter,...search})

            let details = {
                filter,
                search,
                sort,
                skip,
                limit,
                page,
                pages: {
                    previous: (page > 1 ? page-1 : false),
                    current: page,
                    next: page+1,
                    total: Math.ceil(data.length/limit)
                },
                totalRecords: data.length
            }

            details.pages.next = (details.pages.next > details.pages.total ? false : details.pages.next);

            if(details.totalRecords <= limit) details.pages = false;
            if(details.page > details.pages.total) details.page = details.pages.total

            return details;
            
        }

        next()
};
/* ------------------------------------------------------------------ */