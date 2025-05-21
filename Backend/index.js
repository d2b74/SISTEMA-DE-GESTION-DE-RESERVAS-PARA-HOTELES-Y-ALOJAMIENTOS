//Archivo principal del servidor
//Este archivo se encarga de inicializar el servidor y las rutas
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
//import connection from './db.js';
import router from './Routes/indexRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({origin:process.env.FRONT_URL, credentials: true}));//para que no haya conflicto con el front
app.use(express.json());//para que se pueda recibir datos en formato json

/* app.get('/test', async (req, res) => {//funcion para comprobar la conexion a la bd
  try {
    const [result] = await connection.query('SELECT 1');
    res.send('Conexión a la base de datos exitosa: ' + JSON.stringify(result));
  } catch (error) {
    res.status(500).send('Error de conexión: ' + error.message);
  }
}); */

app.use(router);//llama a las rutas

app.listen(port,()=>{
    console.log(`Servidor escuchando en el puerto ${port}`)
})

