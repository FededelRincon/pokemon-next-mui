import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Image from 'next/image';

import { useState } from 'react';
import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { useTheme } from '@mui/material/styles';

// import confetti from 'canvas-confetti';

import { Pokemon, PokemonListResponse } from '../../interfaces';
import { getPokemonInfo, localFavorites, typePokeToHex } from '../../utils';

import styled from 'styled-components';



interface Props {
    pokemon: Pokemon;
    toggleTheme: React.MouseEventHandler<HTMLAnchorElement>;
    colorTypePoke: string;
}

const GradientDiv = styled.div`
    background: linear-gradient(to bottom right, #ddd 10%, ${props => props.color} 35%, #000 85%);;
`;



export const PokemonByNamePage: NextPage<Props> = ({ toggleTheme, pokemon, colorTypePoke }) => {

    const { height, id, name, sprites, types, weight } = pokemon

    const [isInFavorites, setIsInFavorites] = useState( localFavorites.existInFavorites(pokemon.id) );

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite( pokemon.id );
        setIsInFavorites( !isInFavorites);

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

    }


    

    return (
        <>
            <GradientDiv color={`${colorTypePoke}`}>

                <Layout title='Pokemons App' toggleTheme={toggleTheme} >
                        <Button 
                            variant="contained"
                            onClick={ onToggleFavorite }
                            color={'success'}
                            sx={{marginTop: 2}}
                        >
                            {
                                isInFavorites ? 'Delete from favorites' : 'Save in favorites'
                            }
                        </Button>
                    <Grid 
                        container 
                        spacing={2}
                        alignItems= {"center"}
                        justifyContent={'center'}
                    >
                        <Grid item >
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                            }} >
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

                        <Grid item sx={{padding: 10}}></Grid>
                        
                        <Grid item 
                        >

                            <Card 
                                sx={{ minWidth: 300, backgroundColor: 'success.main' }} 
                                elevation={10}
                            >
                                <CardContent>
                                    <Typography sx={{ mb: 1.5, textTransform: 'capitalize' }} align='center' variant="h4" component="div">
                                        {name}
                                    </Typography>
                                    <Typography sx={{ mb: 0.5, textTransform: 'capitalize' }} variant="h6" color="text.secondary">
                                        height: {(height * 0.1).toFixed(1)} mts
                                    </Typography>
                                   <Typography sx={{ mb: 0.5, textTransform: 'capitalize' }} variant="h6" color="text.secondary">
                                       weight: {(weight * 0.1).toFixed(1)} kg
                                    </Typography>
                                    <Typography sx={{ mb: 0.5, textTransform: 'capitalize' }} variant="h6" color="text.secondary">
                                        Pokemon # {id}
                                    </Typography>
                                    <Typography sx={{ mb: 0.5, textTransform: 'capitalize' }} variant="h6" color="text.secondary">
                                        Types: 
                                    </Typography>
                                    {
                                        types.map( (type) => (
                                            <Typography key={type.type.name} sx={{ ml: 3.5, textTransform: 'capitalize' }} style={{ display: 'list-item' }} variant="h6" color="text.secondary">{type.type.name}</Typography>
                                        ))
                                    }

                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Divider sx={{ paddingTop: 5}}>
                        <Typography variant="h4"> Sprites </Typography>
                    </Divider>

                    <Box >
                        <Grid container sx={{ display: 'flex', justifyContent:"center" }}>
                            <Grid item>
                                <Image 
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={ 200 }
                                    height={ 200 }
                                />
                            </Grid>
                            <Grid item>
                                <Image 
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={ 200 }
                                    height={ 200 }
                                />
                            </Grid>
                                <Image 
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={ 200 }
                                    height={ 200 }
                                />
                            <Grid item>
                                <Image 
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={ 200 }
                                    height={ 200 }
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Layout>
            </GradientDiv>
        </>
     )
};





// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151') 
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


    // get info for background-color
    let pokemonTipe1 = pokemon!.types[0].type.name
    let colorTypePoke = await typePokeToHex(pokemonTipe1) 


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
            pokemon,
            colorTypePoke
        }
    }
}

export default PokemonByNamePage;