import { useSelector } from "react-redux";
import { selectorApartmentId } from "../../redux/item/selector";
import React, { useEffect, useState } from "react";
import css from "./ApartPhoto.module.css";
import { CircleX } from "lucide-react";
import def from "../../assets/default.jpg";

export default function ApartPhot() {
  const apartamentId = useSelector(selectorApartmentId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const photos =
    apartamentId.photo && apartamentId.photo.length > 0
      ? apartamentId.photo
      : [def];

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div className={css.container}>
      <img
        src={photos[currentIndex]}
        alt="photoApart"
        className={css.photo}
        onClick={openModal}
      />
      {apartamentId.photo && apartamentId.photo.length > 0 && (
        <>
          <button onClick={handlePrev} className={css.button}>
            &lt;
          </button>
          <button onClick={handleNext} className={css.button}>
            &gt;
          </button>
          {isModalOpen && (
            <div className={css.modal}>
              <p onClick={closeModal} className={css.btnCls}>
                <CircleX style={{ color: "white" }} size={40} />
              </p>
              <img
                src={photos[currentIndex]}
                alt="photoApart"
                className={css.modalPhoto}
              />
              <button onClick={handlePrev} className={css.button}>
                &lt;
              </button>
              <button onClick={handleNext} className={css.button}>
                &gt;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
