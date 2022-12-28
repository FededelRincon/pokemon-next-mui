import { Box, Typography } from "@mui/material"
import Image from "next/image"


export const NoFavorites = () => {
    return (
        <Box>
            <Typography variant="h4">
                There is not favourites pokemons
            </Typography>

            <Image 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png"
                alt="App Icon"
                width={250}
                height={250}
            />
        </Box>
    )
}
