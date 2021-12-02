import { Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import RetroCards from './RetroCards';
import SearchBar from './SearchBar';
import RetroModal from './RetroModal';
import { getRetrosByUserId } from '../Fetch';
import Fade from 'react-reveal/Fade';
import RubberBand from 'react-reveal/RubberBand';


export default function Dashboard({ user, user_id }) {

  const [searchedRetros, setSearchedRetros] = useState([])
  const [userRetros, setUserRetros] = useState()

  useEffect(() => {
    if (!user) {
      return
    }
    getRetrosByUserId(user.user_id)
      .then(userRetros => setUserRetros(userRetros))
  }, [user])

  return (
    <div>
        <Fade top>
      <Grid container spacing={2} margin={0} sx={{ overflow: 'hidden' }}>
        <Grid item xs={6}>
          <Typography>Welcome back {user?.user_name}!</Typography>
        </Grid>
        <Grid item xs={5}>
          <SearchBar retros={userRetros} setSearchedRetros={setSearchedRetros} />
        </Grid>
      </Grid>
        </Fade>
        <RubberBand>
      <Grid container padding={2} justifyContent="center" alignItems="center">
        <RetroModal user_id={user_id} />
      </Grid>
        </RubberBand>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant="h6" sx={{marginLeft: '1%'}}>Your Active Retros</Typography>
      </Grid>
      <Fade bottom>
        <Grid container spacing={2} margin={0} >
          <RetroCards retros={userRetros} searchedRetros={searchedRetros} />
        </Grid>
      </Fade>
    </div>
  )
}
