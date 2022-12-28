import { FC } from "react";
import { useRouter } from 'next/router';
import { Box, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import Image from "next/image";


interface Props {
    pokemonId: number;
}

export const FavoriteCardPokemon: FC<Props> = ({ pokemonId }) => {

    const router = useRouter();

    const onFavoriteClicked = () => {
        router.push(`/pokemon/${ pokemonId }`)
    }


    return (
        <Grid 
            item
            key={ pokemonId } 
            xs={4} 
        >
            <Card 
                onClick={ onFavoriteClicked }
                sx={{ backgroundColor: 'primary.main'}}
            >
                <CardActionArea>
                    <Box sx={{marginTop: 2, marginBottom: 4 }} >
                        <Image 
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ pokemonId }.svg`}
                            alt={`Pokemon number ${pokemonId}` }
                            width={150}
                            height={150}
                            priority
                            style={{ marginTop: '10px' }}
                        />
                    </Box>
                </CardActionArea>
            </Card>
        </Grid>





        // <Grid xs={6} sm={3} md={2} xl={1} key={ pokemonId } onClick={ onFavoriteClicked }>
        //     <Card hoverable clickable css={{ padding: 10 }}>
        //         <Card.Image 
        //             src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ pokemonId }.svg`}
        //             width={'100%'}
        //             height={ 140 }
        //         />
        //     </Card>
        // </Grid>
    );
}
