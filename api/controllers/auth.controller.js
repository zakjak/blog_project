import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from 'bcryptjs'

export const signup = async (req, res, next) => {
    const { username, password, email, profilePicture } = req.body

    if(!username || !password || !email){
        return next(errorHandler(403, "Fields can't be empty."))
    }

    if(password.length < 6){
        return next(errorHandler(403, "Password should be at least 6 characters"))
    }

    try{
        const hashPassword = bcrypt.hashSync(password, 10)
        const newUser = new User({
            username,
            password: hashPassword, 
            email,
            profilePicture
        })
        await newUser.save()

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
            
            res.status(200).json(rest)
        }
    }catch(err){
        next(err)
    }
}