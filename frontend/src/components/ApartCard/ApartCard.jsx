import css from "./ApartCard.module.css";
export default function ApartCard({ apartment }) {
  return (
    <div>
      <img
        src={
          apartment.photo?.length > 0
            ? apartment.photo[0]
            : apartment.photos?.length > 0
            ? apartment.photos[0]
            : "fallback.jpg"
        }
        alt="apartment"
        className={css.photo}
      />
    </div>
  );
}
