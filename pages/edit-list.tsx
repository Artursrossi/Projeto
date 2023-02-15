import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import Router from 'next/router'

type ProductsType = {
    id: number; 
    name: string; 
    icon: string;
}

interface BigData {
    AllProducts: Array<ProductsType>;
    SelectedProducts: Array<number>;
    link: string;
}

export default function EditList(data: BigData) {
    const [ProductsArray, setProductsArray] = useState<number[]>(data.SelectedProducts);
    useEffect(() => {
        for(let item of ProductsArray){
            initialProducts(item);
        }
    }, [])

    async function handleEditList(){
        let productListErrorID = document.getElementById('productListError') as HTMLElement;
        if(ProductsArray.length === 0){
            productListErrorID.innerHTML = "Você deve escolher algum produto";
        }
        else{
            productListErrorID.innerHTML = "";
            let spinner = document.getElementById('loadingSpinner') as HTMLElement;
            let button = document.getElementById('loadingButton') as HTMLElement;
            spinner?.classList.remove('displayNone');
            button?.classList.add('displayNone');

            const { link } = data;
            await axios.post('/api/edit-list', { link, ProductsArray })
          .then((res) => {
            if(res.status == 201){
                Router.push('/users/'+ link)
            }
          })
          .catch(err => console.log(err))
          
        }
    }

    function initialProducts(id: number){
        let productID = document.getElementById('product-'+id) as HTMLElement;
        productID?.classList.add('productSelected');
  
        let buttonAddID = document.getElementById('buttonAdd-'+id) as HTMLElement;
        let buttonRemoveID = document.getElementById('buttonRemove-'+id) as HTMLElement;
        buttonAddID.classList.add('displayNone');
        buttonRemoveID.classList.remove('displayNone');
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
      <main className="main mainProducts">
        <img src="/react.svg" alt="logo" />
        <div className="productList">
        {data.AllProducts.map((product: ProductsType) => {
            return <div key={product.id} id={"product-" + product.id} className="product">
              <h1 className="productTitle">{product.name}</h1>
              <img className="productImage" alt="imagem" src={product.icon}></img>
              <button id={"buttonAdd-" + product.id} className="button productButton" onClick={() => {addProduct(product.id)}}>Adicionar</button>
              <button id={"buttonRemove-" + product.id} className="button productButton displayNone" onClick={() => {removeProduct(product.id)}}>Remover</button>
            </div>
          })}
        </div>
        <span id="productListError" className="createLinkSpanError" />
        <button id="loadingButton" className="button" onClick={handleEditList}>SALVAR LISTA</button>
        <div id="loadingSpinner" className="spinner displayNone"></div>
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

    const resLink = await axios.post('http://localhost:3000/api/getLinkFromToken', { token })
    if(resLink.status != 201){
        ctx.res.writeHead(302, { Location: '/login' });
        ctx.res.end();
    }

    const link = resLink.data;
    const ResSelectedProducts = await axios.post('http://localhost:3000/api/getProductsFromLink', { link })
    const SelectedProducts = ResSelectedProducts.data.productsIDs.split(',').map(Number);

    const resAllProducts = await axios.get('http://localhost:3000/api/getProductsDB')
    const AllProducts = resAllProducts.data;

    return {
        props : { AllProducts, SelectedProducts, link }
    }
  }