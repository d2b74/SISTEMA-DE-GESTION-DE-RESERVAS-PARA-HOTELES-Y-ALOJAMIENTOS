import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connection from './db.js';
//import { router } from './routes/index.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());//para que no haya conflicto con el front
app.use(express.json());//para que se pueda recibir datos en formato json

app.get('/test', async (req, res) => {
  try {
    const [result] = await connection.query('SELECT 1');
    res.send('Conexión a la base de datos exitosa: ' + JSON.stringify(result));
  } catch (error) {
    res.status(500).send('Error de conexión: ' + error.message);
  }
});

app.listen(port,()=>{
    console.log(`Servidor escuchando en el puerto ${port}`)
})

