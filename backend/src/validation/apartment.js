import Joi from 'joi';
export const createApartmentSchema = Joi.object({
  title: Joi.string().min(3).max(90).required(),
  price: Joi.number().min(2).max(10).required(),
  description: Joi.string().min(3).max(335).required(),
  rooms: Joi.number().min(1).max(2).required(),
  photos: Joi.string(),
});
