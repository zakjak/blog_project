import express from 'express'
import { signin, signup } from '../controllers/auth.controller.js'
import { signout } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)

export default router