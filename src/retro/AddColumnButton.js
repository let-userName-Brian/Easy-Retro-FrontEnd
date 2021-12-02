import { Box, Button, Icon, Paper, Stack, Typography } from '@mui/material/';

export default function AddColumnButton({ addColumnFunc }) {
  return (
    <Box sx={{
      m: 1,
      justifySelf: 'stretch',
    }} >
      <Paper elevation={12} sx={{ width: '100%', borderRadius: '18px', border: 'solid', borderColor: '#aaa', borderWidth: '.12em' }} >
        <Button onClick={addColumnFunc} sx={{ borderRadius: '20px', height: '100%' }}>
          <Stack sx={{
            width: 90,
            height: '100%',
            m: '2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon fontSize='large'>add_circle</Icon>
            <Typography variant='body2'>Add Column</Typography>
          </Stack>
        </Button>
      </Paper >
    </Box >)
}