import ApartOption from "../ApartOption/ApartOption";
import ButtonDel from "../ButtonDel/ButtonDel";
import css from "./ApartCard.module.css";
export default function ApartCard({ apartment }) {
  const truncatedDescription =
    apartment.description.length > 100
      ? apartment.description.slice(0, 100) + "..."
      : apartment.description;
  return (
    <div className={css.container}>
      <img src={apartment.photo[0]} alt="photoapart" className={css.photo} />
      <div className={css.data}>
        <div className={css.head}>
          <h2 className={css.name}>{apartment.title}</h2>
          <p>{apartment.price}$</p>
        </div>
        <p>Description:{truncatedDescription}</p>
        <ApartOption apartment={apartment} />
        <ButtonDel apartmentId={apartment._id} />
      </div>
    </div>
  );
}
