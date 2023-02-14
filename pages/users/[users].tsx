import axios from 'axios';

export default function Users(ProductsData: any) {
    return(
        <>
            <div className="main">
                <h1>Produtos:</h1>
                {ProductsData.ProductsData.map((data: any) => {
                    return <div key={data.name} className="product">
                        <h1 className="productTitle">{data.name}</h1>
                        <img className="productImage" src={data.icon} alt="imagem" />
                    </div>
                })}
            </div>
        </>
    )
}

export const getStaticPaths = async () => {
    const res = await axios.get('http://localhost:3000/api/getLinksDB')
    const db = res.data;
    
    const paths = db.map((data: any) => {
        return{
            params: { users: data.link }
        }
    })

    return{
        paths,
        fallback: false
    }
}

export async function getStaticProps(context: any){
    const link = context.params.users;
    var ResAllproducts = await axios.post('http://localhost:3000/api/getProductsFromLink', { link })
    var Allproducts = ResAllproducts.data.productsIDs;
    var ArrProducts = Allproducts.split(',').map(Number);

    var ResProductsData = await axios.post('http://localhost:3000/api/getUserProductsFromIDs', { ArrProducts })
    var ProductsData = ResProductsData.data

    return{
        props: { ProductsData }
    }
}