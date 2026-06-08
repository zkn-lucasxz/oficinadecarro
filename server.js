
const express = require('express');
const connectDB = require('./src/config/Database');
const routes = require('./src/routes'); // 1. Importa o arquivo de rotas

const app = express();

connectDB();

app.use(express.json());
app.use(routes); // 2. Avisa o Express para usar as rotas criadas

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado com sucesso na porta ${PORT}`);
});
