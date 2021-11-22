import React from 'react'
import {Divider, Grid} from '@mui/material'
import Navbar from './Navbar'
import Typography from '@mui/material/Typography';
import RetroCards from './RetroCards';
import SearchBar from './SearchBar';
import RetroModal from './RetroModal';

export default function Dashboard({users, darkMode, setDarkMode}) {



  return (
    <div>
      <nav>
        <Navbar users={users} darkMode={darkMode} setDarkMode={setDarkMode}/>
        <Divider color="gray" />
      </nav>
      <Grid container spacing={2} margin={0} sx={{overflow: 'hidden'}}>
        <Grid item xs={6}>
          <Typography>Welcome back {users?.[0]?.user_name}!</Typography>
        </Grid> 
        
        <Grid item xs={5}>
          <SearchBar />
        </Grid>
      </Grid>
        <Grid container padding={2} justifyContent="center" alignItems="center">
          <RetroModal />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h6">Your Active Retros</Typography>
        </Grid>

        <Grid container spacing={2} margin={0}>
          <RetroCards />
        </Grid>
    </div>
  )
}
