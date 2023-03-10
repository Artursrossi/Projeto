import React from 'react'
import Link from 'next/link'

export default function Home(): JSX.Element {
  return (
    <>
      <main className="main">
        <img src="/react.svg" alt="logo" />
        <Link className="button" href="/register">
          Register
        </Link>
        <Link className="button" href="/login">
          Login
        </Link>
      </main>
    </>
  )
}
