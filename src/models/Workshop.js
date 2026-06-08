
const mongoose = require('mongoose');

const WorkshopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  specialties: [{ type: String }], // Ex: ["motor", "suspensão"]
  // Array que armazena os ObjectIds dos veículos atendidos
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }]
});

module.exports = mongoose.model('Workshop', WorkshopSchema);


