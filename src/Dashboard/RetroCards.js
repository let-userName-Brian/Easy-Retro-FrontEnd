import React from 'react'
import {Grid} from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { mock_retros } from './MockData';
import bar2 from './bar2.png';

export default function RetroCards( retros ) {
  
  //retros comes back as a object within an object, this destructures it
  const retroInfo = retros.retros

   const handleClick = (id) => {
      console.log(id);
      window.location.href = `/retro/${id}`;   
  }

  
  return (
    <Grid item xs={12} sm={12} md={4} lg={4}>
          {retroInfo?.map((retro, index) => (   
        <Card key={index} sx={{ maxWidth: 345, marginBottom: 2}}>
          <CardMedia
            component="img"
            href={retro?.retro_id}
            height="140"
            image={bar2}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {retro?.retro_name}
            </Typography>
            <Typography gutterBottom variant="p" component="div">
              #{retro?.tags.join(' #')}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={()=> handleClick(retro?.retro_id)}>Open retro</Button>
          </CardActions>
        </Card> 
          ))}
      </Grid>
  )
}
