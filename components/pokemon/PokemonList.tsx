import { FC } from "react"
import { Grid } from "@mui/material"

import { PokemonCard } from "./PokemonCard"

import { SmallPokemon } from "../../interfaces"



interface Props {
    pokemons: SmallPokemon[]
}

export const PokemonList: FC<Props> = ({ pokemons }) => {
  return (
    <Grid 
        container 
        spacing={2} 
        columns={{ xs: 4, sm: 8, md: 12 }}
        style={{textAlign: "center"}}
        sx={{marginTop: 1, backgroundColor: 'secondary.main'}}
    >
        {
            pokemons.map( (pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
        }
    </Grid>
  )
}
