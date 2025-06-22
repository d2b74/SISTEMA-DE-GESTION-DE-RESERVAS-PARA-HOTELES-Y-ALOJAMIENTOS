// server.js
import app from './app.js'; // Importa la aplicación Express desde app.js
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`✅ Servidor escuchando en: http://localhost:${port}`);
});

