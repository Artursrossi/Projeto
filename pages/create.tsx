import Head from 'next/head'
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useState } from 'react';

type ProductsType = {
    id: number; 
    name: string; 
    icon: string;
}

export default function Create(ProductsInDB: any) {
    const [ProductsArray, setProductsArray] = useState<number[]>([]);

    function CreateList(){
      console.log(ProductsArray)
    }

    function addProduct(id: number){
      let productID = document.getElementById('product-'+id) as HTMLElement;
      productID?.classList.add('productSelected');

      let buttonAddID = document.getElementById('buttonAdd-'+id) as HTMLElement;
      let buttonRemoveID = document.getElementById('buttonRemove-'+id) as HTMLElement;
      buttonAddID.classList.add('displayNone');
      buttonRemoveID.classList.remove('displayNone');

      setProductsArray([...ProductsArray, id])
    }

    function removeProduct(id: number){
      let productID = document.getElementById('product-'+id) as HTMLElement;
      productID?.classList.remove('productSelected');

      let buttonAddID = document.getElementById('buttonAdd-'+id) as HTMLElement;
      let buttonRemoveID = document.getElementById('buttonRemove-'+id) as HTMLElement;
      buttonAddID.classList.remove('displayNone');
      buttonRemoveID.classList.add('displayNone');
      
      setProductsArray(ProductsArray.filter(items => items != id))
    }

  return (
    <>
      <Head>
        <title>Projetinho</title>
        <meta name="description" content="Projeto desenvolvido por Artur Schincariol Rossi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />
      </Head>
      <main className="main mainProducts">
        <img src="/react.svg" alt="logo" />
        <div>
            <span className="span">www.projeto.com/user/</span>
            <input className="input" type="text" name="link" placeholder="Escolha o link dos convidados" />
        </div>
        <div className="productList">
          {ProductsInDB.data.map((product: any) => {
            return <div key={product.id} id={"product-" + product.id} className="product">
              <h1 className="productTitle">{product.name}</h1>
              <img className="productImage" alt="imagem" src={product.icon}></img>
              <button id={"buttonAdd-" + product.id} className="button productButton" onClick={() => {addProduct(product.id)}}>Adicionar</button>
              <button id={"buttonRemove-" + product.id} className="button productButton displayNone" onClick={() => {removeProduct(product.id)}}>Remover</button>
            </div>
          })}
        </div>
        <button id="loadingButton" className="button" onClick={CreateList}>CRIAR LISTA</button>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const res = await axios.get('http://localhost:3000/api/findProducts')
    const data = res.data;
  
    return {
      props : { data }
    }
  }