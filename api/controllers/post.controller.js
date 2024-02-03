import Post from "../models/post.model.js"

export const createPost = async (req, res, next) => {
    const { title, image, category, content } = req.body

    try{
        const post = new Post({
            title, 
            image,
            category, 
            content
        })

        await post.save()

        res.status(200).json('Post saved successfully')

    }catch(err){
        next(err)
    }
}

export const getPost = async (req, res, next) => {
    const { title, content, startIndex, order, searchTerm, category, postId, limit } = req.query

    console.log()

    const start = parseInt(startIndex) || 0
    const limits = parseInt(limit) || 9
    const sortDirection = order  === 'asc' ? 1 : -1
    try{
        const getPost = await  Post.find({
            ...(title && {title}),
            ...(category && {category}),
            ...(postId && {postId}),
            ...(searchTerm && {
                $or: [
                    {title: {$regex: title, $options: 'i'}},
                    {content: {$regex: content, $options: 'i'}}
                ]
            })
        }).sort({updatedAt: sortDirection}).skip(start).limit(limits)

        res.status(200).json(getPost)
    }catch(err){
        next(err)
    }
}