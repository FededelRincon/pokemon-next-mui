import { Button, CardContent, Divider, Grid, Paper, Typography, Card } from '@mui/material';
import { Box } from '@mui/system';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Image from 'next/image';

import { useState } from 'react';
import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';

import confetti from 'canvas-confetti';

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

        if( isInFavorites ) return;
        confetti({
            zIndex: 999,
            particleCount: 200,
            spread: 160,
            angle: -50,
            origin: {
                x: 0,
                y: 0,
            }
        })

    }



    return (
        <>
            <GradientDiv color={`${colorTypePoke}`}>

                <Layout title='Pokemons App' toggleTheme={toggleTheme} >
                        <Button 
                            variant="contained"
                            onClick={ onToggleFavorite }
                            color={'primary'}
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
                        <Grid item 
                            // xs={12} sm={4}
                        >
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
                                sx={{ minWidth: 300, backgroundColor: 'primary.main' }} 
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
                                        <Typography sx={{ ml: 3.5, textTransform: 'capitalize' }} style={{ display: 'list-item' }} variant="h6" color="text.secondary">{type.type.name}</Typography>
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
    const pokemons151 = [...Array(151)].map( ( value, index ) => `${ index + 1 }` );
  
    return {
        paths: pokemons151.map( id => ({
            params: { id }
        })),
        // fallback: false
        fallback: 'blocking'
    }
}


export const getStaticProps: GetStaticProps = async (ctx) => {

    const { id } = ctx.params as { id: string };
    
    const pokemon = await getPokemonInfo( id );

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
        },
        revalidate: 86400, // 60 * 60 * 24,
    }
}

export default PokemonByNamePage;