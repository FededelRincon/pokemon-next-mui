import { useContext } from 'react';
import { GetStaticProps, NextPage } from 'next';

import { Layout } from '../components/layouts'
import { PokemonList } from '../components/pokemon';

import { pokeApi } from '../api';

// import styles from '../styles/Home.module.css'
import { SearchContext } from '../context/search';

import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { Box } from '@mui/material';



interface Props {
  pokemons: SmallPokemon[];
  toggleTheme: React.MouseEventHandler<HTMLAnchorElement>
}

const HomePage: NextPage<Props> = ({ toggleTheme, pokemons }) => {

  const { isSearchActive, textSearch } = useContext(SearchContext);

  // hago todo el filtrado aca, entonces no sobreescribo pokemons, es decir, no vuelvo a hacer peticiones innecesarias
  let filtrado:SmallPokemon[] = pokemons;

  if( isSearchActive ){
      filtrado = pokemons.filter( pokemon => (
          pokemon.name.includes(textSearch.toLocaleLowerCase())
      ))
  } 

  return (
    <>
      <Box sx={{ backgroundColor: 'secondary.main'}} >
        
        <Layout title='Pokemons App' toggleTheme={toggleTheme} >

          <PokemonList pokemons={ filtrado } />

        </Layout>

      </Box>
    </>
  )
}



export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map( (poke, i) => ({
      ...poke,
      id: i + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ i+1 }.svg`
  }))

  return {
    props: {
      pokemons 
    }
  }
}



export default HomePage
