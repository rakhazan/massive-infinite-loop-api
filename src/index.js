import express from 'express'
import dotenv from 'dotenv'
import routes from './api/index.js'

const app = express()
dotenv.config()

app.use('/api', routes)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))