import axios from 'axios';
import { GetStaticProps, GetStaticPaths } from 'next'

type ProductsType = {
    name: string; 
    icon: string;
}

interface ResponseJSON {
    ProductsData: Array<ProductsType>
  }

export default function Users(ProductsData: ResponseJSON) {
    return(
        <>
            <div className="main">
                <h1>Produtos:</h1>
                {ProductsData.ProductsData.map((data: ProductsType) => {
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
        props: { ProductsData }
    }
}