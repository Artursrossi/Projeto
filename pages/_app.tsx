import '../styles/artur.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>Projetinho</title>
        <meta name="description" content="Projeto desenvolvido por Artur Schincariol Rossi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
