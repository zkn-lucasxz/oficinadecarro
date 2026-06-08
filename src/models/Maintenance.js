const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
  // Referência para a Oficina onde foi feita
  workshop: { type: mongoose.Schema.Types.ObjectId, ref: 'Workshop', required: true },
  // Referência para o Veículo submetido
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  // Array de objetos (serviço e preço)
  services: [{
    name: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  date: { type: Date, default: Date.now },
  totalCost: { type: Number, required: true } // Calculado automaticamente na lógica
});

module.exports = mongoose.model('Maintenance', MaintenanceSchema);
