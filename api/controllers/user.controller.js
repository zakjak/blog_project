import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"

export const signout = (req, res, next) => {
     
     res.clearCookie('token').status(200).json('You are signed out')
}

export const getUser = async(req, res, next) =>{
     const { userId } = req.params

     try{
          const user = await User.findById(userId)

          if(!user){
               next(errorHandler(404, 'User not found'))
          }

          const { password, ...rest } = user._doc
          res.status(200).json(rest)
     }catch(err){
          next(err)
     }
}