const Workshop = require('../models/Workshop');

module.exports = {
  // Criar Oficina
  async store(req, res) {
    try {
      const workshop = await Workshop.create(req.body);
      return res.status(201).json(workshop);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar oficina', details: error.message });
    }
  },

  // Listar todas
  async index(req, res) {
    try {
      const workshops = await Workshop.find();
      return res.json(workshops);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar oficinas' });
    }
  },

  // Atualizar
  async update(req, res) {
    try {
      const workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(workshop);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar oficina' });
    }
  },

  // Deletar
  async delete(req, res) {
    try {
      await Workshop.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Oficina deletada com sucesso' });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao deletar oficina' });
    }
  },

  // Listar Veículos Atendidos por ela
  async getVehicles(req, res) {
    try {
      const workshop = await Workshop.findById(req.params.id).populate('vehicles');
      return res.json(workshop.vehicles);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao buscar veículos da oficina' });
    }
  }
};
