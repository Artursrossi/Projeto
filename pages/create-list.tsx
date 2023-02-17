import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useState } from 'react';
import { parseCookies } from 'nookies';
import Router from 'next/router'
import { ProductList } from '@/components/ProductList';
import { AddLoadingAnimation } from '../utils/AddLoadingAnimation';
import { RemoveLoadingAnimation } from '../utils/RemoveLoadingAnimation';
import { Button } from '@/components/Button';

type ProductsType = {
    id: number; 
    name: string; 
    icon: string;
}

interface ResponseJSON {
  data: Array<ProductsType>
}

export default function CreateList(ProductsInDB: ResponseJSON) {
    const [ProductsArray, setProductsArray] = useState<number[]>([]);
    const [link, setLink] = useState('');

    async function handleCreateList(){
      if(VerifyData()){
        let productListErrorID = document.getElementById('productListError') as HTMLElement;
        if(ProductsArray.length === 0){
          productListErrorID.innerHTML = "Você deve escolher algum produto";
        }
        else{
          productListErrorID.innerHTML = "";
          AddLoadingAnimation();
  
          const { 'token': token } = parseCookies();
          await axios.post('/api/create-list', { token, link, ProductsArray })
          .then((res) => {
            if(res.data == "LinkAlreadyExists"){
              let createLinkErrorID= document.getElementById('createLinkError') as HTMLElement;
              createLinkErrorID.innerHTML = "Link Já Existente";
              RemoveLoadingAnimation();
            }
            else{
              Router.push('/users/'+ link)
            }
          })
          .catch(err => console.log(err))
        }
      }
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

    function AddSetProductsArray(id: number){
      setProductsArray([...ProductsArray, id])
    }

    function RemoveSetProductsArray(id:number){
      setProductsArray(ProductsArray.filter(items => items != id))
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
        <ProductList selectedProducts={[]} withButton={true} AllProducts={ProductsInDB.data} AddSetProductsArray={AddSetProductsArray} RemoveSetProductsArray={RemoveSetProductsArray}/>
        <span id="productListError" className="createLinkSpanError" />
        <Button id="loadingButton" additionalClass="" text="CRIAR LISTA" type="button" func={handleCreateList}/>
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
    .then(res => {if(res.status == 201){
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