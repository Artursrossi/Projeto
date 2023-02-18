import { GetStaticProps, GetStaticPaths } from 'next'
import Router from 'next/router'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';

import { Button } from '../../components/Button';
import { ProductList } from '../../components/ProductList';

type ProductsType = {
    id: number;
    title: string; 
    url: string;
}

interface BigData{
    ProductsData: Array<ProductsType>;
    link: string;
}

export default function Users(data: BigData) {
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const { 'token': token } = parseCookies();
        CompareLink(token, data.link);
    }, [])

    async function CompareLink(token: string, currentLink: string){
        const resUserLink = await axios.post('http://localhost:3000/api/getLinkFromToken', { token })
        const UserLink = resUserLink.data;
        if(currentLink == UserLink){
            setIsOwner(true);
        }
        else{
            setIsOwner(false);
        }
    }

    function handleEdit(){
        Router.push('/edit-list')
    }

    return(
        <>
            <div className="main mainProducts">
                { (isOwner ? 
                <div className="isOwner">
                    <Button id="loadingButton" additionalClass="" text="Editar Lista" type="button" func={handleEdit}/>
                </div>
                : <></>) }
                <h1>Produtos:</h1>
                <ProductList selectedProducts={[]} withButton={false} AllProducts={data.ProductsData} AddSetProductsArray={() => {}} RemoveSetProductsArray={() => {}}/>
            </div>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await axios.get('http://localhost:3000/api/getLinksDB')
    const db = res.data;
    
    const paths = db.map((data: {link: string}) => {
        return{
            params: { users: data.link }
        }
    })

    return{
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) =>{
    const link = context?.params?.users;
    var ResAllproducts = await axios.post('http://localhost:3000/api/getProductsFromLink', { link })
    var Allproducts = ResAllproducts.data.productsIDs;
    var ArrProducts = Allproducts.split(',').map(Number);

    var ResProductsData = await axios.post('http://localhost:3000/api/getUserProductsFromArrayIDs', { ArrProducts })
    var ProductsData = ResProductsData.data

    return{
        props: { ProductsData, link }
    }
}