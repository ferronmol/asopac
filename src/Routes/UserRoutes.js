const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const User = require('./Models/UserModel');

//mensaje de prueba
router.get('/',  (req, res) => {
    res.send('Hello user!');
});
// Ruta de prueba para la ruta de usuario
router.get('/test', (req, res) => {
    console.log('Ruta de usuario alcanzada');
    res.send('¡Ruta de usuario alcanzada!');
});


// Ruta para crear un nuevo usuario
router.post('/users', authController.registerUser);



module.exports = router;

