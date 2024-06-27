import Joi from "joi";

export const REGISTER_USER = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required()
});

export const LOGIN_USER = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required()
});

export const NEW_ACCESS_TOKEN_USER = Joi.object({
  refreshToken: Joi.string().min(36).max(36).required(),
});

export const VALIDATE_ACCESS_TOKEN_USER = Joi.object({
  accessToken: Joi.string().required(),
});
