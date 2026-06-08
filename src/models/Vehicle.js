
const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  plate: { type: String, required: true, unique: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  owner: { type: String, required: true },
  // Array que armazena os ObjectIds das manutenções realizadas
  maintenances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Maintenance' }]
});

module.exports = mongoose.model('Vehicle', VehicleSchema);

    