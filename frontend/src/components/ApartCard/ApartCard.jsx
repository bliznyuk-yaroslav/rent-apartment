import ApartOption from "../ApartOption/ApartOption";
import ButtonDel from "../ButtonDel/ButtonDel";
import css from "./ApartCard.module.css";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export default function ApartCard({ apartment }) {
  const truncatedDescription =
    apartment.description.length > 335
      ? apartment.description.slice(0, 335) + "..."
      : apartment.description;

  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/${apartment._id}`);
  };

  return (
    <div className={css.container}>
      <img src={apartment.photo[0]} alt="photoapart" className={css.photo} />
      <div className={css.data}>
        <div className={css.head}>
          <h2 className={css.name}>{apartment.title}</h2>
          <p>{apartment.price}$</p>
        </div>
        <h3>Деталі:</h3>
        <p>{truncatedDescription}</p>
        <ApartOption apartment={apartment} />
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          sx={{ color: "#20B2AA", borderColor: "#20B2AA", mr: 1 }}
          onClick={handleDetailsClick}
        >
          Детальніше
        </Button>
        <ButtonDel apartmentId={apartment._id} />
      </div>
    </div>
  );
}
