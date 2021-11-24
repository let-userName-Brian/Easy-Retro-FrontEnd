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

export default function RetroModal() {

  const [open, setOpen] = useState(false);
  const [retroName, setRetroName] = useState('');

  const [columnName1, setColumnName1] = useState('');
  const [columnName2, setColumnName2] = useState('');
  const [columnName3, setColumnName3] = useState('');

  const [tag1, setTag1] = useState('');
  const [tag2, setTag2] = useState('');
  const [tag3, setTag3] = useState('');
  const [retro, setRetro] = useState({
    retro_name: '',
    column_names: [],
    tags: []
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  //opens a new retro and generates a new UUID for it
  const openNewRetro = async (retro) => {
    setRetro((prevState) => {
      const newRetro = {
        retro_name: retroName,
        column_names: [columnName1, columnName2, columnName3],
        tags: [tag1, tag2, tag3]
      }
      return newRetro
    })
  }

  useEffect(() => {
    async function sendRetro() {
      let output = await postRetro(retro)
      console.log("output in modal:", output)
      navigate(`/retros/${output}`)
    }
    sendRetro();
  }, [retro])

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
                  <TextField
                    required
                    id='retro_name'
                    value={retroName}
                    onChange={(e) => setRetroName(e.target.value)}
                    label="Retro Name?"
                  />
                </Grid>
                <Grid item >
                  <TextField id="column_1" label="Column 1 name" variant="outlined"
                    value={columnName1} onChange={(e) => setColumnName1(e.target.value)} />
                  <TextField id="column_2" label="Column 2 name" variant="outlined"
                    value={columnName2} onChange={(e) => setColumnName2(e.target.value)} />
                  <TextField id="column_3" label="Column 3 name" variant="outlined"
                    value={columnName3} onChange={(e) => setColumnName3(e.target.value)} />
                </Grid>
                <Grid item >
                  <TextField id="tag_1" label="#Tags" variant="outlined"
                    value={tag1} onChange={(e) => setTag1(e.target.value)} />
                  <TextField id="tag_2" label="#Tags" variant="outlined"
                    value={tag2} onChange={(e) => setTag2(e.target.value)} />
                  <TextField id="tag_3" label="#Tags" variant="outlined"
                    value={tag3} onChange={(e) => setTag3(e.target.value)} />
                </Grid>
              </Grid>
            </FormControl>
            <Button variant="outlined" onClick={() => handleClose()}>Cancel</Button>
            <Button variant="outlined" onClick={(e) => openNewRetro(retro)}>Create</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
