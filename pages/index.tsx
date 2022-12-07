import React from 'react'
import { GetStaticProps, NextPage } from 'next';

import { Box, FormControlLabel, Switch, Typography } from '@mui/material'

import { Layout } from '../components/layouts'

import { pokeApi } from '../api';

import styles from '../styles/Home.module.css'

import { PokemonListResponse, SmallPokemon } from '../interfaces';



interface Props {
  pokemons: SmallPokemon[];
  toggleTheme: React.MouseEventHandler<HTMLAnchorElement>
}

const HomePage: NextPage<Props> = ({ toggleTheme, pokemons }) => {

  console.log(pokemons)

  return (
    <>
      {/* <div className={styles.container}> */}
      <div>
        <Layout title='Pokemons App' toggleTheme={toggleTheme} >

          <ul>
            {
              pokemons.map( (pokemon) => (
                <li key={pokemon.id} > 
                  {pokemon.id} - {pokemon.name} 
                </li>
              ))
            }
          </ul>

        </Layout>
        {/* <main className={styles.main}>
          <h1 className={styles.title}> algo </h1>
        </main> */}
      </div>
    
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
