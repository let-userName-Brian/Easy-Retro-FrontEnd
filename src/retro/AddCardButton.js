import { Box, Icon, IconButton, Tooltip } from '@mui/material/';

export default function AddCardButton({ addCardFunc }) {
  return (
    <Box sx={{ width: 60, mx: 'auto' }}>
      <Tooltip title='Add Card'><IconButton onClick={addCardFunc}><Icon fontSize='large'>add_circle</Icon></IconButton></Tooltip>
    </Box >)
}