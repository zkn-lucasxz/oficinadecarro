const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Usando o IP direto e a porta padrão do Compass (27017)
    const urlDireta = 'mongodb://127.0.0.1:27017/oficinadecarro';
    
    console.log('Tentando conectar ao MongoDB...');
    const conn = await mongoose.connect(urlDireta);
    
    console.log(`🍃 MongoDB Conectado com sucesso em: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Erro crítico ao conectar ao MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
