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
  try {
    const { price, rooms, location } = req.query;
    const queryParams = {
      price: price ? parseInt(price, 10) : undefined,
      rooms: rooms ? parseInt(rooms, 10) : undefined,
      location: location || undefined,
    };
    const apartment = await getAllApartments(queryParams);
    res.json({
      status: 200,
      message: 'Successfully found apartments!',
      data: apartment,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
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
        uploadedUrl = await saveFileToCloudinary(file, 'photo');
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
  const existingApartment = await getApartmentById(id);
  if (!existingApartment) {
    throw createHttpError(404, 'There is no such apartment, unfortunately');
  }
  let photoUrl = existingApartment.photo || [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      let uploadedUrl;
      if (env('ENABLE_CLOUDINARY') === 'true') {
        uploadedUrl = await saveFileToCloudinary(file, 'photo');
      } else {
        uploadedUrl = await saveFileToUploadDir(file);
      }
      photoUrl.push(uploadedUrl);
    }
  }
  if (Array.isArray(req.body.photo) && req.body.photo.length > 0) {
    photoUrl = [...photoUrl, ...req.body.photo];
  }
  const updateData = { ...req.body, photo: photoUrl };

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
