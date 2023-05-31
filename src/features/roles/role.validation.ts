import Joi from "joi";
import i18n from "../../configs/il8n/generated";

const roleValidationSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "any.required": i18n.__("validation.role.name.required"),
      "string.base": i18n.__("validation.role.name.string"),
    }),
  permission_id: Joi.array()
    .min(1)
    .required()
    .messages({
      "any.required": i18n.__("validation.video.permission.required"),
      "array.min": i18n.__("validation.video.permission.min"),
    }),
});

export default roleValidationSchema;
