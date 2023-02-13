import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
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
        <Link className="button" href="/register">Register</Link>
        <Link className="button" href="/login">Login</Link>
      </main>
    </>
  )
}
