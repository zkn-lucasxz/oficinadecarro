
const express = require('express');
const connectDB = require('./src/config/Database');
const routes = require('./src/routes'); 

const app = express();

connectDB();

app.use(express.json());
app.use(routes); 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado com sucesso na porta ${PORT}`);
});
