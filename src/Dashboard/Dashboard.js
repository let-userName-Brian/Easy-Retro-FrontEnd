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
        <Grid container spacing={2} padding={2}>
          <Grid item xs={3} display='flex' justifyContent='center' alignItems='center'>
            <Typography>Welcome back {user?.user_name}!</Typography>
          </Grid>
          <Grid item xs={6}>
            <SearchBar retros={userRetros} setSearchedRetros={setSearchedRetros} />
          </Grid>
        </Grid>
      </Fade>
      <RubberBand>
        <Grid container padding={2} justifyContent="center" alignItems="center">
          <RetroModal user_id={user_id} />
        </Grid>
      </RubberBand>
      <Typography variant="h6" sx={{ ml: 2 }}>Your Active Retros</Typography>
      <Fade bottom>
        <Grid container spacing={2} padding={2}>
          <RetroCards retros={userRetros} searchedRetros={searchedRetros} setUserRetros={setUserRetros} userRetros={userRetros} user_id={user_id} />
        </Grid>
      </Fade>
    </div>
  )
}
