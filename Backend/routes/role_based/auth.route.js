const router = require('express').Router();
const validationRule = require('../../validations/role_based/auth.js')
const { login, OAuth, register } = require('../../controllers/role_based/auth.controller.js')

router
    .post('/register', [validationRule.validate('register')], register)
    .post('/login', [validationRule.validate('login')], login)
    .post('/OAuth',[validationRule.validate('OAuth')], OAuth)

module.exports = router