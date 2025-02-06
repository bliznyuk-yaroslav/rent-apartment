import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteApartment } from "../../redux/catalog/operation";

export default function ButtonDel({ apartmentId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = async () => {
    if (!apartmentId) return;
    console.log(apartmentId);
    try {
      await dispatch(deleteApartment(apartmentId))
        .unwrap()
        .then(() => {
          toast.success("Квартира успішно видалена!", { duration: 1000 });
          navigate("/");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
    } catch (error) {
      toast.error("Помилка при видаленні квартири.");
    }
  };
  return (
    <Button
      variant="outlined"
      startIcon={<DeleteIcon />}
      onClick={handleDelete}
      sx={{ color: "#20B2AA", borderColor: "#20B2AA" }}
    >
      Видалити квартиру
    </Button>
  );
}
