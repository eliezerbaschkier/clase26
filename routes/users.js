var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')
const { check } = require('express-validator');

const validateRegister = [
  check('name').notEmpty().withMessage('Debes completar el nombre'),
  check('email').notEmpty().withMessage('Debes completar el email').isEmail().withMessage('Tiene que tener formato de email'),
  check('age').optional().isInt().withMessage('Debes completar con un número') //LOGRAR QUE SEA OPCIONAL
]

router.get('/', usersController.index);

/* GET register form */
router.get('/register', usersController.register);

/* POST register form */
router.post('/register', validateRegister ,usersController.store);

/* POST method to delete session and cookies */
router.post('/deleteSessionAndCookies', usersController.delete)

module.exports = router;
