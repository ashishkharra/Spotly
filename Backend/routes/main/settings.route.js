const router = require('express').Router()
const verifyToken = require('../../middlewares/verifyToken.js')
const validationRule = require('../../validations/main/auth.js')
const mainSettingController = require('../../controllers/main/settings.controller.js')

router.get('/data', [verifyToken, validationRule.validate('page-data')], mainSettingController?.pageData)
module.exports = router