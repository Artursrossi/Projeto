import axios from 'axios';
import { GetStaticProps, GetStaticPaths } from 'next'
import Router from 'next/router'
import { parseCookies } from 'nookies';
import { useState, useEffect } from 'react';

type ProductsType = {
    name: string; 
    icon: string;
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

    return(
        <>
            <div className="main">
                { (isOwner ? 
                <div className="isOwner">
                    <button className="button" onClick={() => {Router.push('/edit-list')}}>Editar Lista</button>
                </div>
                : <></>) }
                <h1>Produtos:</h1>
                {data.ProductsData.map((data: ProductsType) => {
                    return <div key={data.name} className="product">
                        <h1 className="productTitle">{data.name}</h1>
                        <img className="productImage" src={data.icon} alt="imagem" />
                    </div>
                })}
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