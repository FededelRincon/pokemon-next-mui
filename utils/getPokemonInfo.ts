import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";


export const getPokemonInfo = async ( nameOrId: string ) => {

    try {

        const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ nameOrId.toLocaleLowerCase() }`);

        const pokemon = {
            id: data.id,
            name: data.name,
            sprites: data.sprites,
            height: data.height,
            weight: data.weight,
            types: data.types
        }
    
        return pokemon;
        
    } catch (error) {

        return null;

    }



}