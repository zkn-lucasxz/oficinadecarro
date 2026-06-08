const Maintenance = require('../models/Maintenance');
const Workshop = require('../models/Workshop');
const Vehicle = require('../models/Vehicle');

module.exports = {
  // Registrar Manutenção com soma e vínculos automáticos
  async store(req, res) {
    try {
      const { workshop, vehicle, services, date } = req.body;

      // Soma automática dos preços
      const totalCost = services.reduce((sum, service) => sum + service.price, 0);

      const maintenance = await Maintenance.create({
        workshop,
        vehicle,
        services,
        date,
        totalCost
      });

      // Vincula no array do Veículo
      await Vehicle.findByIdAndUpdate(vehicle, {
        $push: { maintenances: maintenance._id } 
      });

      // Vincula no array da Oficina
      await Workshop.findByIdAndUpdate(workshop, {
        $addToSet: { vehicles: vehicle }
      });

      return res.status(201).json(maintenance);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao registrar manutenção', details: error.message });
    }
  },

  // Listar todas as manutenções gerais
  async index(req, res) {
    try {
      const maintenances = await Maintenance.find()
        .populate('workshop', 'name address')
        .populate('vehicle', 'model plate owner');
      return res.json(maintenances);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar manutenções' });
    }
  },

  // Atualizar Manutenção (recalcula valor se mudar os serviços)
  async update(req, res) {
    try {
      if (req.body.services) {
        req.body.totalCost = req.body.services.reduce((sum, service) => sum + service.price, 0);
      }
      const maintenance = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(maintenance);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar manutenção' });
    }
  },

  // Deletar Manutenção
  async delete(req, res) {
    try {
      await Maintenance.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Manutenção deletada com sucesso' });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao deletar manutenção' });
    }
  },

  // Listar Manutenções por Oficina específica
  async getByWorkshop(req, res) {
    try {
      const maintenances = await Maintenance.find({ workshop: req.params.id })
        .populate('vehicle', 'model plate owner');
      return res.json(maintenances);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao buscar manutenções da oficina' });
    }
  }
};

