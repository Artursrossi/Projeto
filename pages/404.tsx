import Head from 'next/head'
import Link from 'next/link'

export default function PageNotFound() {
  return (
    <>
      <Head>
        <title>Projetinho</title>
        <meta name="description" content="Projeto desenvolvido por Artur Schincariol Rossi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />
      </Head>
      <main className="main">
        <img src="/react.svg" alt="logo" />
        <p className="span">Página Não Encontrada</p>
        <Link className="button" href="/">Retornar</Link>
      </main>
    </>
  )
}
