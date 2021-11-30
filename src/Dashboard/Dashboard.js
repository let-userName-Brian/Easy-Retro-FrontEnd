import {Grid} from '@mui/material'
import {useState, useEffect} from 'react'
import Typography from '@mui/material/Typography';
import RetroCards from './RetroCards';
import SearchBar from './SearchBar';
import RetroModal from './RetroModal';
import { getRetrosByUserId } from '../Fetch';


export default function Dashboard({user, retros, user_id }) {

  const [searchedRetros, setSearchedRetros] = useState([])

  useEffect(() => {
    getRetrosByUserId(user_id)
  }, [])

  return (
    <div>
      <Grid container spacing={2} margin={0} sx={{overflow: 'hidden'}}>
        <Grid item xs={6}>
          <Typography>Welcome back {user?.user_name}!</Typography>
        </Grid> 
        <Grid item xs={5}>
          <SearchBar  retros={retros} setSearchedRetros={setSearchedRetros}/>
        </Grid>
      </Grid>
        <Grid container padding={2} justifyContent="center" alignItems="center">
          <RetroModal user_id={user_id}/>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h6">Your Active Retros</Typography>
        </Grid>
        <Grid container spacing={2} margin={0} > 
          <RetroCards retros={retros} searchedRetros={searchedRetros}/>
        </Grid>
    </div>
  )
}
