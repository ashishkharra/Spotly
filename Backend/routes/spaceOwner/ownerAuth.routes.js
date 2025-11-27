const router = require('express').Router();
const validationRule = require('../../validations/spaceOwner/auth.js')
const { verifyToken } = require('../../middlewares/verifyToken.js')
const { ownerDoc } = require('../../middlewares/multerSetup.js')
const ownerController = require('../../controllers/spaceOwner/spaceOwnerAuth.controller.js')

// GET ROUTES
router.get('/get-profile', [verifyToken], userController.getProfile)

// POST AUTH ROUTES
    .post('/sign-out', [verifyToken], ownerController.logout)
    .post('/sign-up', [validationRule.validate('register')], ownerController.signUp)
    .post('/sign-in', [validationRule.validate('login')], ownerController.signIn)
    .post('/google-auth',[validationRule.validate('OAuth')], ownerController.OAuth)
    .put('/update-profile', [verifyToken, ownerDoc, validationRule.validate('updateProfile')], ownerController.updateProfile)
    .post('/forgot-password', [validationRule.validate('forgot-password')], ownerController.ownerForgotPassword)
    .post('/reset-password/:token', [validationRule.validate('reset-password')], ownerController.ownerResetPassword)
    .post('/change-password', [verifyToken, validationRule.validate('change-password')], ownerController.changePassword)

module.exports = router;