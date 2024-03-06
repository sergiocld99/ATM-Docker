const express = require('express');
const router = express.Router();

// Importar controlador
const controller = require('../controllers/cardController');

// Definir rutas para las operaciones CRUD
router.get('/count', controller.getCount)
router.get('/all', controller.getAll)
router.get('/pin/:nro', controller.getPin)
router.post('/addcard', controller.postCard)
router.post('/ban/:id', controller.banearTarjeta)
router.post('/unban/:id', controller.desbanearTarjeta)
router.post('/delete/:id', controller.deleteCard)

// Atributo público
module.exports = router;