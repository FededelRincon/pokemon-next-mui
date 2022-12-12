import { SearchState } from './';


type SearchActionType = 
    | { type: '[SEARCH] - isSearchActive', payload: boolean }
    | { type: '[SEARCH] - textSearch', payload: string }


export const searchReducer = ( state:SearchState, action: SearchActionType ): SearchState => {

    switch (action.type) {
        case '[SEARCH] - isSearchActive' :
            return {
                ...state,
                isSearchActive: action.payload
            }

        case '[SEARCH] - textSearch' :
            return {
                ...state,
                textSearch: action.payload
            }

        default:
            return state;
    }
}