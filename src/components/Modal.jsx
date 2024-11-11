import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.gray",
  border: "2px solid black",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    handleOpen();
  }, [])

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography className="text-gray-100" id="modal-modal-title" variant="h6" component="h2">
            Hello
          </Typography>
          <Typography className="text-gray-100" id="modal-modal-description" sx={{ mt: 2 }}>
            Live chat is now available. Check it out <Link to={"/chat"}>here</Link>.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
