import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { Layout } from '../../components/layouts'
import { NoFavorites } from '../../components/ui'
import { localFavorites } from '../../utils';
import { FavoritePokemons } from '../../components/pokemon';



interface Props {
    toggleTheme: React.MouseEventHandler<HTMLAnchorElement>
}
  
  
const FavouritePage: NextPage<Props> = ({ toggleTheme }) => {

    const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

    useEffect(() => {
        setFavoritePokemons( localFavorites.pokemons );
    }, [])
    


    return (
        <>
            <Layout title='Pokemons - Favoritos' toggleTheme={toggleTheme}>

                {
                    favoritePokemons.length === 0
                        ? ( <NoFavorites /> )
                        : ( <FavoritePokemons pokemons={favoritePokemons} />)
                }

            </Layout>        
        </>
    )
}

export default FavouritePage