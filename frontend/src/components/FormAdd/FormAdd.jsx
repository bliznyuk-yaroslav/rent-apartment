import { useId, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addApartment } from "../../redux/catalog/operation";
import css from "./FormAdd.module.css";
import { CircleX } from "lucide-react";

export default function FormAdd({ closeModal }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [rooms, setRooms] = useState("");
  const [location, setLocation] = useState("");
  const [floor, setFloor] = useState("");
  const [square, setSquare] = useState("");
  const [photo, setPhoto] = useState([]);

  //   const validationSchema = Yup.object().shape({
  //     title: Yup.string()
  //       .max(90, "Максимальна кількість 90 символів ")
  //       .required("Поле обов'язкове"),
  //     price: Yup.number()
  //       .min(0, "Мінімальна ціна 0$")
  //       .max(10000, "Максимальна ціна оренди 10000$")
  //       .required("Поле обов'язкове"),
  //     description: Yup.string()
  //       .max(335, "Максимальна кількість до 335 символів ")
  //       .required("Поле обов'язкове"),
  //     rooms: Yup.number().max(10, "Максимальна кількість кімнат").nullable(),
  //     location: Yup.string(),
  //     floor: Yup.number().max(30, "Максимальна кількість поверхів").nullable(),
  //     square: Yup.number()
  //       .max(300, "Максимальна кількість квадратних метрів квартири")
  //       .nullable(),
  //   });

  const onSubmit = async (e) => {
    e.preventDefault();
    const defaultPhoto = "https://example.com/default-image.jpg";
    const data = {
      title,
      price: Number(price),
      description,
      rooms: rooms ? Number(rooms) : null,
      location,
      floor: floor ? Number(floor) : null,
      square: square ? Number(square) : null,
      photo: photo.length > 0 ? photo : [defaultPhoto],
    };
    try {
      await dispatch(addApartment(data)).unwrap();
      closeModal();
    } catch (error) {
      alert("Не вдалося додати квартиру: " + error.message);
    }
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPhoto(files);
  };

  return (
    <form onSubmit={onSubmit} className={css.form}>
      <p onClick={closeModal} className={css.btnCls}>
        <CircleX style={{ color: "#20B2AA" }} size={30} />
      </p>
      <h2 className={css.titleForm}>Додавання нової квартири</h2>

      <label>Назва квартири:</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Ціна ($):</label>
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        type="number"
      />

      <label>Опис:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label>Кількість кімнат:</label>
      <input
        value={rooms}
        onChange={(e) => setRooms(e.target.value)}
        type="number"
      />

      <label>Локація:</label>
      <input value={location} onChange={(e) => setLocation(e.target.value)} />

      <label>Поверх:</label>
      <input
        value={floor}
        onChange={(e) => setFloor(e.target.value)}
        type="number"
      />

      <label>Площа (м²):</label>
      <input
        value={square}
        onChange={(e) => setSquare(e.target.value)}
        type="number"
      />
      <label>Фото (можна вибрати кілька):</label>
      <input type="file" multiple onChange={handleFileChange} />

      <button type="submit" className={css.submitButton}>
        Додати квартиру
      </button>
    </form>
  );
}
