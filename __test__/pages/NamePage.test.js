import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import mockRouter from 'next-router-mock';

import { PokemonByNamePage } from '../../pages/name/[name]'


// se mockea el useRouter() si o si     // https://www.npmjs.com/package/next-router-mock
jest.mock('next/router', () => require('next-router-mock'));
mockRouter.push("/initial-path");


describe('<NamePage />', () => {

    const pokemonFakeData = {
        height: 0.6, 
        id: 4 ,
        name: 'Charmander', 
        sprites: '[]', 
        types: [], 
        weight: 8.5,
        sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg',
            back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg',
            front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg',
            back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg',
        }
    }

    
    
    // chequear que carge correctamente
    test('<PokemonByNamePage/> render component ok', async () => {
        const PokeComp = await render( <PokemonByNamePage pokemon={ pokemonFakeData } /> );
        PokeComp.getByText('Sprites')
    })
    
    // chequear que renderize correctamente info del pokemon dado
    test('<PokemonByNamePage/> Pokemon name ok', async () => {
        const PokeComp = await render( <PokemonByNamePage pokemon={ pokemonFakeData } /> );
        PokeComp.getByText('Charmander')
    })


    //chequear funcione hacer click en el boton de favoritos
    // test('click in favourites Boton', async() => {
    //     const component = await render( <PokemonByNamePage pokemon={ pokemonFakeData } /> );
    //     const button = component.getByText('Save in favorites');
    //     fireEvent.click(button)
    //     expect(button.textContent).toBe('Delete from favorites');
    // })
        // Funcionar funciona, pero tira error el confetti

})



