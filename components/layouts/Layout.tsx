import { FC } from "react";
import Head from "next/head";

import { Box } from "@mui/system";

import { Navbar } from '../ui';



interface Props {
    children?: React.ReactNode
    title?: string;
    toggleTheme: React.MouseEventHandler<HTMLAnchorElement>
}


const origin = (typeof window === 'undefined') ? '' : window.location.origin;   
    //si es lado servidor dame '', si es lado navegador dame la ruta de origen


export const Layout: FC<Props> = ({ children, title, toggleTheme }) => {


    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>

                <meta name="author" content="Federico del Rincon" />
                <meta name="description" content={`Informacion sobre el pokemon ${ title }`} />
                <meta name="keyboards" content={`${ title }, pokemon, pokedex`} />

                <meta property="og:title" content={`Informacion sobre ${ title }`} />
                <meta property="og:description" content={`Esta es la pagina sobre ${ title }`} />
                <meta property="og:image" content={`${ origin }/img/banner.png`} />
            </Head>

            <Navbar toggleTheme={ toggleTheme } />

            <main>
                <Box sx={{margin: '0px 20px'}}>
                    { children }
                </Box>
            </main>
        </>
    )
}
