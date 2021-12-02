import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import { Alert, IconButton, Stack, TextField, Tooltip } from '@mui/material';
import AlertTitle from '@mui/material/AlertTitle';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ShareRetroModal({ url }) {
  const [open, setOpen] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setButtonClicked(false)
  };

  function copyUrl() {
    navigator.clipboard.writeText(url);
  }

  return (
    <div>
      <Tooltip title='Share Retro'><IconButton onClick={handleOpen}><ShareIcon /></IconButton></Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style} spacing={1}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Invite others to collaborate!
          </Typography>
          <Stack direction='row' alignItems='center' spacing={2}>
            <TextField fullWidth autoFocus onFocus={(e) => {
              e.target.select()
              copyUrl()
            }} value={url} />
            <IconButton onClick={() => {
              copyUrl()
              setButtonClicked(true)
            }}><ContentCopyIcon /></IconButton>
          </Stack>
          {buttonClicked && <Alert severity="success">
            <AlertTitle>URL copied to clipboard!</AlertTitle>
          </Alert>}
        </Stack>
      </Modal>
    </div>
  );
}