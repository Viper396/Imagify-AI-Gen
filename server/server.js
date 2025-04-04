import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRoutes from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
const port = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use(cors())
await connectDB()

app.use('/api/user', userRoutes)
app.use('/api/image', imageRouter)
app.get('/', (req, res) => {
  res.send('API Working')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
