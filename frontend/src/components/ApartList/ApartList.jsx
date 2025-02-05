import { useDispatch, useSelector } from "react-redux";
import { selectorAllApartment } from "../../redux/catalog/selector";
import { useEffect, useState } from "react";
import { fetchAllApartment } from "../../redux/catalog/operation";
import css from "./ApartList.module.css";
import ApartCard from "../ApartCard/ApartCard";
import { Link } from "react-router-dom";
import { selectFilteredApartment } from "../../redux/catalog/slice";
export default function ApartList() {
  const dispatch = useDispatch();
  const apartments = useSelector(selectorAllApartment);
  console.log(apartments);
  useEffect(() => {
    dispatch(fetchAllApartment());
  }, [dispatch]);

  return (
    <ul className={css.container}>
      {apartments.map((apartment) => (
        <li key={apartment._id} className={css.item}>
          <ApartCard apartment={apartment} />
        </li>
      ))}
    </ul>
  );
}
