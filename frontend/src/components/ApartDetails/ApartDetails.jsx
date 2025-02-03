import { useSelector } from "react-redux";
import { selectorApartmentId } from "../../redux/item/selector";
import ApartOption from "../ApartOption/ApartOption";
import css from "./ApartDetails.module.css";
import ButtonDel from "../ButtonDel/ButtonDel";
export default function ApartDetails() {
  const apartmentId = useSelector(selectorApartmentId);

  return (
    <div>
      <h1 className={css.title}>{apartmentId.title}</h1>
      <ApartOption apartment={apartmentId} />
      <h3 className={css.head}>Деталі</h3>
      <p>{apartmentId.description}</p>
      <h3 className={css.head}>Ціна</h3>
      <p>{apartmentId.price} $</p>
      <ButtonDel apartmentId={apartmentId._id} />
    </div>
  );
}
