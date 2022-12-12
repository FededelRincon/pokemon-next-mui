import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Image from 'next/image';

import { useState } from 'react';
import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';

// import confetti from 'canvas-confetti';

import { Pokemon, PokemonListResponse } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';


interface Props {
    pokemon: Pokemon;
    toggleTheme: React.MouseEventHandler<HTMLAnchorElement>
}


export const PokemonByNamePage: NextPage<Props> = ({ toggleTheme, pokemon }) => {

    const { height, id, name, sprites, types, weight } = pokemon

    console.log(pokemon)

    // const [isInFavorites, setIsInFavorites] = useState( localFavorites.existInFavorites(pokemon.id) );

    // const onToggleFavorite = () => {
    //     localFavorites.toggleFavorite( pokemon.id );
    //     setIsInFavorites( !isInFavorites);

    //     if( isInFavorites ) return;
    //     confetti({
    //         zIndex: 999,
    //         particleCount: 100,
    //         spread: 160,
    //         angle: -100,
    //         origin: {
    //             x: 1,
    //             y: 0,
    //         }
    //     })

    // }


    return (
        <>
            <Layout title='Pokemons App' toggleTheme={toggleTheme} >
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }} >
                            <Image 
                                src={ sprites.other?.dream_world.front_default || '/no-image.png' }
                                alt={ name }
                                width='175'
                                height='202'
                                priority
                                style={{ marginTop: '10px' }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{ padding: 10 }} >
                            <Typography style={{ textTransform: 'capitalize' }} variant="h4" gutterBottom>nombre:{name}</Typography>
                            <Typography variant="h4" gutterBottom>altura:{height}</Typography>
                            <Typography variant="h4" gutterBottom>numero:{id}</Typography>
                            <Typography variant="h4" gutterBottom>peso:{weight}</Typography>
                            <Typography variant="h4">Types:</Typography>
                            {
                                types.map( (type) => (
                                    <Typography variant="h4">{type.type.name}</Typography>
                                    ))
                                }
                        </Box>

                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex' }} >
                    <Typography variant="h4">Sprites:</Typography>
                    <Image 
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        width={ 200 }
                        height={ 200 }
                    />
                    <Image 
                        src={pokemon.sprites.back_default}
                        alt={pokemon.name}
                        width={ 200 }
                        height={ 200 }
                    />
                    <Image 
                        src={pokemon.sprites.front_shiny}
                        alt={pokemon.name}
                        width={ 200 }
                        height={ 200 }
                    />
                    <Image 
                        src={pokemon.sprites.back_shiny}
                        alt={pokemon.name}
                        width={ 200 }
                        height={ 200 }
                    />
                </Box>
            </Layout>
        </>
     )
};


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151') 
    // console.log(data)
    // crea un array de 0 a 151, con todos los nombres(arreglo de nombres)
    const pokemonNames: string[] = data.results.map( pokemon => pokemon.name );

    return {
        paths: pokemonNames.map( (name) => ({
            params: { name }    
        })),
        // fallback: false
        fallback: 'blocking'
    }
    //esta la generacion de forma dinamica de todos los posibles argumentos que el getStaticProps puede recibir
    //son pikachu, bolbasaur, charmander, etc.... son 151
}


export const getStaticProps: GetStaticProps = async (ctx) => {

    const { name } = ctx.params as { name: string };

    
    const pokemon = await getPokemonInfo( name )
    // const pokemon = await getPokemonInfo( name.toLocaleLowerCase() )

    if ( !pokemon ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            pokemon
        }
    }
}

export default PokemonByNamePage;