import { Box, Paper, Icon, TextField, Skeleton, IconButton } from '@mui/material/';

export default function AddCardButton({ addCardFunc }) {
  return (
    <Box sx={{ width: 60, mx: 'auto' }}>
      <IconButton><Icon fontSize='large' onClick={addCardFunc}>add_circle</Icon></IconButton>
    </Box>)
}