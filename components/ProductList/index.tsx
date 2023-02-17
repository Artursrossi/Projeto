import styles from './styles.module.css';
import { ProductCard } from '../ProductCard'; 
import { Button } from '../Button';
import { useEffect, useState } from 'react';

type AllProducts = {
    id: number; 
    title: string; 
    url: string;
}

interface props {
    AllProducts: any;
    AddSetProductsArray: Function;
    RemoveSetProductsArray: Function;
    withButton: boolean;
    selectedProducts: Array<number> | null;
}

export const ProductList = (props: props) => {
    const InitialAllProductsQuantity = 16;
    const ProductsPerPage = 8;
    const [filteredAllProducts,setFilteredAllProducts] = useState(
        props.AllProducts.filter((item: any) => item.id <= InitialAllProductsQuantity)
    );
    const [productsInScreen,setProductsInScreen] = useState(InitialAllProductsQuantity+ProductsPerPage);


    useEffect(() => {
        if(props.selectedProducts){
            props.selectedProducts.forEach(itemID => {
                if(itemID <= productsInScreen-ProductsPerPage){
                    addProduct(itemID);
                    let itemIndex: any = props.selectedProducts?.indexOf(itemID);
                    delete props.selectedProducts?.[itemIndex];
                }
            })
        }
    }, [filteredAllProducts])  

    function handleAddMore(){
        setProductsInScreen(productsInScreen+ProductsPerPage)
        setFilteredAllProducts(props.AllProducts.filter((item: any) => item.id <= productsInScreen));
    }

    function addProduct(id: number){
        let productID = document.getElementById('product-'+id) as HTMLElement;
        productID?.classList.add('productSelected');
  
        let buttonAddID = document.getElementById('buttonAdd-'+id) as HTMLElement;
        let buttonRemoveID = document.getElementById('buttonRemove-'+id) as HTMLElement;
        buttonAddID.classList.add('displayNone');
        buttonRemoveID.classList.remove('displayNone');
  
        props.AddSetProductsArray(id);
    }
  
    function removeProduct(id: number){
        let productID = document.getElementById('product-'+id) as HTMLElement;
        productID?.classList.remove('productSelected');
  
        let buttonAddID = document.getElementById('buttonAdd-'+id) as HTMLElement;
        let buttonRemoveID = document.getElementById('buttonRemove-'+id) as HTMLElement;
        buttonAddID.classList.remove('displayNone');
        buttonRemoveID.classList.add('displayNone');
        
        props.RemoveSetProductsArray(id);
    }

    
    return (
        <>
            <div className={styles.productList}>
                {(props.withButton ? 
                    filteredAllProducts.map((product: any) => {return <ProductCard key={product.id} product={product} addProduct={addProduct} removeProduct={removeProduct} withButton={props.withButton}/>}): 
                    props.AllProducts.map((product: any) => {return <ProductCard key={product.id} product={product} addProduct={addProduct} removeProduct={removeProduct} withButton={props.withButton}/>})
                )}
            </div>
            {(props.AllProducts.length > productsInScreen && props.withButton ? <Button id="" additionalClass="width50" text="Ver Mais" type="submit" func={handleAddMore}/> : <></>)}
        </>
    )
}