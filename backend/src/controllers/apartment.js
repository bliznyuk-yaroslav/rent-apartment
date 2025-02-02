import createHttpError from 'http-errors';
import {
  getAllApartments,
  getApartmentById,
  updateApartment,
  createApartment,
} from '../services/apartment.js';
import { deleteApartment } from '../services/apartment.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
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

export const addApartmentController = async (req, res) => {
  let photoUrl = [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      let uploadedUrl;
      if (env('ENABLE_CLOUDINARY') === 'true') {
        uploadedUrl = await saveFileToCloudinary(file);
      } else {
        uploadedUrl = await saveFileToUploadDir(file);
      }
      photoUrl.push(uploadedUrl);
    }
  }
  if (Array.isArray(req.body.photo)) {
    photoUrl = [...photoUrl, ...req.body.photo];
  }
  const apartmentData = {
    ...req.body,
    photo: photoUrl,
  };
  const apartment = await createApartment(apartmentData);
  res.status(201).json({
    status: 201,
    message: 'Succesfully a apartment',
    data: apartment,
  });
};
export const updateApartmentController = async (req, res) => {
  const { id } = req.params;
  let photoUrl = [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      let uploadedUrl;
      if (env('ENABLE_CLOUDINARY') === 'true') {
        uploadedUrl = await saveFileToCloudinary(file);
      } else {
        uploadedUrl = await saveFileToUploadDir(file);
      }
      photoUrl.push(uploadedUrl);
    }
  }
  if (Array.isArray(req.body.photo)) {
    photoUrl = [...photoUrl, ...req.body.photo];
  }
  const updateData = { ...req.body };
  if (photoUrl.length > 0) {
    updateData.photo = photoUrl;
  }
  const data = await updateApartment(id, updateData);
  if (!data) {
    throw createHttpError(404, 'There is no such apartment, unfortunately');
  }
  res.status(201).json({
    status: 201,
    message: 'Succesfully update apartment',
    data: data.value,
  });
};
