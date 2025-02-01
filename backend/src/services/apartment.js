import { ApartmentCollection } from '../db/models/apartment.js';

export const getAllApartments = async () => {
  return await ApartmentCollection.find();
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
export const createApartment = (payload) => ApartmentCollection.create(payload);
