const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const userController = require('../Controllers/userController');
const User = require('./Models/UserModel');
   
// Ruta para crear un nuevo usuario
router.post('/', authController.registerUser);

// Ruta para obtener información de un usuario
router.get('/:id', userController.getUser);

module.exports = router;
