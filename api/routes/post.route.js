import express from 'express'
import { createPost, getPost, postViews } from '../controllers/post.controller.js'

const router = express.Router()

router.post('/create', createPost)
router.get('/getPost', getPost)
router.post('/views/:postId/view', postViews)

export default router