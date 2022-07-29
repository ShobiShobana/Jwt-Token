const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const OrdersController = require('../controllers/orders');


router.get('/', checkAuth, OrdersController.order_get_all);

router.post('/', checkAuth, OrdersController.order_create);

router.get('/:orderId', checkAuth, OrdersController.order_get_byId);

router.delete('/:orderId', checkAuth, OrdersController.order_delete_byId);

module.exports = router;