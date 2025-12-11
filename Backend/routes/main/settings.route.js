const router = require('express').Router()
const verifyToken = require('../../middlewares/verifyToken.js')
const validationRule = require('../../validations/main/auth.js')
const mainSettingController = require('../../controllers/main/settings.controller.js')

router.get('/data', [verifyToken, validationRule.validate('get_page_data')], mainSettingController?.getPageData)
    .post('/home', [verifyToken, validationRule.validate('home_data')], mainSettingController.home)
module.exports = router