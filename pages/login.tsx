import React, { useState, type FormEvent } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Router from 'next/router'
import { setCookie } from 'nookies'

import { Button } from '../components/Button'

import { AddLoadingAnimation } from '../utils/AddLoadingAnimation'
import { RemoveLoadingAnimation } from '../utils/RemoveLoadingAnimation'
import { VerifyInputs } from '../utils/VerifyInputs'

export default function Login(): JSX.Element {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  async function handleLogin(event: FormEvent): Promise<void> {
    event.preventDefault()
    const VerifyInputsProps: any = {
      validateName: false,
      validateEmail: true,
      validatePass: true,
      validateSamePass: false,
      validateLink: false,
      email,
      pass,
    }
    if (VerifyInputs(VerifyInputsProps)) {
      AddLoadingAnimation()

      const formPassErrorID = document.getElementById(
        'formPassError'
      ) as HTMLElement
      const formEmailErrorID = document.getElementById(
        'formEmailError'
      ) as HTMLElement

      await axios
        .post('/api/Login/setToken', { email, pass })
        .then(async (res) => {
          if (res.data === 'InvalidEmail') {
            formEmailErrorID.innerHTML = 'Email Incorreto'
            RemoveLoadingAnimation()
          } else if (res.data === 'InvalidPass') {
            formPassErrorID.innerHTML = 'Senha Incorreta'
            RemoveLoadingAnimation()
          } else if (res.status === 201) {
            setCookie(undefined, 'token', res.data.token, {
              maxAge: 60 * 60 * 1, // 1 hour
              path: '/',
            })
            await Redirect(res.data.token)
          } else {
            console.log('Ocorreu um erro')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  async function Redirect(token: string): Promise<void> {
    await axios
      .post('/api/getLinkFromToken', { token })
      .then(async (res) => {
        if (res.status === 201) {
          await Router.push('/users/' + res.data)
        } else {
          await Router.push('/create-list')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <form className="main" onSubmit={handleLogin}>
        <img src="/react.svg" alt="logo" />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          className="input"
          type="text"
          name="email"
          placeholder="Email"
        />
        <span id="formEmailError" />
        <input
          value={pass}
          onChange={(e) => {
            setPass(e.target.value)
          }}
          className="input"
          type="password"
          name="senha"
          placeholder="Senha"
        />
        <span id="formPassError" />
        <Button
          id="loadingButton"
          additionalClass=""
          text="ENTRAR"
          type="submit"
        />
        <div className="formAlreadyAccount">
          Não tem uma conta?
          <Link className="formAlreadyAccountLink" href="/register">
            Registre-se
          </Link>
        </div>
      </form>
    </>
  )
}
