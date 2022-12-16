// import { Container, Image, Text } from '@nextui-org/react'

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
        // <Container css={{
        //     display: 'flex',
        //     flexDirection: 'column',
        //     height: 'calc(100vh - 100px)',
        //     alignItems: 'center',
        //     justifyContent: 'center',
        //     alignSelf: 'center',
        // }}>
        //     <Text h1>No Hay favoritos</Text>
        //     <Image 
        //         src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg'
        //         alt='Imagen pokemon random'
        //         width={250}
        //         height={250}
        //         css={{
        //             opacity: 0.2
        //         }}
        //     />
        // </Container>
    )
}
