import Joi from "joi";
import i18n from "../../configs/il8n/generated";

const storeValidationSchemas = Joi.object({
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

  photo: Joi.string().messages({
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
});

const updateValidationSchema = Joi.object({
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
});

export { updateValidationSchema, storeValidationSchemas };
