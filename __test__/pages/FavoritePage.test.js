import React from 'react';
import { getAllByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import mockRouter from 'next-router-mock';

import { Box } from '@mui/material';

import { Layout } from '../../components/layouts/Layout'
import { NoFavorites } from '../../components/ui/NoFavorites'
import { FavoritePokemons } from '../../components/pokemon/FavoritePokemons'

// se mockea el useRouter() si o si     // https://www.npmjs.com/package/next-router-mock
jest.mock('next/router', () => require('next-router-mock'));
mockRouter.push("/initial-path");


describe('<FavoritePage />', () => {


    // que se renderize con 0 pokemons
    test('<FavoritePage/> renders ok with no pokemon', () => {

        let favoritePokemons = [];
        let component
        
        component = render(
            <Box sx={{ backgroundColor: 'secondary.main', paddingBottom: '10%' }} >
                <Layout title='Pokemons - Favoritos' toggleTheme={ ()=>'dark' }>

                    {
                        favoritePokemons.length === 0
                            ? ( <NoFavorites /> )
                            : ( <FavoritePokemons pokemons={favoritePokemons} />)
                    }

                </Layout>        
            </Box>
        )

        component.getByText('You have no favourites pokemons yet...')
    })



    // que se renderize con 2 pokemons
    test('<FavoritePage/> renders ok with no pokemon', async () => {

        let favoritePokemons = [4,5,6];
        let component
        
        component = render(
            <Box sx={{ backgroundColor: 'secondary.main', paddingBottom: '10%' }} >
                <Layout title='Pokemons - Favoritos' toggleTheme={ ()=>'dark' }>

                    {
                        favoritePokemons.length === 0
                            ? ( <NoFavorites /> )
                            : ( <FavoritePokemons pokemons={favoritePokemons} />)
                    }

                </Layout>        
            </Box>
        )

        // busqueda por data-testid (similar a clase)
        const cards = component.getAllByTestId("data-testid-card");
        expect(cards.length).toBe(favoritePokemons.length);
    })
})



// que ingrese con un elemento