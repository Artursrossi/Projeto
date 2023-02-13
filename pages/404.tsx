import Link from 'next/link'

export default function PageNotFound() {
  return (
    <>
      <main className="main">
        <img src="/react.svg" alt="logo" />
        <p className="span">Página Não Encontrada</p>
        <Link className="button" href="/">Retornar</Link>
      </main>
    </>
  )
}
