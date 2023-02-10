import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import mockRouter from 'next-router-mock';

import { Navbar } from '../../../components/ui'

// se mockea el useRouter() si o si     // https://www.npmjs.com/package/next-router-mock
jest.mock('next/router', () => require('next-router-mock'));
mockRouter.push("/initial-path");


describe('Navbar Component', () => {
/////// probando buscar texto plano en la pagina
    test('Should render properly', () => {  //test o it, da igual

        const navComp = render( <Navbar/> );
        
        // forma 1 de hacerlo
        navComp.getByText('Poke App')

        // forma 2 de hacerlo
        expect(navComp.container).toHaveTextContent('Poke App')
    })
    
})













