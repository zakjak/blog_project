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