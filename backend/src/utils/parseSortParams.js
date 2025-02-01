// import { SORT_ORDER } from '../constant/index.js';

// const parseSortOrder = (sortOrder) => {
//   const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
//   if (isKnownOrder) return sortOrder;
//   return SORT_ORDER.ASC;
// };

// const parseSortBy = (sortBy) => {
//   const keyOfApartment = [
//     '_id',
//     'title',
//     'price',
//     'rooms',
//     'photos',
//     'createAt',
//     'updatedAt',
//   ];
//   if ((keyOfApartment.includes(sortBy))) {
//     return sortBy;
//   }
//   return 'title';
// };
// const parseFilterType = (type) => {
//   return type ? type : null;
// };
// const parseIsFavourite = (isFavorite) => {
//   if (isFavorite === 'true') {
//     return true;
//   } else if (isFavorite === 'false') {
//     return false;
//   } else {
//     return null;
//   }
// };
// export const parseSoirtParams = (query) => {
//   const { sortOrder, sortBy, type, isFavorite } = query;
//   const parsedSortOrder = parseSortOrder(sortOrder);
//   const parsedSortBy = parseSortBy(sortBy);
//   const parsedFilterType = parseFilterType(type);
//   const parsedIsFavourite = parseIsFavourite(isFavorite);
//   return {
//     sortOrder: parsedSortOrder,
//     sortBy: parsedSortBy,
//     type: parsedFilterType,
//     isFavorite: parsedIsFavourite,
//   };
// };
