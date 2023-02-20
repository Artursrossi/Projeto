import React, { useState, useEffect } from 'react'
import { type GetStaticProps, type GetStaticPaths } from 'next'
import Router from 'next/router'
import axios from 'axios'
import { parseCookies } from 'nookies'

import { Button } from '../../components/Button'
import { ProductList } from '../../components/ProductList'

interface ProductsType {
  id: number
  title: string
  url: string
}

interface BigData {
  ProductsData: ProductsType[]
  link: string
}

export default function Users(data: BigData): JSX.Element {
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    const { token } = parseCookies()
    CompareLink(token, data.link)
  }, [])

  async function CompareLink(
    token: string,
    currentLink: string
  ): Promise<void> {
    console.log('renderizou CompareLink')
    const resUserLink = await axios.post(
      'http://localhost:3000/api/getLinkFromToken',
      { token }
    )
    const UserLink = resUserLink.data
    if (currentLink === UserLink) {
      setIsOwner(true)
    } else {
      setIsOwner(false)
    }
  }

  async function handleEdit(): Promise<void> {
    await Router.push('/edit-list')
  }

  return (
    <>
      <div className="main mainProducts">
        {isOwner ? (
          <div className="isOwner">
            <Button
              id="loadingButton"
              additionalClass=""
              text="Editar Lista"
              type="button"
              func={handleEdit}
            />
          </div>
        ) : (
          <></>
        )}
        <h1>Produtos:</h1>
        <ProductList
          selectedProducts={[]}
          withButton={false}
          AllProducts={data.ProductsData}
        />
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get('http://localhost:3000/api/getLinksDB')
  const db = res.data

  const paths = db.map((data: { link: string }) => {
    return {
      params: { users: data.link },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const link = context?.params?.users
  const ResAllproducts = await axios.post(
    'http://localhost:3000/api/getProductsFromLink',
    { link }
  )
  const Allproducts = ResAllproducts.data.productsIDs
  const ArrProducts = Allproducts.split(',').map(Number)

  const ResProductsData = await axios.post(
    'http://localhost:3000/api/getUserProductsFromArrayIDs',
    { ArrProducts }
  )
  const ProductsData = ResProductsData.data

  return {
    props: { ProductsData, link },
  }
}
