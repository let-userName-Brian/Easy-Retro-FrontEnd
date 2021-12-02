import Backdrop from '@mui/material/Backdrop';
import { Divider, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { postRetro } from '../Fetch';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

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
  const [columnNames, setColumnNames] = useState(['Went Well', 'To Improve', 'Action Items'])
  const [maxVotes, setMaxVotes] = useState(10);
  const [tags, setTags] = useState([])

  const handleOpen = () => setOpen(true);
  //reset the state to default
  const handleClose = () => {
    setRetroName('');
    setColumnNames(['Went Well', 'To Improve', 'Action Items'])
    setTags([])
    setMaxVotes(10)
    setOpen(false);
  }
  const navigate = useNavigate();

  const openNewRetro = async () => {
    const newRetro = {
      retro_name: retroName,
      column_names: columnNames,
      tags,
      max_votes: maxVotes
    }

    postRetro(newRetro, user_id).then((retro_id) => {
      navigate(`/retros/${retro_id}`)
    })
  }

  //set max number of votes function 
  const handleMaxVotes = (e) => {
    setMaxVotes(e.target.value)
  }

  //add extra tags with a button click
  function changeColumnName(name, index) {
    let newColumnNames = [...columnNames]
    newColumnNames[index] = name
    setColumnNames(newColumnNames)
  }

  function removeColumnName(index) {
    let newColumnNames = [...columnNames]
    newColumnNames.splice(index, 1)
    setColumnNames(newColumnNames)
  }

  function addColumnName() {
    let newColumnNames = [...columnNames]
    newColumnNames.push('')
    setColumnNames(newColumnNames)
  }

  function changeTag(name, index) {
    let newTags = [...tags]
    newTags[index] = name
    setTags(newTags)
  }

  function removeTag(index) {
    let newTags = [...tags]
    newTags.splice(index, 1)
    setTags(newTags)
  }

  function addTag() {
    let newTags = [...tags]
    newTags.push('New Tag')
    setTags(newTags)
  }

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
          <Box sx={style} component='form' onSubmit={(e) => { e.preventDefault(); openNewRetro() }}>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
              Retro Options
              <Divider />
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2, fontStyle: 'oblique', marginBottom: 1 }}>
              Please select your Retro's options
            </Typography>
            <Grid container spacing={3}>
              <Grid item >
                <TextField fullWidth required id='retro_name' label="Retro Name?" variant="outlined"
                  value={retroName} onChange={(e) => setRetroName(e.target.value)} />
              </Grid>
              <Grid item >
                <Typography id="transition-modal-description" sx={{ fontStyle: 'oblique', marginBottom: 1 }}>
                  Need more columns? Don't worry, you can add them inside the retro!
                </Typography>
                {columnNames.map((name, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}><TextField fullWidth id={`column_${index}`} label={`Column ${index + 1}`} variant="outlined"
                    value={name} onChange={(e) => changeColumnName(e.target.value, index)} sx={{ my: 1 }} />
                    <Box>
                      <IconButton
                        aria-label="remove element"
                        onClick={(e) => removeColumnName(index)}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
                <Box sx={{ width: '100%', my: 1 }}>
                  <Box sx={{ mx: 'auto', width: 150 }}>
                    <Button
                      onClick={() => {
                        addColumnName();
                      }}
                      variant="contained" startIcon={<AddIcon />}>Add Column</Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item >
                <Typography id="transition-modal-description" sx={{ fontStyle: 'oblique', marginBottom: 2 }}>
                  Set the max number of votes for each user to vote on ideas or cards!
                </Typography>
                <TextField
                  id="outlined-number"
                  label="Set Max Votes"
                  type="number"
                  value={maxVotes}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleMaxVotes(e)}
                />
              </Grid>
              <Grid item >
                <Typography id="transition-modal-description" sx={{ fontStyle: 'oblique', marginBottom: 1 }}>
                  Set your Tags to easily search for this retro in the future!
                </Typography>
                {tags?.map((name, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}><TextField fullWidth id={`tag_${index}`} label={`Tag ${index + 1}`} variant="outlined"
                    value={name} onChange={(e) => changeTag(e.target.value, index)} sx={{ my: 1 }} />
                    <Box>
                      <IconButton
                        aria-label="remove element"
                        onClick={(e) => removeTag(index)}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
                <Box sx={{ width: '100%', my: 1 }}>
                  <Box sx={{ mx: 'auto', width: 116 }}>
                    <Button
                      onClick={() => {
                        addTag();
                      }}
                      variant="contained" startIcon={<AddIcon />}>Add Tag</Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ marginBottom: 1 }} />
            <Button variant="outlined" label='cancel' onClick={() => handleClose()} sx={{ marginLeft: 8 }}>Cancel</Button>
            <Button variant="outlined" type='submit' label="create" sx={{ marginLeft: 2 }}>Create</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
