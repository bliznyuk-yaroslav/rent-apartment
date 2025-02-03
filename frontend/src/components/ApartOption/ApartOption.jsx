import { BedDouble, MapPinCheckInside, Hotel, Grid2x2 } from "lucide-react";
import css from "./ApartOption.module.css";
export default function ApartOption({ apartment }) {
  const renderRooms = (rooms) => {
    if (rooms === 1) {
      return `${rooms} кімната`;
    } else {
      return `${rooms} кімнати`;
    }
  };
  return (
    <div className={css.container}>
      {apartment.rooms && (
        <div className={css.optionItem}>
          <BedDouble />
          <p className={css.optionText}>{renderRooms(apartment.rooms)}</p>
        </div>
      )}
      {apartment.location && (
        <div className={css.optionItem}>
          <MapPinCheckInside />
          <p className={css.optionText}>{apartment.location}</p>
        </div>
      )}
      {apartment.floor !== undefined && (
        <div className={css.optionItem}>
          <Hotel />
          <p className={css.optionText}>{apartment.floor} поверх</p>
        </div>
      )}
      {apartment.square !== undefined && (
        <div className={css.optionItem}>
          <Grid2x2 />
          <p className={css.optionText}>{apartment.square}м²</p>
        </div>
      )}
    </div>
  );
}
