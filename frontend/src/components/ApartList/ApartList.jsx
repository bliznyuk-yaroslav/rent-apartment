import { useDispatch, useSelector } from "react-redux";
import { selectorAllApartment } from "../../redux/catalog/selector";
import { useEffect, useState } from "react";
import { fetchAllApartment } from "../../redux/catalog/operation";
import css from "./ApartList.module.css";
import ApartCard from "../ApartCard/ApartCard";
export default function ApartList() {
  const dispatch = useDispatch();
  const apartments = useSelector(selectorAllApartment);
  //   console.log(apartments);
  //   const isLoading = useSelector(selectorIsLoading);
  //   const [count, setCount] = useState(3);

  useEffect(() => {
    dispatch(fetchAllApartment());
  }, [dispatch]);
  //   const handleLoadMore = () => {
  //     setCount((prevCount) => prevCount + 1);
  //   };
  //   console.log(apartments);
  console.log(apartments);
  return (
    <div>
      <ul>
        {apartments.map((apartment) => (
          <li key={apartment.id} className={css.item}>
            <ApartCard apartment={apartment} />
          </li>
        ))}
      </ul>
    </div>
  );
}
