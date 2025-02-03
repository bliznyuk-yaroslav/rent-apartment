import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { fetchApartmentId } from "../../redux/item/operation";
import { selectorApartmentId } from "../../redux/item/selector";
import css from "./ApartmentPage.module.css";
import ApartPhot from "../../components/ApartPhoto/ApartPhoto";
import ApartDetails from "../../components/ApartDetails/ApartDetails";

export default function ApartmentPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const backLinkURLRef = useRef(location.state ?? "/");
  const apartmentId = useSelector(selectorApartmentId);

  useEffect(() => {
    if (id) {
      dispatch(fetchApartmentId(id));
    }
  }, [id, dispatch]);
  console.log(apartmentId);
  return (
    <section className={css.container}>
      <NavLink to={backLinkURLRef.current} className={css.btn}>
        Go Back
      </NavLink>
      <div className={css.contInfo}>
        <ApartDetails />
        <ApartPhot />
      </div>
    </section>
  );
}
