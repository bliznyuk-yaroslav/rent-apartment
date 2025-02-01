// import createHttpError from 'http-errors';

// import { parsePaginationParams } from '../utils/parsePaginationParams.js';

// const filterApartmentField = (apartment) => {
//   return {
//     id: apartment._id,
//     title: apartment.title,
//     price: apartment.price,
//     rooms: apartment.rooms,
//     phoros: apartment.phoros,
//   };
// };

// export const getAllApartment = async (req, res) => {
//     const apartmentId = req.apartment.id;
//     const apartments = await getA
// };
import { getAllApartments } from '../services/apartment.js';

export const getApartmentController = async (req, res) => {
  const apartment = await getAllApartments();

  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: apartment,
  });
};
