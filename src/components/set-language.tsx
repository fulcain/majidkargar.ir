import { GTranslate } from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { setLanguage } from "@/src/app/_helpers/setLanguage";

const SetLanguage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const setAppLanguage = async (language: "fa" | "en") => {
    await setLanguage(language);
    handleClose();
    window.location.reload();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    border: "2px solid #000",
    boxShadow: 24,
    dir: "rtl",
    p: 2,
  };

  return (
    <div className="relative inline-block text-left text-palette-primary hover:text-palette-secondary transition ">
      <button onClick={handleOpen}>
        <GTranslate sx={{ height: "20px", width: "20px" }} />
      </button>
      {open && (
        <Modal
          sx={{ direction: "rtl" }}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="bg-palette-primary rounded" sx={style}>
            <button
              className="rounded block w-full px-4 py-2 text-left hover:bg-palette-secondary hover:text-black transition"
            >
               Persian
            </button>
            <button
              className="rounded block w-full px-4 py-2 text-left hover:bg-palette-secondary hover:text-black transition"
            >
              English
            </button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default SetLanguage;
