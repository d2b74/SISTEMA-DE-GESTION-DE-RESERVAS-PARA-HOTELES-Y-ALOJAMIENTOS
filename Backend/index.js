import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
//import { router } from './routes/index.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());//para que no haya conflicto con el front
app.use(express.json());//para que se pueda recibir datos en formato json

app.listen(port,()=>{
    console.log(`Servidor escuchando en el puerto ${port}`)
})