import Joi from 'joi';
export const createApartmentSchema = Joi.object({
  title: Joi.string().min(3).max(90).required(),
  price: Joi.number().min(2).max(10000).required(),
  description: Joi.string().min(3).max(335).required(),
  rooms: Joi.number().min(1).max(10).required(),
  location: Joi.string().min(3).max(30),
  floor: Joi.number().min(1).max(30),
  square: Joi.number().min(1).max(300),
  photo: Joi.array().items(Joi.string().uri()).optional(),
});
export const updateApartmentSchema = Joi.object({
  title: Joi.string().min(3).max(90),
  price: Joi.number().min(2).max(100000),
  description: Joi.string().min(3).max(335),
  location: Joi.string().min(3).max(30),
  rooms: Joi.number().min(1).max(10),
  floor: Joi.number().min(1).max(30),
  square: Joi.number().min(1).max(300),
  photo: Joi.array().items(Joi.string().uri()).optional(),
});
