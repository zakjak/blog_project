import Comment from "../models/comment.model.js"
import { errorHandler } from "../utils/error.js"

export const createComment = async (req, res, next) => {
    const {comment, userId, postId} = req.body

    if(!comment || !postId || !userId || 
        comment === '' || postId === '' || userId === ''){
            return next(errorHandler(403, "Fields can't be empty."))
    }

    if(userId !== req.user.id){
        next(errorHandler(404, 'Not authorized to comment'))
    }


    try{
        const newComment = new Comment({
            comment,
            postId, 
            userId
        })

        await newComment.save()
        res.status(200).json(newComment)
    }catch(err){
        next(err)
    }
}

export const getPostComment = async (req, res, next) => {
    const { postId } = req.params


    try{
        const comments = await Comment.find({
            postId: postId
        }).sort({
            createdAt: -1
        })

        res.status(200).json(comments)
    }catch(err){
        next(err)
    }
}

export const getComments = async (req, res, next) => {
    const { startIndex, limit } = req.body

    try{
        const start = parseInt(startIndex) || 0
        const limits = parseInt(limit) || 9
        const sortDiection = req.query.sortDiection === 'desc' ? 1 : -1

        const comments = await Comment.find({
            postId: req.params.postId
        })
        .sort({
            createdAt: sortDiection
        })
        .skip(start)
        .limit(limits)

        const totalComments = await Comment.countDocuments({ postId: req.params.postId })
        
        res.status(200).json({
            totalComments, comments
        })



        
    }catch(err){
        next(err)
    }
}