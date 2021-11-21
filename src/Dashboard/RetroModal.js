import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { generatePath } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RetroModal() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

//opens a new retro and generates a new UUID for it
const openNewRetro = () => {
  handleClose();
  const id = uuidv4();
  console.log('id', id);
  const path = generatePath('/retros', { id });
  window.location.href = path;
}
  
  return (
    <div>
      <Button variant="outlined" alt='Create' onClick={()=> handleOpen()}>Create a new Retro</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Retro Options
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              We can throw our retro options in a form in here.
            </Typography>
            <Button variant="outlined" onClick={()=>handleClose()}>Cancel</Button>
            <Button variant="outlined" onClick={() =>openNewRetro()}>Create</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
