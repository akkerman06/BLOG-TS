import express from 'express'
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoute from "./routes/authRoute.js";
import articleRoute from "./routes/articleRoute.js";

dotenv.config()

const app = express()


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoute)
app.use('/api', articleRoute)

const URL = process.env.URL
mongoose.connect(URL)
    .then(() => console.log('Подключены к БД...'))
    .catch((err) => console.log(err))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Серевер запущен на порте ${PORT}...`)
})