import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getApartmentController,
  updateApartmentController,
} from '../controllers/apartment.js';
import { getApartmentByIdController } from '../controllers/apartment.js';
import isValid from '../middlewares/isValid.js';
import { deleteApartmentController } from '../controllers/apartment.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createApartmentSchema,
  updateApartmentSchema,
} from '../validation/apartment.js';
import { addApartmentController } from '../controllers/apartment.js';
import { upload } from '../middlewares/multer.js';

const router = Router();
router.get('/', ctrlWrapper(getApartmentController));
router.get('/:id', isValid, ctrlWrapper(getApartmentByIdController));
router.delete('/:id', ctrlWrapper(deleteApartmentController));
router.post(
  '/',
  upload.array('photos', 10),
  validateBody(createApartmentSchema),
  ctrlWrapper(addApartmentController),
);
router.patch(
  '/:id',
  isValid,
  upload.array('photos', 10),
  validateBody(updateApartmentSchema),
  ctrlWrapper(updateApartmentController),
);
export default router;
