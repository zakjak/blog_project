import express from 'express'
import { createPost, getPost } from '../controllers/post.controller.js'

const router = express.Router()

router.post('/create', createPost)
router.post('/getPost', getPost)

export default router