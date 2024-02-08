import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, password, email, profilePicture } = req.body

    if(!username || 
        !password || 
        !email || username === '' || 
        password === '' || 
        email === ''){
        next(errorHandler(403, "Fields can't be empty."))
    }


    const hashPassword = bcrypt.hashSync(password, 10)
        const newUser = new User({
            username,
            password: hashPassword, 
            email,
            profilePicture
        })

    try{
        const user = await newUser.save()
        res.status(200).json('Sign up successful')
    }catch(err){
        next(err)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body

    if(!email || !password){
        return next(errorHandler(403, "Fields can't be empty."))
    }

    try{
        const isValid = await User.findOne({email})
        if(!isValid){
            return next(errorHandler(403, "User does not exist."))
        }
        
        const comparePassword = bcrypt.compareSync(password, isValid.password)

        if(comparePassword){
            const {password, ...rest} = isValid._doc

            const token = jwt.sign({id: isValid._id, isAdmin: isValid.isAdmin}, process.env.JWT_SECRET)
            res.status(200).cookie('token', token, {
                httpOnly: true
            }).json(rest)
        }
    }catch(err){
        next(err)
    }
}

export const googleSign = async (req, res, next) => {
    const {username, profilePicture, email } = req.body

    if(!username || 
        !profilePicture || 
        !email || username === '' || 
        profilePicture === '' ||
        email === ''){
            return next(errorHandler(403, "Fields can't be empty"))
        }

        try{
            const isValid = await User.findOne({ email })

        if(isValid){
            const {password, ...rest} = isValid._doc

            const token = jwt.sign({ id: isValid._id, isAdmin: isValid.isAdmin }, process.env.JWT_SECRET)

            res.status(200).cookie('token', token, {
                httpOnly: true
            }).json(rest)

        }else{
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)

            const hashPassword = bcrypt.hashSync(generatePassword, 10)

            const newUser = new User({
                username,
                profilePicture,
                email, 
                password: hashPassword
            })

            const user = await newUser.save()

            const {password, ...rest} = user._doc

            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

            res.status(200).cookie('token', token, {
                httpOnly: true
            }).json(rest)

        } 

        }catch(err){
            next(err)
        }
}