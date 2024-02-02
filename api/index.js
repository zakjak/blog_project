import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import mongoose from 'mongoose'

const app = express()

// Middlewares
dotenv.config()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)


// Database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Database connected')
})


app.listen(3000, () => {
    console.log('Server running on port 3000')
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})