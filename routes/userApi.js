const express = require('express');
const router = express.Router();

// Importar controlador
const controller = require('../controllers/userController');

// Definir rutas para las operaciones CRUD
router.get('/count', controller.getCount)
router.get('/all', controller.getAll)
router.post('/adduser', controller.postUser)
router.post('/delete/:id', controller.deleteUser)

// Atributo público
module.exports = router;