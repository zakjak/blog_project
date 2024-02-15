import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import userRoutes from './routes/user.route.js'
import mongoose from 'mongoose'
import path from 'path'

const app = express()

const __dirname = path.resolve()

// Middlewares
dotenv.config()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json({
    limit: '50mb'
}))
app.use(bodyParser.urlencoded({
    extended: true,
}))
app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/user', userRoutes)


// Database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Database connected')
})

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
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