// import * as React from "react";
// import FormUpdate from "../FormUpdate/FormUpdate";
// import { useState } from "react";
// import { useEffect } from "react";

// export default function ModalUpdate() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Escape") {
//         closeModal();
//       }
//     };
//     if (isModalOpen) {
//       window.addEventListener("keydown", handleKeyDown);
//     } else {
//       window.removeEventListener("keydown", handleKeyDown);
//     }
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isModalOpen]);
//   return <FormUpdate />;
// }
//   <div>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Оновлення квартири
//           </Typography>

//           <Typography sx={{ mt: 2 }}>
//             <FormUpdate />
//           </Typography>
//           <Button
//             variant="outlined"
//             sx={{ color: "#20B2AA", borderColor: "#20B2AA", ml: 1 }}
//             onClick={handleClose}
//           >
//             Закрити
//           </Button>
//           <Button
//             variant="outlined"
//             sx={{ color: "#20B2AA", borderColor: "#20B2AA", ml: 1 }}
//           >
//             Оновити
//           </Button>
//         </Box>
//       </Modal>
//     </div>
