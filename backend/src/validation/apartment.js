import Joi from 'joi';
export const createApartmentSchema = Joi.object({
  title: Joi.string().min(3).max(90).required(),
  price: Joi.number().min(2).max(100000).required(),
  description: Joi.string().min(3).max(335).required(),
  rooms: Joi.number().min(1).max(10).required(),
  photo: Joi.array().items(Joi.string().uri()).optional(),
});
export const updateApartmentSchema = Joi.object({
  title: Joi.string().min(3).max(90),
  price: Joi.number().min(2).max(100000),
  description: Joi.string().min(3).max(335),
  rooms: Joi.number().min(1).max(10),
  photo: Joi.array().items(Joi.string().uri()).optional(),
});
