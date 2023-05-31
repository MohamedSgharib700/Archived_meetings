import Joi from "joi";
import i18n from "../../configs/il8n/generated";

const videoValidationSchema = Joi.object({
  description: Joi.string()
    .required()
    .messages({
      "any.required": i18n.__("validation.video.description.required"),
      "string.base": i18n.__("validation.video.description.string"),
    }),
  url: Joi.string()
    .required()
    .messages({
      "any.required": i18n.__("validation.video.url.required"),
    }),
  category_id: Joi.array()
    .min(1)
    .required()
    .messages({
      "any.required": i18n.__("validation.video.category.required"),
      "array.min": i18n.__("validation.video.category.min"),
    }),
});

export default videoValidationSchema;
