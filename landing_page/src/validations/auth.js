// validations/registerValidation.js
import * as Yup from 'yup';
import messages from '../../lang.json'

export const registerValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .required(messages.USERNAME_REQUIRED)
    .min(3, messages.FULLNAME_MIN_LENGTH_3),

  email: Yup.string()
    .trim()
    .required(messages.EMAIL_REQUIRED)
    .email(messages.EMAIL_INVALID),

  phone: Yup.string()
    .trim()
    .required('MOBILE_REQUIRED')
    .matches(/^\d{3} \d{3} \d{4}$/, 'INVALID_PHONE_FORMAT: Must be XXX XXX XXXX'),

  password: Yup.string()
    .trim()
    .required(messages.PASSWORD_REQUIRED)
    .min(6, messages.PASSWORD_MIN_LENGTH_6)
    .matches(/[a-z]/, messages.PASSWORD_NEEDS_LOWERCASE)
    .matches(/[A-Z]/, messages.PASSWORD_NEEDS_UPPERCASE)
    .matches(/\d/, messages.PASSWORD_NEEDS_NUMBER)
    .matches(/[@$!%*?&]/, messages.PASSWORD_NEEDS_SPECIAL_CHAR),

  countryCode: Yup.string()
    .required('COUNTRY_CODE_REQUIRED')
});

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required(messages.EMAIL_REQUIRED)
    .email(messages.EMAIL_INVALID),

  password: Yup.string()
    .trim()
    .required(messages.PASSWORD_REQUIRED)
    .min(6, messages.PASSWORD_MIN_LENGTH_6)
    .matches(/[a-z]/, messages.PASSWORD_NEEDS_LOWERCASE)
    .matches(/[A-Z]/, messages.PASSWORD_NEEDS_UPPERCASE)
    .matches(/\d/, messages.PASSWORD_NEEDS_NUMBER)
    .matches(/[@$!%*?&]/, messages.PASSWORD_NEEDS_SPECIAL_CHAR)
});
