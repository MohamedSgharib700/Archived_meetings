import Joi from "joi";
import i18n from "../../../configs/il8n/generated";

const updatePasswordValidationSchema = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      "any.required": i18n.__("validation.user.currentPassword.required"),
    }),
  password: Joi.string()
    .required()
    .messages({
      "any.required": i18n.__("validation.user.password.required"),
    }),
  passwordConfirm: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "any.required": i18n.__("validation.user.passwordConfirm.required"),
      "any.only": i18n.__("validation.user.passwordConfirm.valid"),
    }),
  photo: Joi.string()
    .required()
    .messages({
      "any.required": i18n.__("validation.user.email.required"),
    }),
});

const signUpValidationSchemas = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages({
      "any.required": i18n.__("validation.user.name.required"),
    }),

  email: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages({
      "any.required": i18n.__("validation.user.email.required"),
    }),

  password: Joi.string()
    .required()
    .messages({
      "any.required": i18n.__("validation.user.password.required"),
    }),
  passwordConfirm: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "any.required": i18n.__("validation.user.passwordConfirm.required"),
      "any.only": i18n.__("validation.user.passwordConfirm.valid"),
    }),
  role_id: Joi.array()
    .required()
    .messages({
      "any.required": i18n.__("validation.user.role_id.required"),
    }),

  photo: Joi.string().messages({
    "any.required": i18n.__("validation.user.email.required"),
  }),
});

const signinValidationSchemas = Joi.object({
  email: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages({
      "any.required": i18n.__("validation.user.email.required"),
    }),

  password: Joi.string()
    .required()
    .messages({
      "any.required": i18n.__("validation.user.password.required"),
    }),
});

export {
  updatePasswordValidationSchema,
  signUpValidationSchemas,
  signinValidationSchemas,
};
