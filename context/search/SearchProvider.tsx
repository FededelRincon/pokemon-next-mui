import { FC, useReducer } from 'react';

import { SearchContext, searchReducer } from './';


export interface SearchState {
    isSearchActive: boolean;
    textSearch: string;
}


const SEARCH_INITIAL_STATE: SearchState = {
    isSearchActive: false,
    textSearch: '',
}


export const SearchProvider:FC = ({ children }) => {

    const [state, dispatch] = useReducer( searchReducer, SEARCH_INITIAL_STATE );

    const toggleSearchActive = (bool:boolean) => {
        dispatch({
            type: '[SEARCH] - isSearchActive',
            payload: bool
        })
    }

    const updateTextSearch = ( busqueda: string ) => {
        dispatch({
            type: '[SEARCH] - textSearch',
            payload: busqueda
        })
    }


    return (
        <SearchContext.Provider value={{
            ...state,

            // methods
            toggleSearchActive,
            updateTextSearch,
        }}>
            { children }
        </SearchContext.Provider>
    )
}