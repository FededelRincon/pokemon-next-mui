import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import mockRouter from 'next-router-mock';

import { SwitchSelector } from '../../../components/ui'

// se mockea el useRouter() si o si     // https://www.npmjs.com/package/next-router-mock
jest.mock('next/router', () => require('next-router-mock'));
mockRouter.push("/initial-path");


describe('<SwitchSelector/>', () => {

    const mockHandler = jest.fn()   //Maqueta para probar que el toggle fue tocado

////// probando haciendo click
    test('Clicking the toggle botton darkMode/lightMode once', () => {
        const toggleButton = render( <SwitchSelector toggleTheme={ mockHandler }/> );

        const button = toggleButton.getByRole('checkbox')   //se usa checkbox porque bug de material, pero deberia ser switch
        fireEvent.click(button) //doy el click en si mismo

        // expect(mockHandler.mock.calls).toHaveLength(1)
        expect(mockHandler).toHaveBeenCalledTimes(1)
    })
})













