import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getApartmentController } from '../controllers/apartment.js';
import { getApartmentByIdController } from '../controllers/apartment.js';
import isValid from '../middlewares/isValid.js';
import { deleteApartmentController } from '../controllers/apartment.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createApartmentSchema } from '../validation/apartment.js';
import { addApartmentConrtoller } from '../controllers/apartment.js';

const router = Router();
router.get('/', ctrlWrapper(getApartmentController));
router.get('/:id', isValid, ctrlWrapper(getApartmentByIdController));
router.delete('/:id', ctrlWrapper(deleteApartmentController));
router.post(
  '/',
  validateBody(createApartmentSchema),
  ctrlWrapper(addApartmentConrtoller),
);
export default router;
