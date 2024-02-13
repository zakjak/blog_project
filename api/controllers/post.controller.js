import Post from "../models/post.model.js"
import { errorHandler } from "../utils/error.js"

export const createPost = async (req, res, next) => {
    const { title, image, category, content, author } = req.body

    try{
        const post = new Post({
            title,
            author,
            image,
            category, 
            content,
            author
        })

        await post.save()

        res.status(200).json('Post saved successfully')

    }catch(err){
        next(err)
    }
}

export const getPost = async (req, res, next) => {
    const { title, content, startIndex, order, searchTerm, category, postId, limit } = req.query

    const start = parseInt(startIndex) || 0
    const limits = parseInt(limit) || 9
    const sortDirection = order  === 'asc' ? 1 : -1
    try{
        const allPost = []
            if(!category){
                const getPost = await  Post.find({
                    ...(title && {title}),
                    ...(postId && {_id: postId}),
                    ...(searchTerm && {
                        $or: [
                            {title: {$regex: title, $options: 'i'}},
                            {content: {$regex: content, $options: 'i'}}
                        ]
                    })
                }).sort({updatedAt: sortDirection}).skip(start).limit(limits)

                allPost.push(...getPost)
                
                res.status(200).json(allPost)

            }else{

                if(Array.isArray(category)){
                    let categories = []
                    for(let i = 0; i < category.length; i++){
                        const response = await Post.find({
                            category: category[i]
                        }).sort({updatedAt: sortDirection}).skip(start).limit(limits)
                        
                        categories.push(...response)
                    }

                    res.status(200).json(categories)
                }else{
                        const response = await Post.find({
                            category
                        }).sort({updatedAt: sortDirection}).skip(start).limit(limits)
                        

                    res.status(200).json(response)
                }

            }

        }catch(err){
            next(err)
        }
}

export const postViews = async (req, res, next) => {
    const { postId } = req.params

    if(!postId || postId === '' || postId === undefined){
        return
    }
    try{
        const post = await Post.findByIdAndUpdate(postId, {$inc: {views: 1} })

        res.status(200).json({ message: 'success' })
    }catch(err){
        next(err)
    }
}