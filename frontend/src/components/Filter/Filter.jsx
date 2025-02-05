import { useDispatch, useSelector } from "react-redux";
import {
  changeFilter,
  changeLocationFilter,
  changeRoomFilter,
  selectLocationFilter,
  selectPriceFilter,
  selectRoomFilter,
} from "../../redux/Filter/slice";
import css from "./Filter.module.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import { fetchAllApartment } from "../../redux/catalog/operation";
export default function Filter() {
  const dispatch = useDispatch();
  const price = useSelector(selectPriceFilter);
  const rooms = useSelector(selectRoomFilter);
  const location = useSelector(selectLocationFilter);
  const [localPrice, setLocalPrice] = useState(price);
  const [localRooms, setLocalRooms] = useState(rooms);
  const [localLocation, setLocalLocation] = useState(location);

  const handlePriceChange = (e) => setLocalPrice(e.target.value);
  const handleRoomChange = (e) => setLocalRooms(e.target.value);
  const handleLocationChange = (e) => setLocalLocation(e.target.value);

  const handleApplyFilters = () => {
    const queryParams = {
      price: localPrice || undefined,
      rooms: localRooms || undefined,
      location: localLocation || undefined,
    };
    dispatch(fetchAllApartment(queryParams));
  };

  const handleClearFilters = () => {
    setLocalPrice("");
    setLocalRooms("");
    setLocalLocation("");
    dispatch(changeFilter(""));
    dispatch(changeRoomFilter(""));
    dispatch(changeLocationFilter(""));
    dispatch(fetchAllApartment({}));
  };
  return (
    <div className={css.cont}>
      <div className={css.cat}>
        <label className={css.text}>Ціна:</label>
        <div className={css.rangeWrapper}>
          <span className={css.rangeValue}>{localPrice} $</span>
          <input
            type="range"
            min="0"
            max="10000"
            className={css.input}
            name="filter"
            placeholder="Фільтр по ціні"
            value={localPrice}
            onChange={handlePriceChange}
          />
        </div>
      </div>
      <div className={css.cat}>
        <label className={css.text}>Кількість кімнат:</label>
        <input
          type="number"
          className={css.input}
          name="filter"
          placeholder="Кількість кімнат"
          value={localRooms}
          onChange={handleRoomChange}
        />
      </div>
      <div className={css.cat}>
        <label className={css.text}>Виберіть локацію:</label>
        <input
          type="text"
          className={css.input}
          name="filter"
          placeholder="Введіть локацію"
          value={localLocation}
          onChange={handleLocationChange}
        />
      </div>
      <div className={css.actions}>
        <Button
          variant="outlined"
          sx={{ color: "#20B2AA", borderColor: "#20B2AA" }}
          onClick={handleApplyFilters}
        >
          Застосувати фільтр
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "#20B2AA", borderColor: "#20B2AA" }}
          onClick={handleClearFilters}
        >
          Очистити
        </Button>
      </div>
    </div>
  );
}
