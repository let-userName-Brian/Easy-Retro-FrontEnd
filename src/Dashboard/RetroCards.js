import React from 'react'
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
export default function RetroCards({ retros, searchedRetros }) {

  const handleClick = (id) => {
    window.location.href = `/retros/${id}`;
  }

  function removeRetro() {

  }

  if (searchedRetros?.length >= 1) {
    return (
      <>
        {searchedRetros.map((retro, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={6} lg={3} sx={{ flexGrow: 1 }}>
              <Card key={index} sx={{ maxWidth: 350, marginBottom: 2 }}>
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
            <Card key={index} sx={{ maxWidth: 350, marginBottom: 2 }}>
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
                  <RetroCardMenu removeRetroFunc={removeRetro} />
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </>
    )
  }
}
