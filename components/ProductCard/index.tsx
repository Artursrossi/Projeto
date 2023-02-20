import React from 'react'
import styles from './styles.module.css'

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

export const ProductCard = (props: props): JSX.Element => {
  function handleAdd(): void {
    props.addProduct?.(props.product.id)
  }
  function handleRemove(): void {
    props.removeProduct?.(props.product.id)
  }

  return (
    <div id={'product-' + props.product.id} className={styles.product}>
      <h1 className={styles.productTitle}>{props.product.title}</h1>
      <img
        className={styles.productImage}
        alt="imagem"
        src={props.product.url}
      ></img>
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
