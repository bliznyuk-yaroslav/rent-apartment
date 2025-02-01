import createHttpError from 'http-errors';
import { getAllApartments, getApartmentById } from '../services/apartment.js';
import { deleteApartment } from '../services/apartment.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import createApartmentSchema from '../validation/apartment.js';
import { env } from '../utils/env.js';
// GET ALL APART
export const getApartmentController = async (req, res) => {
  const apartment = await getAllApartments();

  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: apartment,
  });
};

// GET APART ID
export const getApartmentByIdController = async (req, res) => {
  const { id } = req.params;
  const apartment = await getApartmentById(id);
  if (!apartment) {
    return res.status(404).json({
      status: 404,
      message: 'Apartment not found',
      data: { message: 'Apartment not found' },
    });
  }
  res.status(200).json({
    status: 200,
    message: ` Succesfully found apartment with id ${id}`,
    data: apartment,
  });
};
// DELETE APART
export const deleteApartmentController = async (req, res, next) => {
  const { id } = req.params;
  const apartment = await deleteApartment(id);
  if (!apartment) {
    next(createHttpError(404, 'No apartment'));
    return;
  }
  res.status(204).send();
};

// ADD APART

export const addApartmentConrtoller = async (req, res) => {
  const photo = req.file;
  let photoUrl;
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const apartmentData = {
    ...req.body,
    photo: photoUrl,
  };
  const apartment = await createApartmentSchema(apartmentData, req);
  res.status(201).json({
    status: 201,
    message: 'Succesfully a apartment',
    data: apartment,
  });
};
