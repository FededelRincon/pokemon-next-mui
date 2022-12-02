import React from 'react'
import { NextPage } from 'next'

import { Box, FormControlLabel, Switch, Typography } from '@mui/material'

import { Layout } from '../components/layouts'

import styles from '../styles/Home.module.css'



interface Props {
  // pokemons: SmallPokemon[];
  toggleTheme: React.MouseEventHandler<HTMLAnchorElement>
}

const HomePage: NextPage<Props> = ({ toggleTheme }) => {
  return (
    <>
      {/* <div className={styles.container}> */}
      <div>
        <Layout title='Pokemons App' toggleTheme={toggleTheme} >
        <h3>algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout algo dentro de layout </h3>

        </Layout>
        {/* <main className={styles.main}>
          <h1 className={styles.title}> algo </h1>
        </main> */}
      </div>
    
    </>
  )
}

export default HomePage
