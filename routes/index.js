const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');
const NosisMockupController = require('../controllers/NosisMockupController');
const CrmBancoMockup = require('../controllers/CrmBancoMockupController');
const ProductController = require('../controllers/PorductController');
const OrderController = require('../controllers/OrderController');
const UserController = require('../controllers/UserController');
const Auth = require('../middelware/auth');

module.exports = function(){


    router.get('/alive', NosisMockupController.alive);
    //Nosis
    router.post('/login',NosisMockupController.login);
    router.post('/api/v1/validacion-nosis',NosisMockupController.validacionNosis);
    router.post('/api/v1/evaluacion-nosis',NosisMockupController.evaluacionNosis);
    //Crm banco
    router.post('/login',NosisMockupController.login);
    router.post('/api/v1/get-status-case',CrmBancoMockup.statusCase);
    router.post('/api/v1/get-case-dni',CrmBancoMockup.getCaseDni);

    // //Client
    // router.post('/clients',ClientController.newClient);
    // router.get('/clients', ClientController.getClients);
    // router.get('/clients/:idClient', ClientController.getClient);
    // router.put('/clients/:idClient', ClientController.updateClient);
    // router.delete('/clients/:idClient', ClientController.deleteClient);

    // //Product----------

    // router.post('/products', 
    // ProductController.upArchive,
    // ProductController.newProduct);

    // //todos los productos
    // router.get('/products', ProductController.getProducts)

    // //producto por ID
    // router.get('/products/:idProduct', ProductController.getProduct)

    // //actualizar producto
    // router.put('/products/:idProduct', 
    // ProductController.upArchive,
    // ProductController.updateProduct);

    // //Eliminar producto
    // router.delete('/products/:idProduct', ProductController.deleteProduct);

    // //Orders----------
    // router.post('/orders', OrderController.newOrder);

    // //all orders
    // router.get('/orders',OrderController.getOrders);

    // //order by id
    // router.get('/orders/:idOrder', OrderController.getOrderById)
    
    // //update order
    // router.put('/orders/:idOrder', OrderController.updateOrder)

    // //delete order
    // router.delete('/orders/:idOrder', OrderController.deleteOrder);

    // //Users
    // router.post('/create-account', UserController.registerUser);

    // router.post('/login', UserController.authUser);



    return router;
}