import Joi from "joi";
import i18n from "../../configs/il8n/generated";

const categoryValidationSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "any.required": i18n.__("validation.category.name.required"),
      "string.base": i18n.__("validation.category.name.string"),
    }),
});

export default categoryValidationSchema;
