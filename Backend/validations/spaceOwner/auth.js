const { body, param, check, query } = require('express-validator')
const { validatorMiddleware } = require('../../helpers/helper')

module.exports.validate = (method) => {
  switch (method) {
    case 'verifyMobileOtp': {
      return [
        body('mobile').notEmpty().trim().withMessage('MOBILE_EMPTY'),
        body('countryCode').notEmpty().trim().withMessage('COUNTRY_CODE_EMPTY'), //
        body('otp').notEmpty().trim().withMessage('OTP_EMPTY'),
        validatorMiddleware
      ]
    }
    case 'verifyMobile': {
      return [
        body('countryCode').notEmpty().trim().withMessage('COUNTRY_CODE_EMPTY'),
        body('mobile').notEmpty().trim().withMessage('MOBILE_EMPTY'), //

        validatorMiddleware
      ]
    }
    case 'forgot-password': {
      return [
        body('email').notEmpty().trim().withMessage('EMAIL_EMPTY'),
        validatorMiddleware
      ]
    }
    case 'reset-password': {
      return [
        body('newPassword').notEmpty().trim().withMessage('PASSWORD_EMPTY'),

        validatorMiddleware
      ]
    }
    case 'checkUsername': {
      return [
        body('userName').notEmpty().trim().withMessage('USERNAME_REQUIRED'),
        validatorMiddleware
      ]
    }
    case 'resendOtpEmail':
    case 'sendEmailOTP': {
      return [
        body('email').notEmpty().trim().withMessage('EMAIL_REQUIRED'),
        validatorMiddleware
      ]
    }
    case 'passCode': {
      return [
        body('email').notEmpty().trim().withMessage('EMAIL_REQUIRED'),
        body('passCode')
          .notEmpty()
          .trim()
          .withMessage('PASS_CODE_REQUIRED')
          .isLength({ min: 6 })
          .withMessage('PASS_CODE_LENGTH_MIN')
          .isLength({ max: 6 })
          .withMessage('PASS_CODE_LENGTH_MAX'),

        validatorMiddleware
      ]
    }
    case 'verifyOTP': {
      return [
        body('mobileOtpId')
          .notEmpty()
          .trim()
          .withMessage('MOBILE_OTP_ID_REQUIRED')
          .isMongoId()
          .withMessage('INVALID_MONGODB_ID'),
        body('emailOtpId')
          .notEmpty()
          .trim()
          .withMessage('EMAIL_OTP_ID_REQUIRED')
          .isMongoId()
          .withMessage('INVALID_MONGODB_ID'),
        body('otpMobile').notEmpty().withMessage('OTP_REQUIRED'),

        validatorMiddleware
      ]
    }
    case 'resendOTP': {
      return [
        body('email').notEmpty().trim().withMessage('EMAIL_REQUIRED'),
        body('mobile').notEmpty().trim().withMessage('MOBILE_REQUIRED'),
        body('countryCode').notEmpty().withMessage('COUNTRY_CODE_REQUIRED'),

        validatorMiddleware
      ]
    }
    case 'resendOTPMobile': {
      return [
        body('mobile').notEmpty().withMessage('MOBILE_REQUIRED'),
        body('countryCode').notEmpty().trim().withMessage('COUNTRY_CODE_REQUIRED'),
        validatorMiddleware
      ]
    }
    case 'sendOTP': {
      return [
        body('mobile').notEmpty().trim().withMessage('MOBILE_REQUIRED'),
        validatorMiddleware
      ]
    }
    case 'verifyEmailOTP': {
      return [
        body('emailOtpId')
          .notEmpty()
          .trim()
          .withMessage('EMAIL_OTP_ID_REQUIRED')
          .isMongoId()
          .withMessage('INVALID_MONGODB_ID'),
        body('otp').notEmpty().withMessage('OTP_REQUIRED'),

        validatorMiddleware
      ]
    }
    case 'socialLogin': {
      return [
        body('accessToken').notEmpty().trim().withMessage('ACCESS_TOKEN_REQUIRED'),
        validatorMiddleware
      ]
    }
    case 'checkSocialId': {
      return [
        body('socialId').notEmpty().trim().withMessage('SOCIAL_ID_REQUIRED'),
        validatorMiddleware
      ]
    }
    case 'socialSignup': {
      return [
        body('accessToken').notEmpty().trim().withMessage('EMAIL_OTP_ID_REQUIRED'),

        validatorMiddleware
      ]
    }
    case 'updateProfile': {
      return [
        body('fullName')
          .optional()
          .trim()
          .isLength({ min: 2 })
          .withMessage('NAME_LENGTH_MIN')
          .isLength({ max: 30 })
          .withMessage('NAME_LENGTH_MAX'),

        body('email')
          .optional()
          .trim()
          .isEmail()
          .withMessage('EMAIL_INVALID'),

        body('address')
          .optional()
          .trim(),

        body('contact')
          .optional()
          .trim()
          .isString()
          .withMessage('CONTACT_INVALID'),

        body('region')
          .optional()
          .trim(),

        query('profilePic')
          .optional()
          .trim()
          .isString()
          .withMessage('PROFILE_PIC_INVALID'),

        validatorMiddleware
      ]
    }

    case 'change-password': {
      return [
        body('newPassword').notEmpty().trim().withMessage('NEWPASSWORD_EMPTY'), //
        body('oldPassword').notEmpty().trim().withMessage('OLDPASSWORD_EMPTY'),
        validatorMiddleware
      ]
    }
    case 'convertCurrency': {
      return [
        body('amount').notEmpty().trim().withMessage('CURRENCY_AMOUNT'), //
        body('from').notEmpty().trim().withMessage('CURRENCY_FROM'), //
        body('to').notEmpty().trim().withMessage('CURRENCY_TO'),
        validatorMiddleware
      ]
    }
    case 'changeDefaultAddress': {
      return [
        query('defaultAddress').notEmpty().trim().withMessage('DEFAULT_ADDRESS_EMPTY'),
        validatorMiddleware
      ]
    }
    case 'productListCategoryWise': {
      return [
        query('category').notEmpty().trim().withMessage('CATEGORY_ID_EMPTY'),
        validatorMiddleware
      ]
    }
  }
}