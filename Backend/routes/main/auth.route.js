const router = require('express').Router();
const validationRule = require('../../validations/main/auth.js')
const { login, OAuth, register, contactUs } = require('../../controllers/main/auth.controller.js')

router
    .post('/register', [validationRule.validate('register')], register)
    .post('/login', [validationRule.validate('login')], login)
    .post('/OAuth',[validationRule.validate('OAuth')], OAuth)

    .post('/contact-us', [validationRule.validate('contactUs')], contactUs)

module.exports = router