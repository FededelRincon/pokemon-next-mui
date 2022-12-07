import { FC } from "react"
import Image from "next/image"

import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material"

import { SmallPokemon } from "../../interfaces"


interface Props {
    pokemon: SmallPokemon
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {

  return (
    <Grid 
        item
        key={pokemon.id} 
        xs={4} 
    >
        <Card 
        >
        <CardActionArea>
            <Image 
                src={pokemon.img}
                alt={pokemon.name}
                width={150}
                height={150}
                priority
                style={{ marginTop: '10px' }}
            />

            <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography style={{ textTransform: 'capitalize' }} variant="h5" component="div"> {pokemon.name} </Typography>

            <Typography variant="h5" component="div"> #{pokemon.id} </Typography>

            </CardContent>
        </CardActionArea>
        </Card>
    </Grid>
  )
}