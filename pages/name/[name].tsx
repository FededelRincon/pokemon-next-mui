import { GetStaticProps, GetStaticPaths, NextPage } from 'next';

import { useState } from 'react';
import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';

// import confetti from 'canvas-confetti';

import { Pokemon, PokemonListResponse } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';


interface Props {
    pokemon: Pokemon;
}


export const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {



    const [isInFavorites, setIsInFavorites] = useState( localFavorites.existInFavorites(pokemon.id) );

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
            <h1>{pokemon.name}</h1>
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

    // console.log('getStaticProps')
    // console.log(pokemon)
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