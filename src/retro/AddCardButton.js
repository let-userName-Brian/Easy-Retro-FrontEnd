import { Box, Icon, IconButton } from '@mui/material/';

export default function AddCardButton({ addCardFunc }) {
  return (
    <Box sx={{ width: 60, mx: 'auto' }}>
      <IconButton><Icon fontSize='large' onClick={addCardFunc}>add_circle</Icon></IconButton>
    </Box>)
}