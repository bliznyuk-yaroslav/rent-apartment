import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
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
      await dispatch(deleteApartment(apartmentId)).unwrap();
      navigate("/");
    } catch (error) {
      console.log("Помилка при видаденні:", error);
    }
  };
  return (
  
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={handleDelete}
        sx={{ color: "#20B2AA", borderColor: "#20B2AA", ml:1}}
      >
        Видалити квартиру
      </Button>
  );

}