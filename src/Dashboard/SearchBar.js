import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export default function SearchBar({user, retros, user_id }) {

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


  
  // console.log("retros",retros);
  // console.log(retros[0].retro_name)

  // console.log(user_id);

//function to be able to search retros by name or tags
  const handleSearch = (e) => {
    console.log(e.target.value);
    let search = e.target.value.toString()
    let filteredRetros = retros.filter(retro =>{
      return retro.retro_name?.toLowerCase()?.includes(search.toLowerCase()) || retro.tags?.includes(search.toLowerCase())
    })
    if(search.length === 0) {
      filteredRetros = retros;
    }
    console.log('Fretros',filteredRetros)
      return filteredRetros;
  }



  return (
    <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => handleSearch(e)}
        />
      </Search>
  )
}
