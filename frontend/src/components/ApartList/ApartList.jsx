import { useDispatch, useSelector } from "react-redux";
import { selectorAllApartment } from "../../redux/catalog/selector";
import { useEffect, useState } from "react";
import { fetchAllApartment } from "../../redux/catalog/operation";
import css from "./ApartList.module.css";
import ApartCard from "../ApartCard/ApartCard";
import { Link } from "react-router-dom";
export default function ApartList() {
  const dispatch = useDispatch();
  const apartments = useSelector(selectorAllApartment);
  useEffect(() => {
    dispatch(fetchAllApartment());
  }, [dispatch]);

  return (
    <div>
      <div className={css.container}>
        {apartments.map((apartment) => (
          <Link
            key={apartment._id}
            to={`/${apartment._id}`}
            className={css.item}
          >
            <ApartCard apartment={apartment} />
          </Link>
        ))}
      </div>
    </div>
  );
}
