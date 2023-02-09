import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import mockRouter from 'next-router-mock';

import { Box } from '@mui/material';

import { Layout } from '../../components/layouts/Layout'
import { PokemonList } from '../../components/pokemon/PokemonList'


// se mockea el useRouter() si o si     // https://www.npmjs.com/package/next-router-mock
jest.mock('next/router', () => require('next-router-mock'));
mockRouter.push("/initial-path");


describe('<HomePage />', () => {

    let component
    
    beforeEach(() => {
        component = render(
            <Box sx={{ backgroundColor: 'secondary.main'}} >
                <Layout title='Pokemons App' toggleTheme={ ()=>'dark' } >
                    <PokemonList pokemons={ [] } />
                </Layout>
            </Box>
        )
    })

        
        
    test('<HomePage/> renders ok', () => {
        component.getByText('Poke App')
    })
})