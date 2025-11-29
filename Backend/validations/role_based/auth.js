const { body } = require('express-validator');
const { validatorMiddleware } = require('../../helpers/helper');

module.exports.validate = (method) => {
  switch (method) {

    case 'OAuth': {
      return [

        body('fullName')
          .optional()
          .trim()
          .isLength({ min: 3 })
          .withMessage('FULLNAME_MIN_LENGTH_3'),

        body('email')
          .optional()
          .trim()
          .isEmail()
          .withMessage('EMAIL_INVALID'),

        validatorMiddleware
      ];
    }

    case 'register': {
      return [
        body('fullName')
          .notEmpty()
          .withMessage('USERNAME_REQUIRED')
          .trim()
          .isLength({ min: 3 })
          .withMessage('FULLNAME_MIN_LENGTH_3'),

        body('email')
          .notEmpty()
          .withMessage('EMAIL_REQUIRED')
          .trim()
          .isEmail()
          .withMessage('EMAIL_INVALID'),

        body('phone')
          .notEmpty()
          .withMessage('MOBILE_REQUIRED')
          .trim()
          .matches(/^\d{3} \d{3} \d{4}$/)
          .withMessage('MOBILE_INVALID_FORMAT: Must be in +CC XXX XXX... format with valid length'),

        body('countryCode')
          .notEmpty()
          .withMessage('COUNTRY_CODE_REQUIRED')
          .trim()
          .matches(/^\+\d{1,4}$/)
          .withMessage('COUNTRY_CODE_INVALID'),

        body('password')
          .notEmpty()
          .withMessage('PASSWORD_REQUIRED')
          .trim()
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
      ];
    }

    case 'login': {
      return [
        body('email')
          .notEmpty()
          .withMessage('EMAIL_REQUIRED')
          .trim()
          .isEmail()
          .withMessage('EMAIL_INVALID'),

        body('password')
          .notEmpty()
          .withMessage('PASSWORD_REQUIRED')
          .trim()
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
      ];
    }
  }
};
