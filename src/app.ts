import express from 'express'
import path from 'path'
import cors from 'cors'
import ItemRouter from './api/routes/ItemRouter'
import PointRouter from './api/routes/PointRouter'
import { errors } from 'celebrate'

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(ItemRouter)
app.use(PointRouter)

app.use(errors())

export default app
