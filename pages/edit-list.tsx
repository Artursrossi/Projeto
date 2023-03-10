import React, { useCallback, useState } from 'react'
import { type GetServerSideProps } from 'next'
import Router from 'next/router'
import axios from 'axios'
import { parseCookies } from 'nookies'

import { Button } from '../components/Button'
import { ProductList } from '../components/ProductList'

import { AddLoadingAnimation } from '../utils/AddLoadingAnimation'

interface ProductsType {
  id: number
  title: string
  url: string
}

interface BigData {
  AllProducts: ProductsType[]
  SelectedProducts: number[]
  link: string
}

export default function EditList(data: BigData): JSX.Element {
  // const [ProductsArray, setProductsArray] = useState<number[]>(data.SelectedProducts);
  const [ProductsArray, setProductsArray] = useState<number[]>(
    data.SelectedProducts
  )

  async function handleEditList(): Promise<void> {
    const productListErrorID = document.getElementById(
      'productListError'
    ) as HTMLElement
    if (ProductsArray.length === 0) {
      productListErrorID.innerHTML = 'Você deve escolher algum produto'
    } else {
      productListErrorID.innerHTML = ''
      AddLoadingAnimation()

      const { link } = data
      await axios
        .post('/api/edit-list', { link, ProductsArray })
        .then(async (res) => {
          if (res.status === 201) {
            await Router.push('/users/' + link)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const AddSetProductsArray = useCallback((id: number) => {
    setProductsArray((state) => [...state, id])
  }, [])

  const RemoveSetProductsArray = useCallback((id: number) => {
    setProductsArray((state) => state.filter((items) => items !== id))
  }, [])

  return (
    <>
      <main className="main mainProducts">
        <img src="/react.svg" alt="logo" />
        <ProductList
          selectedProducts={data.SelectedProducts}
          withButton={true}
          AllProducts={data.AllProducts}
          AddSetProductsArray={AddSetProductsArray}
          RemoveSetProductsArray={RemoveSetProductsArray}
        />
        <span id="productListError" className="createLinkSpanError" />
        <Button
          id="loadingButton"
          additionalClass=""
          text="SALVAR LISTA"
          type="button"
          func={handleEditList}
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

  const resLink = await axios.post(
    'http://localhost:3000/api/getLinkFromToken',
    { token }
  )
  if (resLink.status !== 201) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
  }

  const link = resLink.data
  const ResSelectedProducts = await axios.post(
    'http://localhost:3000/api/getProductsFromLink',
    { link }
  )
  const SelectedProducts = ResSelectedProducts.data.productsIDs
    .split(',')
    .map(Number)

  const resAllProducts = await axios.get(
    'http://localhost:3000/api/getProductsDB'
  )
  const AllProducts = resAllProducts.data

  return {
    props: { AllProducts, SelectedProducts, link },
  }
}
