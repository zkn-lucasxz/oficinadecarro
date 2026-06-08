
const { Router } = require('express');
const routes = Router();

// Importando os Controllers
const WorkshopController = require('./controllers/WorkshopController');
const VehicleController = require('./controllers/VehicleController');
const MaintenanceController = require('./controllers/MaintenanceController');

// 🏢 Rotas de Oficina
routes.post('/workshops', WorkshopController.store);
routes.get('/workshops', WorkshopController.index);
routes.put('/workshops/:id', WorkshopController.update);
routes.delete('/workshops/:id', WorkshopController.delete);
routes.get('/workshops/:id/vehicles', WorkshopController.getVehicles);

// 🚗 Rotas de Veículo
routes.post('/vehicles', VehicleController.store);
routes.get('/vehicles', VehicleController.index);
routes.put('/vehicles/:id', VehicleController.update);
routes.delete('/vehicles/:id', VehicleController.delete);
routes.get('/vehicles/:id/maintenances', VehicleController.getMaintenances);

// 🛠️ Rotas de Manutenção
routes.post('/maintenances', MaintenanceController.store);
routes.get('/maintenances', MaintenanceController.index);
routes.put('/maintenances/:id', MaintenanceController.update);
routes.delete('/maintenances/:id', MaintenanceController.delete);
routes.get('/workshops/:id/maintenances', MaintenanceController.getByWorkshop);

module.exports = routes;
