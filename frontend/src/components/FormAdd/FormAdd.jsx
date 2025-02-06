import { useId, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addApartment } from "../../redux/catalog/operation";
import css from "./FormAdd.module.css";
import { CircleX } from "lucide-react";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";

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
      photo: photo.length > 0 ? photo : [],
    };
    try {
      await dispatch(addApartment(data)).unwrap()
      .then(() => {
        toast.success("Квартира успішно добавлена!", { duration: 1000 }) 
      });
      closeModal();
    } catch (error) {
      toast.error("Помилка при додавані квартири.");
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

      <label>Короткий опис квартири:</label>
      <input
      className={css.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Ціна ($):</label>
      <input
      className={css.input}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        type="number"
      />

      <label>Детальний Опис:</label>
      <textarea
      className={css.texter}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label>Кількість кімнат:</label>
      <input
      className={css.input}
        value={rooms}
        onChange={(e) => setRooms(e.target.value)}
        type="number"
      />

      <label>Локація:</label>
      <input  className={css.input}
      value={location} onChange={(e) => setLocation(e.target.value)} />

      <label>Поверх:</label>
      <input
      className={css.input}
        value={floor}
        onChange={(e) => setFloor(e.target.value)}
        type="number"
      />

      <label>Площа (м²):</label>
      <input
      className={css.input}
        value={square}
        onChange={(e) => setSquare(e.target.value)}
        type="number"
      />
      <label>Фото (можна вибрати кілька):</label>
      <input type="file" multiple onChange={handleFileChange} />

      <Button
  type="submit"
  variant="outlined"
  sx={{ color: "#20B2AA", borderColor: "#20B2AA" }}
>
  Додати квартиру
</Button>
    </form>
  );
}
