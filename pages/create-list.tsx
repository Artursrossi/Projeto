import React, { useState } from 'react'
import { type GetServerSideProps } from 'next'
import Router from 'next/router'
import axios from 'axios'
import { parseCookies } from 'nookies'

import { Button } from '../components/Button'
import { ProductList } from '../components/ProductList'

import { AddLoadingAnimation } from '../utils/AddLoadingAnimation'
import { RemoveLoadingAnimation } from '../utils/RemoveLoadingAnimation'
import { VerifyInputs } from '../utils/VerifyInputs'

interface ProductsType {
  id: number
  title: string
  url: string
}

interface ResponseJSON {
  data: ProductsType[]
}

export default function CreateList(ProductsInDB: ResponseJSON): JSX.Element {
  const [ProductsArray, setProductsArray] = useState<number[]>([])
  const [link, setLink] = useState('')

  async function handleCreateList(): Promise<void> {
    const VerifyInputsProps: any = {
      validateName: false,
      validateEmail: false,
      validatePass: false,
      validateSamePass: false,
      validateLink: true,
      link,
    }
    if (VerifyInputs(VerifyInputsProps)) {
      const productListErrorID = document.getElementById(
        'productListError'
      ) as HTMLElement
      if (ProductsArray.length === 0) {
        productListErrorID.innerHTML = 'Você deve escolher algum produto'
      } else {
        productListErrorID.innerHTML = ''
        AddLoadingAnimation()

        const { token } = parseCookies()
        await axios
          .post('/api/create-list', { token, link, ProductsArray })
          .then(async (res) => {
            if (res.data === 'LinkAlreadyExists') {
              const createLinkErrorID = document.getElementById(
                'createLinkError'
              ) as HTMLElement
              createLinkErrorID.innerHTML = 'Link Já Existente'
              RemoveLoadingAnimation()
            } else {
              await Router.push('/users/' + link)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }

  function AddSetProductsArray(id: number): void {
    setProductsArray([...ProductsArray, id])
  }

  function RemoveSetProductsArray(id: number): void {
    setProductsArray(ProductsArray.filter((items) => items !== id))
  }

  return (
    <>
      <main className="main mainProducts">
        <img src="/react.svg" alt="logo" />
        <div id="divCreateLink">
          <span className="span">www.projeto.com/users/</span>
          <input
            value={link}
            onChange={(e) => {
              setLink(e.target.value)
            }}
            className="input"
            type="text"
            name="link"
            placeholder="Escolha o link dos convidados"
          />
          <span id="createLinkError" className="createLinkSpanError" />
        </div>
        <ProductList
          selectedProducts={[]}
          withButton={true}
          AllProducts={ProductsInDB.data}
          AddSetProductsArray={AddSetProductsArray}
          RemoveSetProductsArray={RemoveSetProductsArray}
        />
        <span id="productListError" className="createLinkSpanError" />
        <Button
          id="loadingButton"
          additionalClass=""
          text="CRIAR LISTA"
          type="button"
          func={handleCreateList}
        />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx)

  if (token == null) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
  }

  await axios
    .post('http://localhost:3000/api/getLinkFromToken', { token })
    .then((res) => {
      if (res.status === 201) {
        ctx.res.writeHead(302, { Location: '/users/' + res.data })
        ctx.res.end()
      }
    })
    .catch((err) => {
      console.log(err)
    })

  const res = await axios.get('http://localhost:3000/api/getProductsDB')
  const data = res.data

  return {
    props: { data },
  }
}
