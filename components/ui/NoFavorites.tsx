import { Box, Typography } from "@mui/material"
import Image from "next/image"


export const NoFavorites = () => {
    return (
        <Box sx={{ marginTop: 10 ,display: 'flex', alignItems:'center', justifyContent: 'center' }}>
            <Box sx={{ marginBottom: 10, display: 'flex', flexDirection: 'column', justifyContent:"center", alignItems: 'center' }} >
                <Typography variant="h4" sx={{ textAlign: 'center'}}>
                    You have no favourites pokemons yet...
                </Typography>

                <Image 
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png"
                    alt="App Icon"
                    width={250}
                    height={250}
                />
            </Box>
        </Box>
    )
}
