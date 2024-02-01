import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

// Middlewares
dotenv.config()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Routes
app.use('/api/user', )



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