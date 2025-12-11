// validations/registerValidation.js
import * as Yup from 'yup';
import messages from '../../lang.json'

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required(messages.EMAIL_REQUIRED)
    .email(messages.EMAIL_INVALID),

  remember_me: Yup.boolean()
    .optional(),

  password: Yup.string()
    .trim()
    .required(messages.PASSWORD_REQUIRED)
    .min(6, messages.PASSWORD_MIN_LENGTH_6)
    .matches(/[a-z]/, messages.PASSWORD_NEEDS_LOWERCASE)
    .matches(/[A-Z]/, messages.PASSWORD_NEEDS_UPPERCASE)
    .matches(/\d/, messages.PASSWORD_NEEDS_NUMBER)
    .matches(/[@$!%*?&]/, messages.PASSWORD_NEEDS_SPECIAL_CHAR)
});