import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Button } from '@mui/material';
import { Grid, Card, CardMedia, CardContent, CardActions} from '@mui/material';
import {Typography} from '@mui/material';
import bar2 from "./bar2.png";

export default function SearchBar({ retros, searchedRetros, setSearchedRetros }) {

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

  //function to be able to search retros by name or tags
  const handleSearch = (e) => {
    console.log(e.target.value);
    let search = e.target.value.toString()
    let filteredRetros = retros.filter(retro => {
      return retro.retro_name?.toLowerCase()?.includes(search.toLowerCase()) || retro.tags?.includes(search.toLowerCase())
    })
    if (search.length === 0) {
      filteredRetros = retros;
    }
    console.log('Fretros', filteredRetros)
    return filteredRetros;
  }
  // setSearchedRetros(filteredRetros);

  const searchResults = (searchedRetros) => {
    console.log('searchedRetros', searchedRetros)
    // return searchedRetros?.map(retro => {
    //   <Grid item xs={12} sm={6} md={4} lg={3} key={retro.id}>
    //         <Card>
    //           <CardMedia
    //             style={{ height: 0, paddingTop: '56.25%' }}
    //             image={bar2}
    //             title="Contemplative Reptile"
    //           />
    //           <CardContent>
    //             <Typography gutterBottom variant="headline" component="h2">
    //               {retro.name}
    //             </Typography>
    //             <Typography component="p">
    //               {retro.description}
    //             </Typography>
    //           </CardContent>
    //           <CardActions>
    //             {/* <Button size="small" color="primary" onClick={() => handleClick(retro.id)}>
    //               See Retro
    //             </Button> */}
    //           </CardActions>
    //         </Card>
    //       </Grid>
    // })
  }


  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => handleSearch(e)}
        />
      <Button type="submit" onClick={() => searchResults()}>Search</Button>
      </Search>
    </>
  )
}
