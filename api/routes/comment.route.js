import express from 'express'
import { createComment, getComments, getPostComment } from '../controllers/comment.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/create', verifyToken,createComment)
router.get('/getComment/:postId', verifyToken, getPostComment)


router.get('/getComments/:postId', getComments)

export default router