import React from 'react'
import { GetStaticProps, NextPage } from 'next';

import { Layout } from '../components/layouts'
import { PokemonList } from '../components/pokemon';

import { pokeApi } from '../api';

// import styles from '../styles/Home.module.css'

import { PokemonListResponse, SmallPokemon } from '../interfaces';



interface Props {
  pokemons: SmallPokemon[];
  toggleTheme: React.MouseEventHandler<HTMLAnchorElement>
}

const HomePage: NextPage<Props> = ({ toggleTheme, pokemons }) => {

  return (
    <>
      {/* <div className={styles.container}> */}
      <div>
        <Layout title='Pokemons App' toggleTheme={toggleTheme} >

          <PokemonList pokemons={pokemons} />

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
