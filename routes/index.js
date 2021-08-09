const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');
const ProductController = require('../controllers/PorductController');

module.exports = function(){
    //Client
    router.post('/clients', ClientController.newClient);
    router.get('/clients', ClientController.getClients);
    router.get('/clients/:idClient', ClientController.getClient);
    router.put('/clients/:idClient', ClientController.updateClient);
    router.delete('/clients/:idClient', ClientController.deleteClient);

    //Product

    router.post('/products', 
    ProductController.upArchive,
    ProductController.newProduct);

    return router;
}