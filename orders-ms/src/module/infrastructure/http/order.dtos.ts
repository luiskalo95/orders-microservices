import Joi from "joi";

export const ORDER_INSERT = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
  name: Joi.string().required(),
  itemCount: Joi.number().required(),
  transaction: Joi.string().required(),
});
