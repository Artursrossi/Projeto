import Head from 'next/head'
import { GetServerSideProps } from 'next';
import axios from 'axios';

type ProductsType = {
    id: number; 
    name: string; 
    icon: string;
}

export default function Create(ProductsInDB: any) {
    var arr: any = [];

    function CreateList(){

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
      <main className="main">
        <img src="/react.svg" alt="logo" />
        <div>
            <span className="span">www.projeto.com/user/</span>
            <input className="input" type="text" name="link" placeholder="Escolha o link dos convidados" />
        </div>
        <div>
          {ProductsInDB.map((product: ProductsType) => {
            <div key={product.id} className="product">
              <div>{product.name}</div>
              <div>{product.icon}</div>
            </div>
          })}
        </div>
        <button id="loadingButton" className="button" onClick={CreateList}>Criar lista</button>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    await axios.get('http://localhost:3001/api/findProducts')
    .then(data => {
        return {
            props : {  }
        }
    })
  
    return {
      props : {  }
    }
  }