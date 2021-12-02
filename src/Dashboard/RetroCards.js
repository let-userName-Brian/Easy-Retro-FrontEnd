import React, {useEffect} from 'react'
import { Grid, Stack } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import bar2 from './bar2.png';
import RetroCardMenu from './RetroCardMenu';
import { Box } from '@mui/system';
import { deleteRetro} from '../Fetch';


export default function RetroCards({ retros, searchedRetros, setUserRetros, user_id }) {

  const handleClick = (id) => {
    window.location.href = `/retros/${id}`;
  }
  
  async function removeRetro(retro_id, user_id) {
    console.log('Sent this retroID:', retro_id);
    deleteRetro(retro_id, user_id)
    .then(res => {
      console.log('returning retros:', res);
      setUserRetros(res);
    })
  }
  
  if (searchedRetros?.length >= 1) {
    return (
      <>
        {searchedRetros.map((retro, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={6} lg={3} sx={{ flexGrow: 1 }}>
              <Box sx={{border: 'solid', borderColor: '#90caf9', borderRadius: '8px', maxWidth: 350 }}>
              <Card key={index} sx={{ maxWidth: 350}}>
                <CardMedia
                  component="img"
                  href={retro?.retro_id}
                  height="140"
                  image={bar2}
                />
                <CardContent>
                  <Typography gutterBottom id="1" variant="h6" component="div">
                    {retro?.retro_name}
                  </Typography>
                  <Typography gutterBottom variant="p" component="div">
                    {retro.tags ? <span>{retro.tags.reduce((prev, curr) => prev + ' #' + curr, '')}</span>
                      : <></>
                    }
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleClick(retro?.retro_id)}>Open retro</Button>
                </CardActions>
              </Card>
              </Box>
            </Grid>
          )
        })}
      </>
    )
  } else {
    return (
      <>
        {retros?.map((retro, index) => (
          <Grid key={index} item xs={12} sm={6} md={6} lg={3} sx={{ flexGrow: 1 }}>
            <Box sx={{border: 'solid', borderColor: 'black', borderRadius: '8px', maxWidth: 350 }}>
            <Card key={index} sx={{ maxWidth: 350}}>
              <CardMedia
                component="img"
                href={retro?.retro_id}
                height="140"
                image={bar2}
              />
              <CardContent>
                <Typography gutterBottom id="1" variant="h6" component="div">
                  {retro?.retro_name}
                </Typography>
                <Typography gutterBottom variant="p" component="div">
                  {retro.tags ? <span>{retro.tags.reduce((prev, curr) => prev + ' #' + curr, '')}</span>
                    : <></>
                  }
                </Typography>
              </CardContent>
              <CardActions>
                <Stack direction='row' width='100%' justifyContent="space-between">
                  <Button size="small" onClick={() => handleClick(retro?.retro_id)}>Open retro</Button >
                  <Box />
                  <RetroCardMenu removeRetroFunc={()=>removeRetro(retro?.retro_id, user_id)} />
                </Stack>
              </CardActions>
            </Card>
            </Box>
          </Grid>
        ))}
      </>
    )
  }
}
