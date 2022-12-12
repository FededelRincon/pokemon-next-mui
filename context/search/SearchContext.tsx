import { createContext } from 'react';


interface ContextProps {
    isSearchActive: boolean;
    textSearch: string;

    toggleSearchActive: (bool: boolean) => void;
    updateTextSearch: (busqueda: string) => void
}


export const SearchContext = createContext({} as ContextProps);