import { ApartmentCollection } from '../db/models/apartment.js';
// import { SORT_ORDER } from '../constant/index.js';
// export const getAllApartments = async ({
//   page,
//   perPage,
//   sortOrder = SORT_ORDER.ASC,
//   sortBy = '_id',
//   filter = {},
//   apartmentId,
// }) => {
//   const limit = perPage;
//   const skip = (page - 1) * perPage;
//   const apartmentQuery = await ApartmentCollection.find(apartmentId);
//   if (filter.isFavorite) {
//     apartmentQuery.where('isFavorite').equals(filter.isFavorite);
//   }
//   if (filter.apartmentType) {
//     apartmentQuery.where('apartmentType').equals(filter.apartmentType);
//   }

//   const apartment = await Promise.all([
//     ApartmentCollection.find().merge(apartmentQuery).countDocuments(),
//     apartmentQuery
//       .skip(skip)
//       .limit(limit)
//       .sort({ [sortBy]: sortOrder })
//       .exec(),
//   ]);

//   return {
//     data: apartment,
//   };
// };
export const getAllApartments = async () => {
  return await ApartmentCollection.find();
};

export const getApartmentById = async (apartmentId) => {
  const apartment = await ApartmentCollection.findById(apartmentId);
  return apartment;
};
