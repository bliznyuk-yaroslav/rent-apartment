import { Router } from 'express';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getApartmentController } from '../controllers/apartment.js';

const router = Router();
router.get('/', getApartmentController);
export default router;
