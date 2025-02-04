import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchApartmentId } from "../../redux/item/operation";
import { selectorApartmentId } from "../../redux/item/selector";
import css from "./ApartmentPage.module.css";
import ApartPhot from "../../components/ApartPhoto/ApartPhoto";
import ApartDetails from "../../components/ApartDetails/ApartDetails";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ApartmentPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

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
      <div></div>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ color: "#20B2AA", borderColor: "#20B2AA", ml: 1 }}
        onClick={() => navigate(backLinkURLRef.current)}
      >
        Повернутися
      </Button>
      <div className={css.contInfo}>
        <ApartDetails />
        <ApartPhot />
      </div>
    </section>
  );
}
