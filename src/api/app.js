import express from 'express';
import cors from 'cors';
import router from './routes/rotasUsuario.js';

const app = express();

// Configuração do CORS
app.use(cors());

app.use(express.json());
app.use(router);

app.listen(3000, () => console.log("Servidor online na porta 3000"));
