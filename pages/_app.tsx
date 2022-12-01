import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app'

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { darkTheme, lightTheme } from '../themes';

import '../styles/globals.css'


export default function App({ Component, pageProps }: AppProps) {

  const [activeTheme, setActiveTheme] = useState( darkTheme )
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'> ('dark')

  const toggleTheme = () => {
    setSelectedTheme( selectedTheme === 'light' ? 'dark' : 'light' );
  }

  useEffect(() => {
    setActiveTheme( selectedTheme === 'light' ? lightTheme : darkTheme )
  }, [selectedTheme])
  

  return (
    <ThemeProvider theme={ activeTheme }  >
      <CssBaseline />
      <Component {...pageProps} toggleTheme={toggleTheme} />
    </ThemeProvider>

  )
}
