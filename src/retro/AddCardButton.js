import { Box, Icon, IconButton } from '@mui/material/';

export default function AddCardButton({ addCardFunc }) {
  return (
    <Box sx={{ width: 60, mx: 'auto' }}>
      <IconButton onClick={addCardFunc}><Icon fontSize='large'>add_circle</Icon></IconButton>
    </Box >)
}