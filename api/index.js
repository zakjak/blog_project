import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.route.js'
import mongoose from 'mongoose'

const app = express()

// Middlewares
dotenv.config()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes)


// Database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Database connected')
})


app.listen(3000, () => {
    console.log('Server running on port 3000')
})

app.use((err, req, res) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})