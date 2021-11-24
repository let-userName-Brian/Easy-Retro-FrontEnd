import Backdrop from '@mui/material/Backdrop';
import { FormControl, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { postRetro } from '../Fetch';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

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

export default function RetroModal({ user_id }) {

  const [open, setOpen] = useState(false);
  const [retroName, setRetroName] = useState('');

  const [columnName1, setColumnName1] = useState('');
  const [columnName2, setColumnName2] = useState('');
  const [columnName3, setColumnName3] = useState('');

  const [tag1, setTag1] = useState('');
  const [tag2, setTag2] = useState('');
  const [tag3, setTag3] = useState('');
  const [retro, setRetro] = useState();

  const handleOpen = () => setOpen(true);
  //reset the state to default
  const handleClose = () => {
    setRetroName('');
    setColumnName1('');
    setColumnName2('');
    setColumnName3('');
    setTag1('');
    setTag2('');
    setTag3('');
    setOpen(false);
  }
  const navigate = useNavigate();

  //opens a new retro and generates a new UUID for it
  const openNewRetro = async () => {
    //setRetro()

    const newRetro = {
      retro_name: retroName,
      column_names: [columnName1, columnName2, columnName3],
      tags: [tag1, tag2, tag3]
    }

    postRetro(newRetro, user_id).then((retro_id) => {
      console.log("new retro response:", retro_id)
      navigate(`/retros/${retro_id}`)
    })
  }

  // useEffect(() => {
  //   async function sendRetro() {
  //     let output = 
  //     navigate(`/retros/${output}`)
  //   }
  //   if (retro) {
  //     sendRetro();
  //   }
  // }, [retro])

  return (
    <div>
      <Button variant="outlined" alt='Create' onClick={() => handleOpen()}>Create a new Retro</Button>
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
              Please select your Retro's options
            </Typography>
            <FormControl>
              <Grid container spacing={3}>
                <Grid item >
                  <TextField fullWidth required id='retro_name' label="Retro Name?" variant="outlined"
                    value={retroName} onChange={(e) => setRetroName(e.target.value)} />
                </Grid>
                <Grid item >
                  <TextField fullWidth id="column_1" label="Column 1 name" variant="outlined"
                    value={columnName1} onChange={(e) => setColumnName1(e.target.value)} sx={{ marginBottom: 1 }} />
                  <TextField fullWidth id="column_2" label="Column 2 name" variant="outlined"
                    value={columnName2} onChange={(e) => setColumnName2(e.target.value)} sx={{ marginBottom: 1 }} />
                  <TextField fullWidth id="column_3" label="Column 3 name" variant="outlined"
                    value={columnName3} onChange={(e) => setColumnName3(e.target.value)} sx={{ marginBottom: 1 }} />
                </Grid>
                <Grid item >
                  <TextField fullWidth id="tag_1" label="Tag1" variant="outlined"
                    value={tag1} onChange={(e) => setTag1(e.target.value)} sx={{ marginBottom: 1 }} />
                  <TextField fullWidth id="tag_2" label="Tag2" variant="outlined"
                    value={tag2} onChange={(e) => setTag2(e.target.value)} sx={{ marginBottom: 1 }} />
                  <TextField fullWidth id="tag_3" label="Tag3" variant="outlined"
                    value={tag3} onChange={(e) => setTag3(e.target.value)} sx={{ marginBottom: 2 }} />
                </Grid>
              </Grid>
            </FormControl>
            <Button variant="outlined" label='cancel' onClick={() => handleClose()}>Cancel</Button>
            <Button variant="outlined" label="create" onClick={(e) => openNewRetro()} sx={{ marginLeft: 2 }}>Create</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
