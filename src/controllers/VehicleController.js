const Vehicle = require('../models/Vehicle');

module.exports = {
  // Criar Veículo
  async store(req, res) {
    try {
      const vehicle = await Vehicle.create(req.body);
      return res.status(201).json(vehicle);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao cadastrar veículo', details: error.message });
    }
  },

  // Listar todos
  async index(req, res) {
    try {
      const vehicles = await Vehicle.find();
      return res.json(vehicles);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar veículos' });
    }
  },

  // Atualizar
  async update(req, res) {
    try {
      const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(vehicle);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar veículo' });
    }
  },

  // Deletar
  async delete(req, res) {
    try {
      await Vehicle.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Veículo deletado com sucesso' });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao deletar veículo' });
    }
  },

  // Listar Manutenções do carro
  async getMaintenances(req, res) {
    try {
      const vehicle = await Vehicle.findById(req.params.id).populate('maintenances');
      return res.json(vehicle.maintenances);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao buscar manutenções do veículo' });
    }
  }
};

