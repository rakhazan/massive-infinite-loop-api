import express from 'express'
// import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './api/index.js'

const app = express()
dotenv.config()

app.use(cors({ credentials: true, origin: process.env.FE_URL }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api', routes)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))