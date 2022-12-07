import React from 'react'
import { GetStaticProps, NextPage } from 'next';

import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'

import { Layout } from '../components/layouts'

import { pokeApi } from '../api';

import styles from '../styles/Home.module.css'

import { PokemonListResponse, SmallPokemon } from '../interfaces';
import Image from 'next/image';



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

          <Grid 
            container 
            spacing={2} 
            columns={{ xs: 4, sm: 8, md: 12 }}
            style={{textAlign: "center"}}
            sx={{marginTop: 3}}
          >
            {
              pokemons.map( (pokemon) => (
                <Grid 
                  item
                  key={pokemon.id} 
                  xs={4} 
                >
                  <Card 
                  >
                    <CardActionArea>
                      <Image 
                        src={pokemon.img}
                        alt={pokemon.name}
                        width={150}
                        height={150}
                        style={{ marginTop: '10px' }}
                      />

                      <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography style={{ textTransform: 'capitalize' }} variant="h5" component="div"> {pokemon.name} </Typography>

                        <Typography variant="h5" component="div"> #{pokemon.id} </Typography>

                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            }
          </Grid>

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
