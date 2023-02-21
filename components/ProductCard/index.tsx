import React, { memo } from 'react'
import styles from './styles.module.css'
import Image from 'next/image'

import { Button } from '../Button'

interface productData {
  id: number
  title: string
  url: string
}

interface props {
  product: productData
  addProduct?: Function
  removeProduct?: Function
  withButton: boolean
}

function ProductCardComponent(props: props): JSX.Element {
  function handleAdd(): void {
    props.addProduct?.(props.product.id)
  }
  function handleRemove(): void {
    props.removeProduct?.(props.product.id)
  }

  return (
    <div id={'product-' + props.product.id} className={styles.product}>
      <h1 className={styles.productTitle}>{props.product.title}</h1>
      <Image
        className={styles.productImage}
        src={props.product.url}
        alt="imagem"
        width={160}
        height={160}
      />
      {props.withButton ? (
        <>
          <Button
            id={'buttonAdd-' + props.product.id}
            additionalClass={styles.productButton}
            text="Adicionar"
            type="button"
            func={handleAdd}
          />
          <Button
            id={'buttonRemove-' + props.product.id}
            additionalClass={styles.productButton + ' ' + 'displayNone'}
            text="Remover"
            type="button"
            func={handleRemove}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export const ProductCard = memo(ProductCardComponent)
