import { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { selectorApartmentId } from "../../redux/item/selector";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateApartment } from "../../redux/item/operation";
import css from "./FormUpdate.module.css";
import Button from "@mui/material/Button";
import { CircleX } from "lucide-react";
import { X } from "lucide-react";

export default function FormUpdate({ closeModal }) {
  const dispatch = useDispatch();
  const titleInput = useId();
  const priceInput = useId();
  const descriptionInput = useId();
  const roomsInput = useId();
  const locationInput = useId();
  const floorInput = useId();
  const squareInput = useId();
  const apartment = useSelector(selectorApartmentId);
  const [photo, setPhoto] = useState([]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().max(90, "Максимальна кількість 90 символів "),
    price: Yup.number()
      .min(0)
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .max(10000, "Максимальна ціна оренди квартири 10000$"),
    description: Yup.string().max(
      335,
      "Максимальна кількість до 335 символів "
    ),
    rooms: Yup.number().max(10, "Максимальна кількість кімнат").nullable(),
    location: Yup.string(),
    floor: Yup.number().max(30, "Максимальна кількість поверхів").nullable(),
    square: Yup.number()
      .max(300, "Максимальна кількість квадратних метрів квартири")
      .nullable(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  useEffect(() => {
    setValue("title", apartment.title);
    setValue("price", apartment.price);
    setValue("description", apartment.description);
    setValue("rooms", apartment.rooms);
    setValue("location", apartment.location);
    setValue("floor", apartment.floor);
    setValue("square", apartment.square);
    setPhoto(apartment.photo || []);
  }, [apartment, setValue]);

  const onSubmit = (data) => {
    const apartmentId = apartment._id;
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("rooms", data.rooms);
    formData.append("location", data.location);
    formData.append("floor", data.floor);
    formData.append("square", data.square);
    photo.forEach((file) => {
      formData.append("photo", file);
    });
    dispatch(updateApartment({ _id: apartmentId, formData }))
      .then(() => {
        closeModal();
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Помилка при оновлені квартири.");
      });
    toast.success("Квартира Оновилась!", { duration: 1000 });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPhoto((prevPhotos) => [...prevPhotos, ...files]);
  };
  const handleRemovePhoto = (indexToRemove) => {
    setPhoto((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <p onClick={closeModal} className={css.btnCls}>
        <CircleX style={{ color: "#20B2AA" }} size={30} />
      </p>
      <h2 className={css.titleForm}>Редагування</h2>

      <div className={css.inputGroup}>
        <label htmlFor={titleInput}>Короткий опис</label>
        <input
          type="text"
          id={titleInput}
          {...register("title")}
          placeholder="Введіть короткий опис"
          className={errors.title ? css.errorInput : css.input}
        />
        {errors.title && (
          <span className={css.errorText}>{errors.title.message}</span>
        )}
      </div>

      <div className={css.inputGroup}>
        <label htmlFor={priceInput}>Ціна</label>
        <input
          type="number"
          id={priceInput}
          {...register("price")}
          placeholder="Введіть ціну"
          className={errors.price ? css.errorInput : css.input}
        />
        {errors.price && (
          <span className={css.errorText}>{errors.price.message}</span>
        )}
      </div>

      <div className={css.inputGroup}>
        <label htmlFor={descriptionInput}>Опис</label>
        <textarea
          id={descriptionInput}
          {...register("description")}
          placeholder="Введіть опис"
          className={errors.description ? css.errorInput : css.inputDesc}
        />
        {errors.description && (
          <span className={css.errorText}>{errors.description.message}</span>
        )}
      </div>

      <div className={css.inputGroup}>
        <label htmlFor={roomsInput}>Кількість кімнат</label>
        <input
          type="number"
          id={roomsInput}
          {...register("rooms")}
          placeholder="Введіть кількість кімнат"
          className={errors.rooms ? css.errorInput : css.input}
        />
        {errors.rooms && (
          <span className={css.errorText}>{errors.rooms.message}</span>
        )}
      </div>

      <div className={css.inputGroup}>
        <label htmlFor={locationInput}>Локація</label>
        <input
          type="text"
          id={locationInput}
          {...register("location")}
          placeholder="Введіть локацію"
          className={errors.location ? css.errorInput : css.input}
        />
        {errors.location && (
          <span className={css.errorText}>{errors.location.message}</span>
        )}
      </div>

      <div className={css.inputGroup}>
        <label htmlFor={floorInput}>Поверх</label>
        <input
          type="number"
          id={floorInput}
          {...register("floor")}
          placeholder="Введіть поверх"
          className={errors.floor ? css.errorInput : css.input}
        />
        {errors.floor && (
          <span className={css.errorText}>{errors.floor.message}</span>
        )}
      </div>

      <div className={css.inputGroup}>
        <label htmlFor={squareInput}>Площа</label>
        <input
          type="number"
          id={squareInput}
          {...register("square")}
          placeholder="Введіть площу"
          className={errors.square ? css.errorInput : css.input}
        />
        {errors.square && (
          <span className={css.errorText}>{errors.square.message}</span>
        )}
      </div>
      <label>Фото (можна вибрати кілька):</label>
      <input type="file" multiple onChange={handleFileChange} />
      <div>
        {photo.length > 0 && <p>Обрані фото:</p>}
        <ul>
          {photo.map((file, index) => (
            <li key={index} className={css.iconCls}>
              {file.name}
              <button
                onClick={() => handleRemovePhoto(index)}
                style={{
                  background: "none",
                  border: "none",
                  color: "grey",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                <X />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant="outlined"
        type="submit"
        sx={{ color: "#20B2AA", borderColor: "#20B2AA" }}
      >
        Редагувати
      </Button>
    </form>
  );
}
