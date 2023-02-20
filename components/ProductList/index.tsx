import React, { useEffect, useState } from 'react'

import styles from './styles.module.css'

import { ProductCard } from '../ProductCard'
import { Button } from '../Button'

interface AllProducts {
  id: number
  title: string
  url: string
}

interface props {
  AllProducts: AllProducts[]
  AddSetProductsArray?: Function
  RemoveSetProductsArray?: Function
  withButton: boolean
  selectedProducts?: number[]
}

export const ProductList = (props: props): JSX.Element => {
  const InitialAllProductsQuantity = 16
  const ProductsPerPage = 8
  const [filteredAllProducts, setFilteredAllProducts] = useState(
    props.AllProducts.filter(
      (item: AllProducts) => item.id <= InitialAllProductsQuantity
    )
  )
  const [productsInScreen, setProductsInScreen] = useState(
    InitialAllProductsQuantity
  )
  const [
    productsThatNeedsVisualSelectedClass,
    setProductsThatNeedsVisualSelectedClass,
  ] = useState(props.selectedProducts)

  useEffect(() => {
    if (productsThatNeedsVisualSelectedClass !== undefined) {
      for (const itemID of productsThatNeedsVisualSelectedClass) {
        if (itemID <= productsInScreen) {
          // VISUAL SELECTED CLASS ADD TO INITIAL PRODUCTS
          const productID = document.getElementById(
            'product-' + itemID
          ) as HTMLElement
          productID?.classList.add('productSelected')
          const buttonAddID = document.getElementById(
            'buttonAdd-' + itemID
          ) as HTMLElement
          const buttonRemoveID = document.getElementById(
            'buttonRemove-' + itemID
          ) as HTMLElement
          buttonAddID?.classList.add('displayNone')
          buttonRemoveID?.classList.remove('displayNone')
          setProductsThatNeedsVisualSelectedClass(
            productsThatNeedsVisualSelectedClass.filter(
              (items) => items !== itemID
            )
          )
        }
      }
    }
  }, [filteredAllProducts])

  function handleAddMore(): void {
    setProductsInScreen(productsInScreen + ProductsPerPage)
    // UseEffect [productsInScreen]
  }

  useEffect(() => {
    setFilteredAllProducts(
      props.AllProducts.filter(
        (item: AllProducts) => item.id <= productsInScreen
      )
    )
  }, [productsInScreen])

  function addProduct(id: number): void {
    const productID = document.getElementById('product-' + id) as HTMLElement
    productID?.classList.add('productSelected')

    const buttonAddID = document.getElementById(
      'buttonAdd-' + id
    ) as HTMLElement
    const buttonRemoveID = document.getElementById(
      'buttonRemove-' + id
    ) as HTMLElement
    buttonAddID?.classList.add('displayNone')
    buttonRemoveID?.classList.remove('displayNone')

    props.AddSetProductsArray?.(id)
  }

  function removeProduct(id: number): void {
    const productID = document.getElementById('product-' + id) as HTMLElement
    productID?.classList.remove('productSelected')

    const buttonAddID = document.getElementById(
      'buttonAdd-' + id
    ) as HTMLElement
    const buttonRemoveID = document.getElementById(
      'buttonRemove-' + id
    ) as HTMLElement
    buttonAddID?.classList.remove('displayNone')
    buttonRemoveID?.classList.add('displayNone')

    props.RemoveSetProductsArray?.(id)
  }

  return (
    <>
      <div className={styles.productList}>
        {props.withButton
          ? filteredAllProducts.map((product: any) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  addProduct={addProduct}
                  removeProduct={removeProduct}
                  withButton={props.withButton}
                />
              )
            })
          : props.AllProducts.map((product: any) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  withButton={props.withButton}
                />
              )
            })}
      </div>
      {props.AllProducts.length > productsInScreen && props.withButton ? (
        <Button
          id=""
          additionalClass="width50"
          text="Ver Mais"
          type="submit"
          func={handleAddMore}
        />
      ) : (
        <></>
      )}
    </>
  )
}
