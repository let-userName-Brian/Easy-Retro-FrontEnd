import React from 'react'
import {Divider, Grid} from '@mui/material'
import Navbar from './Navbar'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { mock_retros } from './MockData';

export default function Dashboard({users, darkMode, setDarkMode}) {

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));



  /*
  const handleClick = () => {
    render(
      <Retro />,
    )
  */

  return (
    <div>
      <nav>
        <Navbar users={users} darkMode={darkMode} setDarkMode={setDarkMode}/>
        <Divider color="gray" />
      </nav>
      <Grid container spacing={2} margin={0}>
      <Grid item xs={6}>
        <Typography>Welcome back {users?.[0]?.user_name}!</Typography>
        </Grid> 

        <Grid item xs={5}>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        <Divider />
        </Grid>

        <Grid item xs={12}>
          <Button variant="outlined">Create a new Retro</Button>
        </Grid>

        <Grid item xs={8}>
          <Typography variant="h5">Your Active Retros</Typography>
        </Grid>

        <Grid item xs={12} >
          {mock_retros.map((retro, index) => (
            
        <Card sx={{ maxWidth: 345, marginBottom: 2}}>
          <CardMedia
            component="img"
            alt={retro.retro_id}
            height="140"
            //image=""
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {retro.retro_name}
            </Typography>
            <Typography gutterBottom variant="p" component="div">
              #{retro.tags.join(', #')}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Open retro</Button>
          </CardActions>
        </Card>
            
          ))}
      </Grid>
      </Grid>
    </div>
  )
}
