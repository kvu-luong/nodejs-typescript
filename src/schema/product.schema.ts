import Joi from 'joi';

export const SingleProductSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().integer().min(0).max(1000000000000).required().strict(),
  description: Joi.string(),
});

export const ListProductSchema = Joi.object({
  list: Joi.array().items({
    name: Joi.string().required(),
    quantity: Joi.number().integer().min(0).max(1000000000000).required().strict(),
  }),
});
