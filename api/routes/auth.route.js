import express from 'express'
import { googleSign, signin, signup } from '../controllers/auth.controller.js'
import { signout } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.post('/google', googleSign)

export default router