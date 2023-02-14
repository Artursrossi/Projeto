import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useState } from 'react';
import { parseCookies } from 'nookies';
import Router from 'next/router'

type ProductsType = {
    id: number; 
    name: string; 
    icon: string;
}

export default function Create(ProductsInDB: any) {
    const [ProductsArray, setProductsArray] = useState<number[]>([]);
    const [link, setLink] = useState('');

    async function CreateList(){
      if(VerifyData() == true){
        const { 'token': token } = parseCookies();
        await axios.post('/api/Create', { token, link, ProductsArray })
        .then(() => {
          Router.push('/users/'+ link)
        })
        .catch(err => console.log(err))
      }
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

    function VerifyData(){
      let createLinkErrorID = document.getElementById("createLinkError") as HTMLElement;

      //verify if link input has value
      if(link){
        createLinkErrorID.innerHTML = "";
        //verify if link has only letters
        var onlyLetters = /^[A-Za-z]+$/;
        if(onlyLetters.test(link) == true){
          createLinkErrorID.innerHTML = "";
          //verify if link is 3 to 20 digits long
          if(link.length >= 3 && link.length <= 20){
            createLinkErrorID.innerHTML = "";
            return true;
          }
          else{
            createLinkErrorID.innerHTML = "O Link deve ter entre 3 a 20 digitos";
            return false;
          }
        }
        else{
          createLinkErrorID.innerHTML = "O Link não pode ter espaço ou caracteres especiais";
          return false;
        }
      }
      else{
        createLinkErrorID.innerHTML = "Link Obrigatório";
        return false;
      }
    }

  return (
    <>
      <main className="main mainProducts">
        <img src="/react.svg" alt="logo" />
        <div>
            <span className="span">www.projeto.com/user/</span>
            <input value={link} onChange={e => setLink(e.target.value)} className="input" type="text" name="link" placeholder="Escolha o link dos convidados" />
            <span id="createLinkError" className="createLinkSpanError" />
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
  const { token } = parseCookies(ctx)

    if(!token){
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    }

    await axios.post('http://localhost:3000/api/getLinkFromToken', { token })
    .then(res => {if(res.status == 200){
      ctx.res.writeHead(302, { Location: '/users/' + res.data });
      ctx.res.end();
    }})
    .catch(err => console.log(err))

    const res = await axios.get('http://localhost:3000/api/getProductsDB')
    const data = res.data;
  
    return {
      props : { data }
    }
  }