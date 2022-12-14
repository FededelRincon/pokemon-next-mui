import { FC, useContext, useState } from "react";
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from "next/router";

import { styled, alpha } from '@mui/material/styles';
import { AppBar, Badge, Box, InputBase, Menu, MenuItem, Toolbar, Typography } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { SearchContext } from '../../context/search';
import { SwitchSelector } from './index';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
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
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



interface Props {
    toggleTheme: React.MouseEventHandler<HTMLAnchorElement>
}

export const Navbar: FC<Props> = ({ toggleTheme }) => {

  const { toggleSearchActive, updateTextSearch } = useContext(SearchContext);


  const onSearchTerm = ( e:any ) => {
    const text = e.target.value;

    if (text.length !== 0) {
        toggleSearchActive(true)
        updateTextSearch(text)
    } else {
        toggleSearchActive(false)
        updateTextSearch('')
    }
  }

  const router = useRouter();

  const onFavorite = () => {
    router.push(`/favorites`)
}

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={ onFavorite }>
        <IconButton size="large" color="inherit">
          <Badge >
            <FavoriteIcon/>
          </Badge>
        </IconButton>
        <p>Favorites</p>
      </MenuItem>

      <MenuItem>
        {/* switch day/night in mobile screen */}
        <SwitchSelector toggleTheme ={toggleTheme} />

      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <NextLink href="/" style={{textDecoration: 'none', marginTop: 4 }} >
            <Image 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                alt="icono de la app"
                width={50}
                height={50}
            />
          </NextLink>


          <IconButton
            size="medium"
            edge="end"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 1 }}
            disableRipple
          >
            <NextLink href="/" style={{textDecoration: 'none'}} >
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, marginRight: 2 }}>

                <Typography variant="h4" sx={{ textDecoration: 'none', color: 'white', marginTop: 1, marginLeft: 1 }}>
                  Poke App
                </Typography>
              </Box>
            </NextLink>

          </IconButton>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Pokemon…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={ (e) => onSearchTerm(e) }
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit">
              <Badge>
                <FavoriteIcon onClick={ onFavorite } />
              </Badge>
            </IconButton>

            {/* switch day/night in laptop screen */}
            <SwitchSelector toggleTheme ={toggleTheme} />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
