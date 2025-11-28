const { body, param, check, query } = require('express-validator')
const { validatorMiddleware } = require('../../helpers/helper')

module.exports.validate = (method) => {
  switch (method) {

    case 'OAuth': {
      return [
        body('full_name')
          .optional()
          .trim()
          .withMessage('USERNAME_REQUIRED')
          .isLength({ min: 3 })
          .withMessage('FULLNAME_MIN_LENGTH_3'),

        body('email')
          .optional()
          .trim()
          .withMessage('EMAIL_REQUIRED'),

        body('phone')
          .optional()
          .trim()
          .withMessage('MOBILE_REQUIRED'),

        body('password')
          .optional()
          .trim()
          .withMessage('PASSWORD_REQUIRED')
          .isLength({ min: 6 })
          .withMessage('PASSWORD_MIN_LENGTH_6')
          .matches(/[a-z]/)
          .withMessage('PASSWORD_NEEDS_LOWERCASE')
          .matches(/[A-Z]/)
          .withMessage('PASSWORD_NEEDS_UPPERCASE')
          .matches(/\d/)
          .withMessage('PASSWORD_NEEDS_NUMBER')
          .matches(/[@$!%*?&]/)
          .withMessage('PASSWORD_NEEDS_SPECIAL_CHAR'),

        validatorMiddleware
      ]
    }
    case 'register': {
      return [
        body('full_name')
          .notEmpty()
          .trim()
          .withMessage('USERNAME_REQUIRED')
          .isLength({ min: 3 })
          .withMessage('FULLNAME_MIN_LENGTH_3'),

        body('email')
          .notEmpty()
          .trim()
          .withMessage('EMAIL_REQUIRED'),

        body('phone')
          .notEmpty()
          .trim()
          .withMessage('MOBILE_REQUIRED'),

        body('password')
          .notEmpty()
          .trim()
          .withMessage('PASSWORD_REQUIRED')
          .isLength({ min: 6 })
          .withMessage('PASSWORD_MIN_LENGTH_6')
          .matches(/[a-z]/)
          .withMessage('PASSWORD_NEEDS_LOWERCASE')
          .matches(/[A-Z]/)
          .withMessage('PASSWORD_NEEDS_UPPERCASE')
          .matches(/\d/)
          .withMessage('PASSWORD_NEEDS_NUMBER')
          .matches(/[@$!%*?&]/)
          .withMessage('PASSWORD_NEEDS_SPECIAL_CHAR'),

        validatorMiddleware
      ]
    }

    case 'login': {
      return [
        body('email').notEmpty().trim().withMessage('EMAIL_REQUIRED'),
        body('password')
          .notEmpty()
          .trim()
          .withMessage('PASSWORD_REQUIRED')
          .isLength({ min: 6 })
          .withMessage('PASSWORD_MIN_LENGTH_6')
          .matches(/[a-z]/)
          .withMessage('PASSWORD_NEEDS_LOWERCASE')
          .matches(/[A-Z]/)
          .withMessage('PASSWORD_NEEDS_UPPERCASE')
          .matches(/\d/)
          .withMessage('PASSWORD_NEEDS_NUMBER')
          .matches(/[@$!%*?&]/)
          .withMessage('PASSWORD_NEEDS_SPECIAL_CHAR'),
        validatorMiddleware
      ]
    }
  }
}
