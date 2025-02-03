import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={handleDelete}
      >
        Видалити
      </Button>
      <Button variant="contained" endIcon={<EditIcon />}>
        Редагувати
      </Button>
    </Stack>
  );
}
