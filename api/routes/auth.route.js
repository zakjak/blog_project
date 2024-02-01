import express from 'express'
import { signin, signup } from '../controllers/auth.controller.js'
import { errorHandler } from '../utils/error.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)

export default router