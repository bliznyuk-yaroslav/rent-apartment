import { Button, Modal } from "@mui/material";
import css from "./AddApart.module.css";
import { useEffect, useState } from "react";
import FormAdd from "../FormAdd/FormAdd";
export default function AddApart() {
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
      <div>
        <Button
          variant="outlined"
          sx={{
            color: "#20B2AA",
            borderColor: "#20B2AA",
            margin: "0 auto",
            display: "block",
            width: "400px",
          }}
          onClick={openModal}
        >
          Добавити нову квартиру
        </Button>
      </div>
      <div>
        {isModalOpen && (
          <Modal
          open={isModalOpen}
          onClose={closeModal}
          disableScrollLock={true}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div className={css.modalContent}>
            <FormAdd closeModal={closeModal} />
          </div>
        </Modal>
        )}
      </div>
    </div>
  );
}
