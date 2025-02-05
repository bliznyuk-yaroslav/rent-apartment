import { ApartmentCollection } from '../db/models/apartment.js';

export const getAllApartments = async (queryParams) => {
  const { price, rooms, location } = queryParams;
  const filter = {};
  if (price) {
    filter.price = { $lte: price };
  }
  if (rooms) {
    filter.rooms = { $lte: rooms };
  }
  if (location) {
    filter.location = { $regex: location, $options: 'i' };
  }
  return await ApartmentCollection.find(filter);
};

export const getApartmentById = async (apartmentId) => {
  const apartment = await ApartmentCollection.findById(apartmentId);
  return apartment;
};
export const deleteApartment = async (apartmentId) => {
  const apartment = await ApartmentCollection.findOneAndDelete({
    _id: apartmentId,
  });
  return apartment;
};
export const createApartment = async (payload) => {
  return ApartmentCollection.create(payload);
};
export const updateApartment = async (apartmentId, payload = {}) => {
  const updateOptions = { new: true, includeResultMetadata: true };
  const apartment = await ApartmentCollection.findOneAndUpdate(
    { _id: apartmentId },
    payload,
    updateOptions,
  );
  if (!apartment || !apartment.value) return null;
  return apartment;
};
