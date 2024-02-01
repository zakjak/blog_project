export const signout = (req, res, next) => {
     
     res.clearCookie('token').status(200).json('You are signed out')
}