import { Box, Icon, Button, Tooltip } from '@mui/material/';

export default function AddCardButton({ addCardFunc }) {
  return (
    <Box sx={{ width: 50, mx: 'auto' }}>
      <Tooltip title='Add Card'>
        <Button onClick={addCardFunc} sx={{ borderRadius: 20, minWidth: 50, width: 50, height: 50, p: 0 }}>
          <Icon fontSize='large'>add_circle</Icon>
        </Button>
      </Tooltip>
    </Box >)
}