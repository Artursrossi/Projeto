import React from 'react'
import Link from 'next/link'

export default function PageNotFound(): JSX.Element {
  return (
    <>
      <main className="main">
        <img src="/react.svg" alt="logo" />
        <p className="span">Página Não Encontrada</p>
        <Link className="button" href="/">
          Retornar
        </Link>
      </main>
    </>
  )
}
