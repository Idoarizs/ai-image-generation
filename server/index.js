import * as dotenv from 'dotenv'
import express from 'express'
import dalleRoutes from './routes/dalleRoutes.js'
import cors from 'cors'

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use('/api/v1/dalle', dalleRoutes)

app.listen(port, () => console.log(`Server running on port ${port}`))