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
            </Layout>


        </>
        // <Layout title={ pokemon.name }>
        //     <Grid.Container css={{ marignTop: '5px'}} gap={2} >
        //         <Grid xs={12} sm={4}>
        //             <Card hoverable css={{ padding: '3opx' }}>
        //                 <Card.Body>
        //                     <Card.Image 
        //                         src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
        //                         alt={ pokemon.name}
        //                         width='100%'
        //                         height={ 200 }
        //                     />
        //                 </Card.Body>
        //             </Card>
        //         </Grid>

        //         <Grid xs={12} sm={8} >
        //             <Card>
        //                 <Card.Header css={{ display: 'flex', justifyContent:'space-between'}}>
        //                     <Text h1 transform='capitalize'>{pokemon.name}</Text>

        //                     <Button
        //                         color="gradient"
        //                         ghost={ !isInFavorites }
        //                         onClick={ onToggleFavorite }
        //                         size='sm'
        //                     >
        //                         {
        //                             isInFavorites ? 'En Favoritos' : 'Guardar'
        //                         }
        //                     </Button>
        //                 </Card.Header>

        //                 <Card.Body>
        //                     <Text h2 size={30}>Description:</Text>
        //                     <ul>
        //                         <li><Text size={20}>- Height: { (pokemon.height * 0.10).toFixed(1) } mts</Text></li>
        //                         <li><Text size={20}>- Weight: { (pokemon.weight * 0.10).toFixed(1) } kgs</Text></li>

        //                         <li><Text size={20}>- Types: 
        //                             {pokemon.types.map( (type) => (
        //                                 <Text transform='capitalize' size={15}> {type.type.name}</Text>
        //                             ))}
        //                         </Text></li>

        //                         {/* <li><Text size={20}>Moves: 
        //                             {pokemon.moves.map ( (algo) => (
        //                                 <Text transform='capitalize' size={15}> {algo.move.name}</Text>
        //                             ))}
        //                         </Text></li> */}

        //                         <li><Text size={20}>Moves: 
        //                             {pokemon.abilities.map ( (ab) => (
        //                                 ab.is_hidden 
        //                                     ? <Text transform='capitalize' size={15}> {ab.ability.name} </Text>
        //                                     : <></>
        //                             ))}
        //                         </Text></li>

        //                     </ul>
                            
                            
                            

        //                     <Text h2 size={30}>Sprites:</Text>
        //                     <Container direction='row' display='flex' gap={ 0 }>
        //                         <Image 
        //                             src={pokemon.sprites.front_default}
        //                             alt={pokemon.name}
        //                             width={ 100 }
        //                             height={ 100 }
        //                         />
        //                         <Image 
        //                             src={pokemon.sprites.back_default}
        //                             alt={pokemon.name}
        //                             width={ 100 }
        //                             height={ 100 }
        //                         />
        //                         <Image 
        //                             src={pokemon.sprites.front_shiny}
        //                             alt={pokemon.name}
        //                             width={ 100 }
        //                             height={ 100 }
        //                         />
        //                         <Image 
        //                             src={pokemon.sprites.back_shiny}
        //                             alt={pokemon.name}
        //                             width={ 100 }
        //                             height={ 100 }
        //                         />
        //                     </Container>
        //                 </Card.Body>
        //             </Card>
        //         </Grid>

        //     </Grid.Container>
        // </Layout>
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