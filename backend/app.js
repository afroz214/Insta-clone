import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoute from './router/user.js'
import postRoute from './router/post.js'
import path from 'path'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(morgan('dev'))

app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    console.log('development')
  }

const PORT = process.env.PORT || 7000

app.listen(PORT, console.log(`Listening at ${PORT}`))