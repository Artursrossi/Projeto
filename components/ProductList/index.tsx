import { useEffect, useState } from 'react'

import styles from './styles.module.css'

import { ProductCard } from '../ProductCard'
import { Button } from '../Button'

interface AllProducts {
  id: number
  title: string
  url: string
}

interface props {
  AllProducts: Array<AllProducts>
  AddSetProductsArray: Function
  RemoveSetProductsArray: Function
  withButton: boolean
  selectedProducts: Array<number> | null
}

export const ProductList = (props: props) => {
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
    if (productsThatNeedsVisualSelectedClass.length != 0) {
      for (let itemID of productsThatNeedsVisualSelectedClass) {
        if (itemID <= productsInScreen) {
          //VISUAL SELECTED CLASS ADD TO INITIAL PRODUCTS
          let productID = document.getElementById(
            'product-' + itemID
          ) as HTMLElement
          productID?.classList.add('productSelected')
          let buttonAddID = document.getElementById(
            'buttonAdd-' + itemID
          ) as HTMLElement
          let buttonRemoveID = document.getElementById(
            'buttonRemove-' + itemID
          ) as HTMLElement
          buttonAddID?.classList.add('displayNone')
          buttonRemoveID?.classList.remove('displayNone')
          setProductsThatNeedsVisualSelectedClass(
            productsThatNeedsVisualSelectedClass.filter(
              (items) => items != itemID
            )
          )
        }
      }
    }
  }, [filteredAllProducts])

  function handleAddMore() {
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

  function addProduct(id: number) {
    let productID = document.getElementById('product-' + id) as HTMLElement
    productID?.classList.add('productSelected')

    let buttonAddID = document.getElementById('buttonAdd-' + id) as HTMLElement
    let buttonRemoveID = document.getElementById(
      'buttonRemove-' + id
    ) as HTMLElement
    buttonAddID?.classList.add('displayNone')
    buttonRemoveID?.classList.remove('displayNone')

    props.AddSetProductsArray(id)
  }

  function removeProduct(id: number) {
    let productID = document.getElementById('product-' + id) as HTMLElement
    productID?.classList.remove('productSelected')

    let buttonAddID = document.getElementById('buttonAdd-' + id) as HTMLElement
    let buttonRemoveID = document.getElementById(
      'buttonRemove-' + id
    ) as HTMLElement
    buttonAddID?.classList.remove('displayNone')
    buttonRemoveID?.classList.add('displayNone')

    props.RemoveSetProductsArray(id)
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
                  addProduct={addProduct}
                  removeProduct={removeProduct}
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
