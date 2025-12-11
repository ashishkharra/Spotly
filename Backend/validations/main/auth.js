const { body, query } = require('express-validator');
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

        body('role')
          .notEmpty()
          .trim()
          .isString()
          .isLength({ min: 3 })
          .withMessage('ROLE_REQUIRED'),

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

        body('role')
          .notEmpty()
          .trim()
          .isString()
          .isLength({ min: 3 })
          .withMessage('ROLE_REQUIRED'),

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

        body('role')
          .notEmpty()
          .trim()
          .isString()
          .isLength({ min: 3 })
          .withMessage('ROLE_REQUIRED'),

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

    case 'contactUs': {
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

        body('message')
          .notEmpty()
          .withMessage("MESSAGE_REQUIRED")
          .isString()
          .withMessage('MESSAGE_INVALID')
          .isLength({ min: 100 })
          .withMessage('MAXIMUM_MESSAGE_LENGTH_100'),

        validatorMiddleware
      ]
    }

    case 'get_page_data': {
      return [
        query('page')
          .notEmpty()
          .withMessage('PAGE_NAME_REQUIRED')
          .isString()
          .withMessage('PAGE_NAME_INVALID')
          .trim(),

        validatorMiddleware
      ]
    }

    case 'home_data': {
      return [
        body("type").equals("hero"),
        body("settings.title")
          .isString()
          .notEmpty().withMessage("HERO_SECTION_IS_REQUIRED"),
        body("settings.subtitle")
          .optional().isString(),
        body("settings.backgroundImage")
          .notEmpty().withMessage("HERO_BACKGROUND_IS_REQUIRED"),

        body("type").equals("partners"),
        body("settings.limit")
          .optional()
          .isInt({ min: 1 })
          .withMessage("LIMIT_MUST_BE_NUMBER_BIGGER_THEN_0"),

        body("type").equals("stats"),

        body("settings.items")
          .isArray({ min: 1 })
          .withMessage("STATS_MUST_BE_ARRAY"),

        body("settings.items.*.label")
          .notEmpty().withMessage("STATS_MUST_HAVE_AT_LEAST_ONE_LABEL"),

        body("settings.items.*.value")
          .notEmpty().withMessage("STATS_MUST_HAVE_AT_LEAST_ONE_VALUE"),

        body("type").equals("testimonials"),

        body("settings.limit")
          .optional()
          .isInt({ min: 1 })
          .withMessage("LIMIT_AT_LEAST_1"),

        validatorMiddleware
      ]
    }
  }
};
