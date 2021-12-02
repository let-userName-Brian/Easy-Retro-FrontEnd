import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

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

export default function SearchBar({ retros, setSearchedRetros }) {

  let timer = 0;

  let handleSearch = async (searchText) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      let filteredRetros = retros?.filter(retro => {
        return retro.retro_name?.toLowerCase()?.includes(searchText?.toLowerCase()) || retro.tags?.includes(searchText?.toLowerCase())
      })
      setSearchedRetros(filteredRetros);
    }, 400)
  }
  
  return (
    <>
      <Search sx={{border: 'solid', borderColor: 'black', }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          type="text"
          className="search-input"
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search' }}
          onChange={async (e) => await handleSearch(e.target.value)}
        />
      </Search>
    </>
  )
}
