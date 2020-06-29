import express from 'express'
import path from 'path'
import cors from 'cors'
import ItemRouter from './routes/ItemRouter'
import PointRouter from './routes/PointRouter'
import { errors } from 'celebrate'

const app = express()

app.use(cors())
app.use(express.json())

app.use(ItemRouter)
app.use(PointRouter)

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(errors())

export default app
