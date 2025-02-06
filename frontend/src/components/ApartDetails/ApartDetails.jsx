import { useSelector } from "react-redux";
import { selectorApartmentId } from "../../redux/item/selector";
import ApartOption from "../ApartOption/ApartOption";
import css from "./ApartDetails.module.css";
import ButtonDel from "../ButtonDel/ButtonDel";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import FormUpdate from "../FormUpdate/FormUpdate";

export default function ApartDetails() {
  const apartmentId = useSelector(selectorApartmentId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }
  
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [isModalOpen]);

  return (
    <div>
      <h1 className={css.title}>{apartmentId.title}</h1>
      <ApartOption apartment={apartmentId} />
      <h3 className={css.head}>Деталі</h3>
      <p>{apartmentId.description}</p>
      <h3 className={css.head}>Ціна</h3>
      <p>{apartmentId.price} $</p>
      <div className={css.btn}>
        <ButtonDel apartmentId={apartmentId._id} />
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          sx={{ color: "#20B2AA", borderColor: "#20B2AA", ml: 1 }}
          onClick={openModal}
        >
          Редагувати
        </Button>
      </div>
      {isModalOpen && (
        <Modal   open={isModalOpen}
        onClose={closeModal}
        disableScrollLock={true}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className={css.modalContent}>
            <FormUpdate closeModal={closeModal} />
          </div>
        </Modal>
      )}
    </div>
  );
}
