import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react"

import { FavoriteCardPokemon } from "./FavoriteCardPokemon";


interface Props {
    pokemons: number[];
}



export const FavoritePokemons: FC<Props> = ({ pokemons }) => {
    return (
        <Box 
            sx={{marginLeft: 2}}
            // tuve que hacer esto si o si, xq mui tiene un error y no centra correctamente ni el grid ni las cards
        >
            <Grid
                container 
                spacing={2} 
                columns={{ xs: 4, sm: 8, md: 12 }}
                style={{textAlign: "center"}}
                sx={{ marginTop: 1, backgroundColor: 'secondary.main', paddingBottom: 2, paddingRight: 2}}
            >
                {
                    pokemons.map( id => (
                        <FavoriteCardPokemon key={id} pokemonId={id} />
                    ))
                }
            </Grid>
        </Box>        
    )
}
