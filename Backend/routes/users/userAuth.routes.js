const router = require('express').Router();
const validationRule = require('../../validations/users/auth.js')
const { verifyToken } = require('../../middlewares/verifyToken.js')
const { userDoc } = require('../../middlewares/multerSetup.js')
const userController = require('../../controllers/users/userAuth.controller.js')

// GET ROUTES
router.get('/get-profile', [verifyToken], userController.getProfile)

// POST AUTH ROUTES
    .post('/sign-out', [verifyToken], userController.logout)
    .post('/sign-up', [validationRule.validate('register')], userController.signUp)
    .post('/sign-in', [validationRule.validate('login')], userController.signIn)
    .post('/google-auth',[validationRule.validate('OAuth')], userController.OAuth)
    .put('/update-profile', [verifyToken, userDoc, validationRule.validate('updateProfile')], userController.updateProfile)
    .post('/forgot-password', [validationRule.validate('forgot-password')], userController.userForgotPassword)
    .post('/reset-password/:token', [validationRule.validate('reset-password')], userController.userResetPassword)
    .post('/change-password', [verifyToken, validationRule.validate('change-password')], userController.changePassword)

// POST VEHICLE ROUTES
// router.post('/upload-vehicle', vehicleRequests.registerVehicle);

module.exports = router;