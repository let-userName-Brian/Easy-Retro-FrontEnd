import { Typography } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

theme.typography.h2 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
};

export default function RetroTitle({ title }) {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant='h2'>{title}</Typography>
    </ThemeProvider>
  )
}