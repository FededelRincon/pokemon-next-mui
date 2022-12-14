import { Grid } from "@mui/material";
import { FC } from "react"

import { FavoriteCardPokemon } from "./FavoriteCardPokemon";


interface Props {
    pokemons: number[];
}



export const FavoritePokemons: FC<Props> = ({ pokemons }) => {
    return (
        <Grid
            container 
            spacing={2} 
            columns={{ xs: 4, sm: 8, md: 12 }}
            style={{textAlign: "center"}}
            sx={{marginTop: 3}}
        >
            {
                pokemons.map( id => (
                    <FavoriteCardPokemon key={id} pokemonId={id} />
                ))
            }
        </Grid>
        
    )
}
